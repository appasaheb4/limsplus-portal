/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _, { isNaN } from 'lodash';
import {
  Form,
  Buttons,
  Tooltip,
  Icons,
  textFilter,
} from '@/library/components';
import { DisplayResult } from './display-result.components';

import { GeneralResultEntryExpand } from './general-result-entry-expand.component';
import { InputResult } from './input-result.components';
import {
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../utils';
import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { stores, useStores } from '@/stores';
import { useStore } from 'react-redux';

interface GeneralResultEntryListProps {
  data: any;
  totalSize: number;
  selectedId?: string;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onUpdateValue: (item: any, id: string) => void;
  onSaveFields: (fileds: any, id: string, type: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFinishResult?: (updateRecordIds: Array<string>) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onFilterFinishResult?: (code: string) => void;
  onTestStatusFilter?: (code: string) => void;
  onExpand?: (items: any) => void;
  onTableReload?: () => void;
  selectedRowData?: any;
}

export const GeneralResultEntryList = (props: GeneralResultEntryListProps) => {
  const { appStore } = useStores();
  const [selectId, setSelectId] = useState('');
  const [selectedRowId, setSelectedRowId] = useState('');
  const [refRangeRowId, setRefRangleRowId] = useState('');
  const [widthRefBox, setWidthRefBox] = useState('60px');
  const [widthConculsionBox, setWidthConculsionBox] = useState('20px');
  const [localData, setLocalData] = useState(props.data);

  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  useEffect(() => {
    setSelectId(props?.selectedId || '');
    setLocalData(
      props.selectedId
        ? props.data?.map(item => ({
            ...item,
            selectedId: props.selectedId || '',
          }))
        : JSON.parse(JSON.stringify(props.data)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedId, props.data]);

  const isFinishResultDisable = (data: Array<any>) => {
    let isDisable = true;
    if (data?.length == 0) return isDisable;
    else {
      const labs = _.groupBy(data, function (b: any) {
        return b.labId;
      });
      Object.keys(labs).forEach(function (key) {
        const testCodes = _.groupBy(labs[key], function (b: any) {
          return b.testCode;
        });

        Object.keys(testCodes).forEach(function (key1) {
          const totalRecords = testCodes[key1];
          let filterRecords = totalRecords?.map(item => {
            if (
              item.finishResult == 'P' &&
              item.panelStatus != 'P' &&
              item.testStatus != 'P'
            ) {
              return item;
            } else return;
          });
          filterRecords = _.reject(filterRecords, _.isEmpty);
          if (totalRecords?.length == filterRecords?.length) {
            isDisable = false;
          }
        });
      });
      return isDisable;
    }
  };

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <GeneralResultEntryExpand
          id='_id'
          data={localData}
          totalSize={props.totalSize}
          isFinishResultDisable={isFinishResultDisable(props.data)}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'labId',
              text: 'Lab Id',
              editable: false,
              headerClasses: 'textHeaderxxs',
            },

            {
              dataField: 'name',
              text: 'Name',
              sort: true,
              editable: false,
              headerClasses: 'textHeader',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '130px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.name}>{cellContent}</span>
              ),
            },
            {
              dataField: 'testCode',
              text: 'Test Code - Name',
              editable: false,
              headerClasses: 'textHeader',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cellContent, row) => {
                return (
                  <span title={`${row.testCode} - ${row.testName}`}>
                    {cellContent} - {row.testName}
                  </span>
                );
              },
            },
            {
              dataField: 'analyteCode',
              text: 'Analyte Code - Name',
              editable: false,
              headerClasses: 'textHeader',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '125px',
                position: 'relative',
              },
              formatter: (cellContent, row) => {
                return (
                  <span title={`${row.analyteCode} - ${row.analyteName}`}>
                    {cellContent} - {row.analyteName}
                  </span>
                );
              },
            },
            {
              dataField: 'reportable',
              text: 'Reportable',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.reportable}
                      onChange={reportable => {
                        // props.onUpdateValue({reportable}, row._id);
                        props.onSaveFields &&
                          props.onSaveFields(
                            {
                              ...row,
                              reportable,
                              updateType: 'save',
                            },
                            row._id,
                            'save',
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'result',
              text: 'Result',
              headerClasses: 'textHeaderxxm',
              editable: (content, row, rowIndex, columnIndex) =>
                row.approvalStatus == 'P' && !row?.calculationFlag
                  ? true
                  : false,
              formatter: (cellContent, row) => (
                <>
                  {row?.isResultEditor ? (
                    <DisplayResult
                      row={row}
                      onSelect={async result => {
                        await props.onUpdateValue(result, row._id);
                        const rows = { ...row, ...result };
                        if (_.isEmpty(row?.result)) {
                          props.onSaveFields(
                            {
                              ...rows,
                              resultStatus: getResultStatus(
                                rows.resultType,
                                rows,
                              ),
                              testStatus: getTestStatus(rows.resultType, rows),
                              abnFlag: getAbnFlag(rows.resultType, rows),
                              critical: getCretical(rows.resultType, rows),
                              updateField: 'result',
                              updateType: 'directSave',
                              ...result,
                            },
                            rows._id,
                            'directSave',
                          );
                        }
                      }}
                    />
                  ) : (
                    <span style={{ fontWeight: 'bold' }}>{row.result}</span>
                  )}
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <InputResult
                    row={row}
                    onSelect={async result => {
                      await props.onUpdateValue(
                        { ...result, updateField: 'result' },
                        row._id,
                      );
                      const rows = { ...row, ...result };
                      if (_.isEmpty(row?.result)) {
                        props.onSaveFields(
                          {
                            ...rows,
                            resultStatus: getResultStatus(
                              rows.resultType,
                              rows,
                            ),
                            testStatus: getTestStatus(rows.resultType, rows),
                            abnFlag: getAbnFlag(rows.resultType, rows),
                            critical: getCretical(rows.resultType, rows),
                            updateField: 'result',
                            updateType: 'directSave',
                            ...result,
                          },
                          rows._id,
                          'directSave',
                        );
                      }
                      if (!_.isEmpty(row?.result) && row.resultType == 'FR') {
                        props.onSaveFields(
                          {
                            ...rows,
                            resultStatus: getResultStatus(
                              rows.resultType,
                              rows,
                            ),
                            testStatus: getTestStatus(rows.resultType, rows),
                            abnFlag: getAbnFlag(rows.resultType, rows),
                            critical: getCretical(rows.resultType, rows),
                            updateField: 'result',
                            updateType: 'directSave',
                            ...result,
                          },
                          rows._id,
                          'directSave',
                        );
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'normalRange',
              text: 'Normal Range',
              sort: true,
              headerClasses: 'textHeaderm',
              editable: false,
              style: { width: widthRefBox },
              formatter: (cell, row) => {
                return (
                  <>
                    <div className='flex flex-row gap-1'>
                      <span>
                        <span>
                          <span>
                            {isNaN(Number.parseFloat(row.loNor)) &&
                            isNaN(Number.parseFloat(row.hiNor))
                              ? '-'
                              : isNaN(Number.parseFloat(row.loNor))
                              ? `${row.hiNor} - >`
                              : isNaN(Number.parseFloat(row.hiNor))
                              ? `< - ${row.loNor}`
                              : `${row.loNor} - ${row.hiNor}`}
                          </span>
                        </span>
                      </span>
                      <div>
                        {row.refRangesList?.length > 0 && (
                          <Tooltip
                            tooltipText={
                              row._id != refRangeRowId
                                ? 'Expand Reference Range'
                                : 'Collapse Reference Range'
                            }
                          >
                            <Icons.IconContext
                              color={
                                appStore.applicationSetting.theme === 'dark'
                                  ? '#000000'
                                  : '#ffffff'
                              }
                              size='20'
                              onClick={() => {
                                if (row._id === refRangeRowId) {
                                  setRefRangleRowId('');
                                  setWidthRefBox('30px');
                                } else {
                                  setRefRangleRowId(row._id);
                                  setWidthRefBox('550px');
                                }
                              }}
                            >
                              {Icons.getIconTag(
                                row._id != refRangeRowId
                                  ? Icons.IconBi.BiExpand
                                  : Icons.IconBi.BiCollapse,
                              )}
                            </Icons.IconContext>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                    {refRangeRowId == row._id ? (
                      <div style={{ width: widthRefBox }}>
                        <RefRangesExpandList
                          id='_id'
                          data={row?.refRangesList || []}
                          totalSize={row?.refRangesList?.length || 0}
                          columns={[
                            {
                              dataField: 'result',
                              text: 'Result',
                              editable: false,
                              formatter: () => (
                                <>
                                  <span>{row.result}</span>
                                </>
                              ),
                            },
                            {
                              dataField: 'rangeType',
                              text: 'Range Type',
                            },
                            {
                              dataField: 'low',
                              text: 'Low',
                            },
                            {
                              dataField: 'high',
                              text: 'High',
                            },
                            {
                              dataField: 'rangeSetOn',
                              text: 'Range Set On',
                            },
                            {
                              dataField: 'rangeId',
                              text: 'Range Id',
                            },
                            {
                              dataField: 'version',
                              text: 'Range Version',
                            },
                          ]}
                          onSelectedRow={rows => {}}
                          onUpdateItem={(
                            value: any,
                            dataField: string,
                            id: string,
                          ) => {}}
                        />
                      </div>
                    ) : null}
                  </>
                );
              },
            },
            {
              dataField: 'abnFlag',
              text: 'Abn Flag',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={
                        row.resultType === 'F' || row.resultType === 'M'
                          ? false
                          : true
                      }
                      value={row.critical ? true : row.abnFlag}
                      onChange={abnFlag => {
                        props.onUpdateValue({ abnFlag }, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'critical',
              text: 'Critical',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={
                        row.resultType === 'F' || row.resultType === 'M'
                          ? false
                          : true
                      }
                      value={row.critical}
                      onChange={critical => {
                        props.onUpdateValue({ critical }, row._id);
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'units',
              text: 'Units',
              editable: false,
            },
            {
              dataField: 'conclusion',
              text: 'Conclusion',
              editable: false,
              style: { width: widthConculsionBox },
              formatter: (cell, row) => {
                return (
                  <div className='flex flex-col'>
                    <Tooltip
                      tooltipText={
                        row._id != selectedRowId ? 'Expand' : 'Collapse'
                      }
                    >
                      <Icons.IconContext
                        color='#000000'
                        size='20'
                        onClick={() => {
                          if (row._id === selectedRowId) {
                            setSelectedRowId('');
                            setWidthConculsionBox('30px');
                          } else {
                            setSelectedRowId(row._id);
                            setWidthConculsionBox('200px');
                          }
                        }}
                      >
                        {Icons.getIconTag(
                          row._id != selectedRowId
                            ? Icons.IconBi.BiExpand
                            : Icons.IconBi.BiCollapse,
                        )}
                      </Icons.IconContext>
                    </Tooltip>

                    {row._id === selectedRowId && (
                      <div style={{ width: widthConculsionBox }}>
                        <Form.MultilineInput
                          rows={3}
                          placeholder='Conclusion'
                          className='text-black'
                          onBlur={conclusion => {
                            props.onUpdateFields &&
                              props.onUpdateFields(
                                { conclusion, updateField: 'conclusion' },
                                row._id,
                              );
                            setSelectedRowId('');
                            setWidthConculsionBox('30px');
                          }}
                          defaultValue={row?.conclusion}
                        />
                      </div>
                    )}
                  </div>
                );
              },
            },

            {
              dataField: 'resultStatus',
              text: 'Result Status',
              editable: false,
            },

            {
              dataField: 'resultDate',
              text: 'Result Date',
              editable: false,
              headerClasses: 'textHeaderm',
              formatter: (cell, row) => {
                return (
                  <>
                    {row.resultDate &&
                      dayjs(row.resultDate).format('YYYY-MM-DD HH:mm:ss')}
                  </>
                );
              },
            },

            {
              dataField: 'testStatus',
              text: 'Test Status',
              editable: false,
            },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              editable: false,
            },
            {
              dataField: 'panelStatus',
              text: 'Panel Status',
              editable: false,
            },
            {
              dataField: 'age',
              text: 'Age',
              editable: false,
            },
            {
              dataField: 'ageUnit',
              text: 'Age Unit',
              editable: false,
            },

            {
              dataField: 'species',
              text: 'Species',
              editable: false,
            },
            {
              dataField: 'resultType',
              text: 'Result Type',
              editable: false,
            },

            {
              dataField: 'showRanges',
              text: 'Show Ranges',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.showRanges}
                      onChange={showRanges => {
                        props.onUpdateValue({ showRanges }, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              editable: false,
              formatter: (cell, row) => {
                return <>{row.extraData?.enteredBy}</>;
              },
            },
            {
              text: 'Environment',
              dataField: 'environment',
              editable: false,
              // headerClasses: 'textHeader2',
            },
            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
              // hidden: !props.isDelete,
              formatter: (cell, row, rowIndex, formatExtraData) => (
                <div className='flex gap-2 items-center' key={row?._id}>
                  {!_.isEmpty(row?.result) && (
                    <div className='flex flex-row'>
                      <>
                        <Buttons.Button
                          size='small'
                          // type='outline'
                          // buttonClass='text-white'
                          disabled={!row?.flagUpdate}
                        >
                          <Tooltip tooltipText='Update'>
                            <Icons.IconContext
                              color='#ffffff'
                              size='20'
                              onClick={() => {
                                if (!row?.result)
                                  return alert('Please enter result value ');
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                props.onSaveFields &&
                                  props.onSaveFields(
                                    {
                                      ...row,
                                      resultStatus: getResultStatus(
                                        row.resultType,
                                        row,
                                      ),
                                      testStatus: getTestStatus(
                                        row.resultType,
                                        row,
                                      ),
                                      abnFlag: getAbnFlag(row.resultType, row),
                                      critical: getCretical(
                                        row.resultType,
                                        row,
                                      ),
                                      updateType: 'save',
                                    },
                                    row._id,
                                    'save',
                                  );
                              }}
                            >
                              {Icons.getIconTag(Icons.IconBi.BiEdit)}
                            </Icons.IconContext>
                          </Tooltip>
                        </Buttons.Button>
                      </>
                    </div>
                  )}
                  {selectId == row?._id ? (
                    <Tooltip tooltipText='Expand'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          props.onExpand && props.onExpand('');
                        }}
                      >
                        {Icons.getIconTag(Icons.Iconai.AiFillMinusCircle)}
                      </Icons.IconContext>
                    </Tooltip>
                  ) : (
                    <Tooltip tooltipText='Expand'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          props.onExpand && props.onExpand(row);
                        }}
                      >
                        {Icons.getIconTag(Icons.Iconai.AiFillPlusCircle)}
                      </Icons.IconContext>
                    </Tooltip>
                  )}
                </div>
              ),
              headerClasses: 'sticky right-0  bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='General Result Entry'
          onPageSizeChange={(page, limit) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            props.onPageSizeChange && props.onPageSizeChange(page, limit);
          }}
          onFilter={(type, filter, page, size) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            props.onFilter && props.onFilter(type, filter, page, size);
          }}
          clearAllFilter={() => {}}
          onFinishResult={selectedRow => {
            props.onFinishResult &&
              props.onFinishResult(
                selectedRow?.map(item => {
                  if (
                    item?.panelStatus != 'P' &&
                    item?.testStatus != 'P' &&
                    item?.resultStatus != 'P'
                  )
                    return item?._id;
                }),
              );
          }}
          onFilterFinishResult={(code: string) => {
            props.onFilterFinishResult && props.onFilterFinishResult(code);
          }}
          onTestStatusFilter={item => {
            props.onTestStatusFilter && props.onTestStatusFilter(item);
          }}
          onTableReload={() => {
            props.onTableReload && props.onTableReload();
          }}
          selectedRowData={props.selectedRowData}
        />
      </div>
    </>
  );
};
