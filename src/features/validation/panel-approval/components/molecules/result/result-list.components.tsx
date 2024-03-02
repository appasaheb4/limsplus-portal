import React, { useEffect, useState } from 'react';
import {
  Form,
  Tooltip,
  Icons,
  NumberFilter,
  sortCaret,
  customFilter,
} from '@/library/components';
import dayjs from 'dayjs';

import { TableBootstrap } from './table-bootstrap.components';
import { RefRanges } from './ref-ranges.component';
import { InputResult } from '../../../../../result-entry/general-result-entry/components/molecules/output/input-result.components';

import {
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../../../result-entry/general-result-entry/utils';

interface ResultListProps {
  data: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isApproval?: boolean;
  selectedId?: string;
  selectedItems?: any;
  filterRecord?: string;
  onSelectedRow?: (selectedItem: any, type: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onUpdateResult?: (fields: any, id: string) => void;
  onExpand?: (items: any) => void;
  onRecheck?: (id: string, patientResultId: string) => void;
  onRetest?: (id: string, patientResultId: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onReport?: (item: any) => void;
  onFilterRecord?: (item: any) => void;
}

let labId;

export const ResultList = (props: ResultListProps) => {
  const [selectId, setSelectId] = useState('');
  const [localData, setLocalData] = useState(props.data);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [widthRefBox, setWidthRefBox] = useState('20px');
  const [widthConculsionBox, setWidthConculsionBox] = useState('20px');
  const [conclusionId, setWidthConculsionId] = useState('');

  useEffect(() => {
    const filterDataByHoldRecord = (data, holdRecord) => {
      if (holdRecord === 'Pending') {
        return data.filter(item => item.approvalStatus === 'Pending');
      } else if (holdRecord === 'Done') {
        return data.filter(item => item.approvalStatus === 'Done');
      } else {
        return data;
      }
    };
    setSelectId(props.selectedId || '');
    setLocalData(
      props.selectedId
        ? props.data
            ?.filter(item => item._id === props.selectedId)
            ?.map(item => ({ ...item, selectedId: props.selectedId }))
        : filterDataByHoldRecord(props.data, props.filterRecord),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedId, props.data, props.filterRecord]);

  useEffect(() => {
    setLocalData(JSON.parse(JSON.stringify(localData)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowId]);

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
          id='_id'
          data={localData}
          totalSize={props.totalSize}
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
              sort: true,
              editable: false,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              // headerClasses: 'textHeader3',
              filter: customFilter({
                getFilter: filter => {
                  labId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: 'test',
              text: 'Test',
              sort: true,
              editable: false,
              headerClasses: 'textHeader3',
            },
            {
              dataField: 'analyte',
              text: 'Analyte',
              sort: true,
              editable: false,
              headerClasses: 'textHeader1',
            },
            {
              dataField: 'result',
              text: 'Result',
              sort: true,
              headerClasses: 'textHeader1',
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
                      const rows = { ...row, ...result };
                      props.onUpdateResult &&
                        props.onUpdateResult(
                          {
                            ...rows,
                            resultStatus: getResultStatus(
                              rows.resultType,
                              rows,
                            ),
                            testStatus: getTestStatus(rows.resultType, rows),
                            abnFlag: getAbnFlag(rows.resultType, rows),
                            critical: getCretical(rows.resultType, rows),
                            ...result,
                          },
                          rows.patientResultId,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'units',
              text: 'Units',
              sort: true,
              editable: false,
            },
            {
              dataField: 'refRangesList',
              text: 'Ref Ranges',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderxxm',
              style: { width: widthRefBox },
              formatter: (cell, row) => {
                return (
                  <>
                    <div className='flex flex-row gap-2'>
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
                              row._id != selectedRowId ? 'Expand' : 'Collapse'
                            }
                          >
                            <Icons.IconContext
                              color='#000000'
                              size='20'
                              onClick={() => {
                                if (row._id === selectedRowId) {
                                  setSelectedRowId('');
                                  setWidthRefBox('30px');
                                } else {
                                  setSelectedRowId(row._id);
                                  setWidthRefBox('550px');
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
                        )}
                      </div>
                    </div>
                    {selectedRowId == row._id ? (
                      <div style={{ width: widthRefBox }}>
                        <RefRanges
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
                        row._id != conclusionId ? 'Expand' : 'Collapse'
                      }
                    >
                      <Icons.IconContext
                        color='#000000'
                        size='20'
                        onClick={() => {
                          if (row._id === conclusionId) {
                            setWidthConculsionId('');
                            setWidthConculsionBox('30px');
                          } else {
                            setWidthConculsionId(row._id);
                            setWidthConculsionBox('200px');
                          }
                        }}
                      >
                        {Icons.getIconTag(
                          row._id != conclusionId
                            ? Icons.IconBi.BiExpand
                            : Icons.IconBi.BiCollapse,
                        )}
                      </Icons.IconContext>
                    </Tooltip>

                    {row._id === conclusionId && (
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
                            setWidthConculsionId('');
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
              dataField: 'abnFlag',
              text: 'Abn Flag',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.abnFlag} />
                  </>
                );
              },
            },
            {
              dataField: 'critical',
              text: 'Critical',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.critical} />
                  </>
                );
              },
            },

            {
              dataField: 'remarks',
              text: 'Remarks',
              sort: true,
              editable: false,
            },
            {
              dataField: 'deltaFlag',
              text: 'Delta Flag',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.deltaFlag} />
                  </>
                );
              },
            },
            {
              dataField: 'deltaValue',
              text: 'Delta Value',
              sort: true,
              editable: false,
            },
            {
              dataField: 'Result Status',
              text: 'Result Status',
              sort: true,
              editable: false,
            },
            {
              dataField: 'testStatus',
              text: 'Test Status',
              sort: true,
              editable: false,
            },
            {
              dataField: 'approvalDate',
              text: 'Approval Date',
              sort: true,
              editable: false,
              headerClasses: 'textHeader',
              formatter: (cell, row) => {
                return row.approvalDate
                  ? dayjs(row.approvalDate).format('DD-MM-YYYY HH:mm:ss')
                  : '';
              },
            },
            {
              dataField: 'autoRelease',
              text: 'Auto Release',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.autoRelease} />
                  </>
                );
              },
            },
            {
              dataField: 'final',
              text: 'Final',
              sort: true,
              editable: false,
              // headerClasses: 'textHeaderl',
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              editable: false,
            },
            {
              text: 'Environment',
              dataField: 'environment',
              editable: false,
              sort: true,
            },
            {
              dataField: 'approvalStatus',
              text: 'Action',
              sort: true,
              editable: false,
              formatter: (cellContent, row) => (
                <div className='flex flex-row gap-1' key={row?._id}>
                  {props.isApproval && (
                    <>
                      <Tooltip tooltipText='Approved'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onUpdateFields &&
                              props.onUpdateFields(
                                { approvalStatus: 'Approved' },
                                row._id,
                              );
                            props.onExpand && props.onExpand('');
                          }}
                        >
                          {Icons.getIconTag(Icons.Iconai.AiFillCheckCircle)}
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip tooltipText='Rejected'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onUpdateFields &&
                              props.onUpdateFields(
                                { approvalStatus: 'Rejected' },
                                row._id,
                              );
                          }}
                        >
                          {Icons.getIconTag(Icons.Iconai.AiFillCloseCircle)}
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip tooltipText='Recheck'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onRecheck &&
                              props.onRecheck(row?._id, row?.patientResultId);
                          }}
                        >
                          <Icons.RIcon
                            nameIcon='GoIssueReopened'
                            propsIcon={{ color: '#ffffff' }}
                          />
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip tooltipText='Retest'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onRetest &&
                              props.onRetest(row?._id, row?.patientResultId);
                          }}
                        >
                          <Icons.RIcon
                            nameIcon='VscIssueReopened'
                            propsIcon={{ color: '#ffffff' }}
                          />
                        </Icons.IconContext>
                      </Tooltip>
                    </>
                  )}
                  {selectId == row._id ? (
                    <Tooltip tooltipText='Expand'>
                      <Icons.IconContext
                        color='#fff'
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
                        color='#fff'
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
              headerClasses: 'sticky right-0  bg-gray-500 text-white z-50',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
              style: (cell, row, rowIndex, colIndex) => {
                return {
                  zIndex: props.data?.length - rowIndex,
                };
              },
            },
          ]}
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='Report Panel Approval'
          onSelectedRow={(rows, type) => {
            props.onSelectedRow && props.onSelectedRow(rows, type);
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size);
          }}
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size);
          }}
          clearAllFilter={() => {
            labId('');
          }}
          onFilterRecord={item => {
            props.onFilterRecord && props.onFilterRecord(item);
          }}
        />
      </div>
    </>
  );
};
