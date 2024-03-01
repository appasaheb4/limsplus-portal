/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _, { isNaN } from 'lodash';
import { Form, Buttons, Tooltip, Icons } from '@/library/components';
import { DisplayResult } from './display-result.components';

import { GeneralResultEntryExpand } from './general-result-entry-expand.component';
import { InputResult } from './input-result.components';
import {
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../utils';
import { icons } from '@/library/assets';
import { RefRangesExpandList } from './ref-ranges-expand-list.component';

interface GeneralResultEntryListProps {
  data: any;
  totalSize: number;
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
}

export const GeneralResultEntryList = (props: GeneralResultEntryListProps) => {
  const [data, setData] = useState<any>([]);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [refRangeRowId, setRefRangleRowId] = useState('');
  const [widthRefBox, setWidthRefBox] = useState('60px');
  const [widthConculsionBox, setWidthConculsionBox] = useState('20px');
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  useEffect(() => {
    setData(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <GeneralResultEntryExpand
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          isFinishResultDisable={
            props.data?.length == 0
              ? true
              : props.data?.filter(item => {
                  return item.panelStatus != 'P' && item?.approvalStatus == 'P';
                })?.length == props.data?.length
              ? false
              : true
          }
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
            },
            {
              dataField: 'sex',
              text: 'Sex',
              editable: false,
              style: { width: 80 },
              formatter: (cell, row) => {
                return (
                  <div className='flex'>
                    <img
                      src={row.sex == 'M' ? icons.male : icons.female}
                      style={{ width: 80, height: 20 }}
                      alt='male'
                    />
                  </div>
                );
              },
            },
            {
              dataField: 'analyteCode',
              text: 'Analyte Code - Name',
              editable: false,
              headerClasses: 'textHeader',
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    {`${row.analyteCode} - ${row.analyteName}`}
                  </div>
                </>
              ),
            },
            {
              dataField: 'result',
              text: 'Result',
              headerClasses: 'textHeader',
              editable: (content, row, rowIndex, columnIndex) =>
                row.approvalStatus == 'P' ? true : false,
              formatter: (cellContent, row) => (
                <>
                  {row.isResultEditor ? (
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
                    <span>{row.result}</span>
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
              headerClasses: 'textHeaderxxm',
              editable: false,
              style: { width: widthRefBox },
              formatter: (cell, row) => {
                return (
                  <>
                    <div className='flex flex-row gap-4'>
                      <span>
                        {(row.loNor === 'NaN' && row.hiNor === 'NaN') ||
                        (row.loNor === ' ' && row.hiNor === ' ')
                          ? '-'
                          : row.loNor === 'NaN' && row.hiNor === ' '
                          ? '<'
                          : row.loNor === ' ' && row.hiNor === 'NaN'
                          ? '>'
                          : row.loNor + '-' + row.hiNor}
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
                              color='#000000'
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
              dataField: 'units',
              text: 'Units',
              editable: false,
            },
            {
              dataField: 'resultStatus',
              text: 'Result Status',
              editable: false,
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
                      value={row.abnFlag}
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
              dataField: 'resultDate',
              text: 'Result Date',
              editable: false,
              headerClasses: 'textHeader',
              formatter: (cell, row) => {
                return (
                  <>{dayjs(row.resultDate).format('YYYY-MM-DD HH:mm:ss')}</>
                );
              },
            },
            {
              dataField: 'testCode',
              text: 'Test Code - Name',
              editable: false,
              headerClasses: 'textHeader',
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    {`${row.testCode} - ${row.testName}`}
                  </div>
                </>
              ),
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
                <>
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
                              color='#fff'
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
                </>
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
          onFinishResult={() => {
            props.onFinishResult &&
              props.onFinishResult(
                props.data?.map(item => {
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
        />
      </div>
    </>
  );
};
