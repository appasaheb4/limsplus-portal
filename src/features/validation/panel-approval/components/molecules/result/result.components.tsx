import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { Confirm } from '@/library/models';
import dayjs from 'dayjs';

import { TableBootstrap } from './table-bootstrap.components';

import {
  Form,
  Tooltip,
  Icons,
  NumberFilter,
  sortCaret,
  customFilter,
} from '@/library/components';

import { InputResult } from '../../../../../result-entry/general-result-entry/components/molecules/output/input-result.components';

import {
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../../../result-entry/general-result-entry/utils';
import { RefRanges } from './ref-ranges.component';

interface ResultProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onUpdate?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onUpdateResult?: (fields: any, id: string) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onReport?: (item: any) => void;
  onUpdateFields?: (fields: any, id: string) => void;
}

let labId;

export const Result = observer((props: ResultProps) => {
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [widthRefBox, setWidthRefBox] = useState('20px');
  const [selectedRowId, setSelectedRowId] = useState('');
  const [widthConculsionBox, setWidthConculsionBox] = useState('20px');
  const [conclusionId, setWidthConculsionId] = useState('');
  return (
    <>
      <div style={{ position: 'relative' }}>
        <TableBootstrap
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          selectedItem={selectedItem}
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
                              props.onUpdateFields({ conclusion }, row._id);
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
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='Pending Panel Approval'
          onSelectedRow={rows => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id));
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id);
          }}
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size);
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size);
          }}
          clearAllFilter={() => {}}
          onClickRow={(item, index) => {
            setSelectedItem(item);
            props.onClickRow && props.onClickRow(item, index);
          }}
        />
      </div>
    </>
  );
});
