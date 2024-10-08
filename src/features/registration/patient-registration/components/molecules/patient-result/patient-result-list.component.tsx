import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  textFilter,
  Form,
  sortCaret,
  Icons,
  Tooltip,
} from '@/library/components';
import { Confirm } from '@/library/models';
import TableBootstrap from './table-bootstrap.component';
import dayjs from 'dayjs';
import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { TiFlowChildren } from 'react-icons/ti';
import { ModalReportHtmlView } from '@/core-components/molecules/modal/modal-report-html-view.component';

interface PatientResultProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

let labId;
let plab;
let companyCode;

export const PatientResultList = observer((props: PatientResultProps) => {
  const [refRangeRowId, setRefRangleRowId] = useState('');
  const [modalReportHtmlView, setModalReportHtmlView] = useState<any>({
    visible: false,
  });
  const [widthRefBox, setWidthRefBox] = useState('60px');
  const editorCell = (row: any) => {
    return false; //row.status !== "I" ? true : false
  };

  const expandRow = {
    renderer: row =>
      row?.resultType === 'V' ? (
        <div className='z-0'>
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
            onUpdateItem={(value: any, dataField: string, id: string) => {}}
          />
        </div>
      ) : null,

    showExpandColumn: true,
  };

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          isPagination={false}
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
              headerClasses: 'textHeaderl',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              // headerClasses: 'textHeader4',
              // filter: textFilter({
              //   getFilter: filter => {
              //     plab = filter;
              //   },
              // }),
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'departement',
              text: 'Departement',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'panelStatus',
              text: 'Panel Status',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'analyteCode',
              text: 'Analyte Code',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'analyteName',
              text: 'Analyte Name',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '190px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.analyteName}>{cellContent}</span>
              ),
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'result',
              text: 'Result',
              headerClasses: 'textHeaderm',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                if (row.resultType === 'W') {
                  return (
                    <>
                      <button
                        className='bg-slate-500 text-white font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded'
                        type='button'
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => {
                          setModalReportHtmlView({
                            visible: true,
                            details: row?.result,
                          });
                        }}
                      >
                        Preview
                      </button>
                    </>
                  );
                } else {
                  return row.result;
                }
              },
            },
            {
              dataField: 'units',
              text: 'Units',
              // headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
              dataField: 'resultType',
              text: 'Result Type',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'reportable',
              text: 'Reportable',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.reportable}
                      onChange={reportable => {
                        props.onUpdateItem &&
                          props.onUpdateItem(reportable, 'reportable', row._id);
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'calculationFlag',
              text: 'Calculation Flag',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.calculationFlag}
                      onChange={calculationFlag => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            calculationFlag,
                            'calculationFlag',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'calcyName',
              text: 'Calculation Name',
              // headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'picture',
              text: 'Picture',
              // headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },

            {
              dataField: 'resultDate',
              text: 'Result Date',
              headerClasses: 'textHeaderl',
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.resultDate
                      ? dayjs(row?.resultDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'alpha',
              text: 'Alpha',
              // headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'numeric',
              text: 'Numeric',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'instResult',
              text: 'Inst Result',
              // headerClasses: 'textHeader6',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'instUnit',
              text: 'Inst Unit',
              // headerClasses: 'textHeader6',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'instResultDate',
              text: 'Inst Result Date',
              headerClasses: 'textHeaderl',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.instResultDate
                      ? dayjs(row?.instResultDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'abnFlag',
              text: 'ABN Flag',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.abnFlag}
                      onChange={abnFlag => {
                        props.onUpdateItem &&
                          props.onUpdateItem(abnFlag, 'abnFlag', row._id);
                      }}
                    />
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
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.critical}
                      onChange={critical => {
                        props.onUpdateItem &&
                          props.onUpdateItem(critical, 'critical', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'rangeVersion',
              text: 'Range Version',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'showRanges',
              text: 'ShowRanges',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.showRanges}
                      onChange={showRanges => {
                        props.onUpdateItem &&
                          props.onUpdateItem(showRanges, 'showRanges', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'rangeSetOn',
              text: 'Range Set On',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'rangeId',
              text: 'Range Id',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'sex',
              text: 'Sex',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'age',
              text: 'Age',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'ageUnit',
              text: 'Age Unit',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'species',
              text: 'Species',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'loNor',
              text: 'Lo Nor',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return <>{row.loNor == 'NaN' ? '<' : row.loNor}</>;
              },
            },
            {
              dataField: 'hiNor',
              text: 'Hi Nor',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return <>{row.hiNor == 'NaN' ? '>' : row.hiNor}</>;
              },
            },
            {
              dataField: 'interpretation',
              text: 'Interpretation',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'conclusion',
              text: 'Conclusion',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },

            {
              dataField: 'instId',
              text: 'Inst Id',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'instType',
              text: 'Inst Type',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'testStatus',
              text: 'Test Status',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'resultStatus',
              text: 'Result Status',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            // extra Data
            {
              dataField: 'method',
              text: 'Method',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.extraData.method}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'specificFormat',
              text: 'Specific Format',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row?.specificFormat}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'analyteMethodCode',
              text: 'Analyte Method Code',
              // headerClasses: 'textHeader6',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.analyteMethodCode}</span>
                  </>
                );
              },
            },
            {
              dataField: 'analyteMethodName',
              text: 'Analyte Method Name',
              // headerClasses: 'textHeader6',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.analyteMethodName}</span>
                  </>
                );
              },
            },
            {
              dataField: 'runno',
              text: 'Runno',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.runno}</span>
                  </>
                );
              },
            },
            {
              dataField: 'platerunno',
              text: 'Platerunno',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.platerunno}</span>
                  </>
                );
              },
            },
            {
              dataField: 'plateno',
              text: 'Plateno',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.plateno}</span>
                  </>
                );
              },
            },
            {
              dataField: 'repetation',
              text: 'Repetation',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.repetation}</span>
                  </>
                );
              },
            },
            {
              dataField: 'version',
              text: 'Analyte Version',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.version}</span>
                  </>
                );
              },
            },
            {
              dataField: 'reportOrder',
              text: 'Report Order',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.reportOrder}</span>
                  </>
                );
              },
            },
            {
              dataField: 'reportPriority',
              text: 'Report Priority',
              // headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: (col, row) =>
                row?.reportPriority ? row.reportPriority : '',
              editable: false,
            },
            {
              dataField: 'deliveryMode',
              text: 'Delivery Mode',
              // headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: (col, row) =>
                row?.deliveryMode ? row.deliveryMode : '',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <div className='flex flex-row flex-wrap gap-2'>
                    {row?.deliveryMode?.map((item, index) => (
                      <span
                        key={index}
                        className='bg-blue-800 rounded-md p-2 text-white'
                      >
                        {item.code}
                      </span>
                    ))}
                  </div>
                );
              },
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.enteredBy}</span>
                  </>
                );
              },
            },
            {
              dataField: 'companyCode',
              text: 'Company Code',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'environment',
              text: 'Environment',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData.environment}</span>
                  </>
                );
              },
            },
            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
              // hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row gap-2'>
                    <Tooltip tooltipText='Traceability'>
                      <TiFlowChildren color='#ffffff' size='20' />
                    </Tooltip>
                  </div>
                </>
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
          // isEditModify={props.isUpdate}
          isEditModify={false}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='PatientResult'
          // expandRow={expandRow}
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
          clearAllFilter={() => {
            labId('');
            plab('');
            companyCode('');
          }}
        />
        <ModalReportHtmlView
          {...modalReportHtmlView}
          onClose={() => {
            setModalReportHtmlView({ visible: false });
          }}
        />
      </div>
    </>
  );
});
