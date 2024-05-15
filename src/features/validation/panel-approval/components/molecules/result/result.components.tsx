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
import { FaWordpressSimple } from 'react-icons/fa';

interface ResultProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onUpdate?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onUpdateResult?: (fields: any, id: string, patientResultId: string) => void;
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
      <div style={{ position: 'relative', zIndex: 0 }}>
        <TableBootstrap
          id='_id'
          data={props?.data}
          totalSize={props?.totalSize}
          selectedItem={selectedItem}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'sampleId',
              text: 'Sample Id',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderm',
            },
            {
              dataField: 'test',
              text: 'Test',
              sort: true,
              editable: false,
              headerClasses: 'textHeader6',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '130px',
                position: 'relative',
              },
              formatter: (cellContent, row) => {
                return <span title={row.test}>{cellContent}</span>;
              },
            },
            {
              dataField: 'analyte',
              text: 'Analyte',
              sort: true,
              editable: false,
              headerClasses: 'textHeader2',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '130px',
                position: 'relative',
              },
              formatter: (cellContent, row) => {
                return <span title={row.analyte}>{cellContent}</span>;
              },
            },
            {
              dataField: 'result',
              text: 'Result',
              sort: true,
              headerClasses: 'textHeader1',
              editable: (content, row, rowIndex, columnIndex) =>
                row?.isResultUpdate,
              formatter: (cellContent, row) => (
                <>
                  {row?.resultType === 'W' ? (
                    <Tooltip tooltipText='Double click & expand result'>
                      <Icons.RIcon
                        nameIcon='AiFillHtml5'
                        propsIcon={{ size: 30 }}
                        onClick={() => {}}
                      />
                    </Tooltip>
                  ) : (
                    <span>{row?.result}</span>
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
                    row={{ ...row, panelStatus: 'P' }}
                    onSelect={async result => {
                      const rows = {
                        ...row,
                        panelStatus: row?.panelStatus,
                        ...result,
                      };
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
                          rows._id,
                          rows.patientResultId,
                        );
                    }}
                  />
                </>
              ),
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
                        {Number.isNaN(Number.parseFloat(row.loNor)) &&
                        Number.isNaN(Number.parseFloat(row.hiNor))
                          ? '-'
                          : Number.isNaN(Number.parseFloat(row.loNor))
                          ? `${row.hiNor} - >`
                          : Number.isNaN(Number.parseFloat(row.hiNor))
                          ? `< - ${row.loNor}`
                          : `${row.loNor} - ${row.hiNor}`}
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
              dataField: 'units',
              text: 'Units',
              sort: true,
              editable: false,
            },
            {
              dataField: 'conclusion',
              text: 'Conclusion',
              style: { width: widthConculsionBox },
              editable: (content, row, rowIndex, columnIndex) =>
                row?.isResultUpdate,
              formatter: (cell, row) => {
                return (
                  <>
                    <div className='flex justify-between flex-row gap-2'>
                      <span>{row?.conclusion?.toString()}</span>
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
                    </div>
                  </>
                );
              },
            },
            {
              dataField: 'sampleType',
              text: 'Sample Type',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderm',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '130px',
                position: 'relative',
              },
              formatter: (cellContent, row) => {
                return <span title={row.sampleType}>{cellContent}</span>;
              },
            },
            {
              dataField: 'containerId',
              text: 'Container Id',
              sort: true,
              editable: false,
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
              headerClasses: 'textHeaderm',
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
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
          ]}
          isEditModify={true}
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
