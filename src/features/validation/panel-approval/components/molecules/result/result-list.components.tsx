import React, {useEffect, useState} from 'react';
import {
  Form,
  Tooltip,
  Icons,
  NumberFilter,
  sortCaret,
  textFilter,
  customFilter,
} from '@/library/components';
import dayjs from 'dayjs';
import _ from 'lodash';

import {TableBootstrap} from './table-bootstrap.components';
import {RefRanges} from './ref-ranges.component';
import {InputResult} from '../../../../../result-entry/general-result-entry/components/molecules/output/input-result.components';

import {
  getStatus,
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../../../result-entry/general-result-entry/utils';

interface ResultListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  selectedId?: string;
  selectedItems?: any;
  onSelectedRow?: (selectedItem: any, type: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onUpdateResult?: (fields: any, id: string) => void;
  onExpand?: (items: any) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onReport?: (item: any) => void;
}

let labId;

export const ResultList = (props: ResultListProps) => {
  const [selectId, setSelectId] = useState('');
  const [localData, setLocalData] = useState(props.data);
  const [selectedRowId, setSelectedRowId] = useState('');

  useEffect(() => {
    setSelectId(props.selectedId || '');
    setLocalData(
      props.selectedId
        ? props.data.map(item => {
            return {...item, selectedId: props.selectedId};
          })
        : props.data,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedId, props.data]);

  useEffect(() => {
    setLocalData(JSON.parse(JSON.stringify(localData)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowId]);

  return (
    <>
      <div style={{position: 'relative'}}>
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
              headerClasses: 'textHeader3',
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
              headerClasses: 'textHeader',
            },
            {
              dataField: 'analyte',
              text: 'Analyte',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'result',
              text: 'Result',
              sort: true,
              headerClasses: 'textHeaderl',
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
                      const rows = {...row, ...result};
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
              dataField: 'final',
              text: 'Final',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderl',
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
              headerClasses: 'textHeader16',
              formatter: (cell, row) => {
                return (
                  <div className='flex flex-col'>
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
                            row._id == selectedRowId
                              ? setSelectedRowId('')
                              : setSelectedRowId(row._id);
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
                    {selectedRowId == row._id ? (
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
                    ) : null}
                  </div>
                );
              },
            },
            {
              dataField: 'conclusion',
              text: 'Conclusion',
              headerClasses: 'textHeader',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.MultilineInput
                    rows={3}
                    placeholder='Conclusion'
                    onBlur={conclusion => {
                      props.onUpdateFields &&
                        props.onUpdateFields({conclusion}, row._id);
                    }}
                    defaultValue={row?.conclusion}
                  />
                </>
              ),
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
              dataField: 'resultStatus',
              text: 'resultStatus',
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
              formatter: (cell, row) => {
                return row.approvalDate
                  ? dayjs(row.approvalDate).format('YYYY-MM-DD')
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
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'approvalStatus',
              text: 'Operation',
              sort: true,
              editable: true,
              formatter: (cellContent, row) => (
                <div className='flex flex-row gap-1'>
                  <Tooltip tooltipText='Approved'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() => {
                        props.onUpdateFields &&
                          props.onUpdateFields(
                            {approvalStatus: 'Approved'},
                            row._id,
                          );
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
                            {approvalStatus: 'Rejected'},
                            row._id,
                          );
                      }}
                    >
                      {Icons.getIconTag(Icons.Iconai.AiFillCloseCircle)}
                    </Icons.IconContext>
                  </Tooltip>
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
          isEditModify={props.isEditModify}
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
        />
      </div>
    </>
  );
};
