import React, { useState } from 'react';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  NumberFilter,
  DateFilter,
  textFilter,
  customFilter,
  TableBootstrap,
  Icons,
  Tooltip,
  Form,
  sortCaret,
  ModalDateTime,
  DateRangeFilter,
} from '@/library/components';
import { Confirm } from '@/library/models';
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectAnalyteCode,
} from '../index';
import {
  ModalResultReportOrder,
  ModalResultReportOrderProps,
} from './modal-result-report-order.component';
import { AutoCompleteCompanyList } from '@/core-components';

let lab;
let analyteCode;
let analyteName;
let testCode;
let testName;
let status;
let environment;
let dateCreation;
let dateActive;
let dateExpire;
let version;
let enteredBy;
let companyCode;

interface TestAnalyteMappingListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isVersionUpgrade?: boolean;
  isDuplicate?: boolean;
  instResultMappingRecords?: any;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFileds?: (fileds: any, id: string) => void;
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onUpdateOrderSeq?: (orderSeq: any) => void;
  onApproval: (record: any) => void;
  onSingleDirectUpdateField?: (
    value: any,
    dataField: string,
    id: string,
  ) => void;
}

export const TestAnalyteMappingList = (props: TestAnalyteMappingListProps) => {
  const [modalResultOrder, setModalResultOrder] =
    useState<ModalResultReportOrderProps>();
  const [modalDetails, setModalDetails] = useState<any>();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'lab',
              text: 'Lab',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Lab',
                getFilter: filter => {
                  lab = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectLabs
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.code,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Test Code',
                getFilter: filter => {
                  testCode = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'testName',
              text: 'Test Name',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Test Name',
                getFilter: filter => {
                  testName = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'analyteCode',
              text: 'Analyte Code',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Analyte Code',
                getFilter: filter => {
                  analyteCode = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectAnalyteCode
                    lab={row.lab}
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            analyteCode: [item.analyteCode],
                            analyteName: [item.analyteName],
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'analyteName',
              text: 'Analyte Name',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Analyte Name',
                getFilter: filter => {
                  analyteName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectAnalyteCode
                    lab={row.lab}
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            analyteCode: [item.analyteCode],
                            analyteName: [item.analyteName],
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'variable',
              text: 'Variable',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'calculationFlag',
              text: 'Calculation Flag',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.calculationFlag
                    ? row.calculationFlag
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
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
              dataField: 'calculationFormula',
              text: 'Calculation Formula',
              headerClasses: 'textHeader2',
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row) && row.calculationFlag,
            },
            {
              dataField: 'reportable',
              text: 'Reportable',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.reportable ? (row.reportable ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
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
              dataField: 'defaultResult',
              text: 'Default Result',
              headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'instantResult',
              text: 'Instant Result',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.instantResult ? (row.instantResult ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.instantResult}
                      onChange={instantResult => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            instantResult,
                            'instantResult',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'bill',
              text: 'Bill',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.bill ? (row.bill ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.bill}
                      onChange={bill => {
                        props.onUpdateItem &&
                          props.onUpdateItem(bill, 'bill', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'testMethod',
              text: 'Test Method',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.testMethod ? (row.testMethod ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.testMethod}
                      onChange={testMethod => {
                        props.onUpdateItem &&
                          props.onUpdateItem(testMethod, 'testMethod', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'analyteMethod',
              text: 'Analyte Method',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.analyteMethod ? (row.analyteMethod ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.analyteMethod}
                      onChange={analyteMethod => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            analyteMethod,
                            'analyteMethod',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'resultOrder',
              text: 'Result Order',
              headerClasses: 'textHeader2',
              editable: false,
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    <div className=' flex flex-row justify-around'>
                      <span>{row?.resultOrder}</span>
                      <button
                        disabled={!editorCell(row)}
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                        onClick={() => {
                          setModalResultOrder({
                            isVisible: true,
                            title: 'Order',
                            testCode: row.testCode,
                            field: 'resultOrder',
                            instResultMappingRecords:
                              props.extraData.instResultMappingRecords,
                          });
                        }}
                      >
                        Modify
                      </button>
                    </div>
                  </>
                );
              },
            },
            {
              dataField: 'reportOrder',
              text: 'Report Order',
              headerClasses: 'textHeader5',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <div className=' flex flex-row justify-around'>
                    <span>{row?.reportOrder}</span>
                    <button
                      disabled={!editorCell(row)}
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                      onClick={() => {
                        setModalResultOrder({
                          isVisible: true,
                          title: 'Order',
                          testCode: row.testCode,
                          field: 'reportOrder',
                          instResultMappingRecords:
                            props.extraData.instResultMappingRecords,
                        });
                      }}
                    >
                      Modify
                    </button>
                  </div>
                );
              },
            },

            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Status',
                getFilter: filter => {
                  status = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                row.status == 'D' || row.status == 'I' ? false : true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row.status}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const status = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(status, column.dataField, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'STATUS')
                      .filter(item => item.code != 'D')
                      .map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Entered By',
                getFilter: filter => {
                  enteredBy = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'dateCreation',
              editable: false,
              text: 'Date Creation',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateCreation
                  ? dayjs(row.dateCreation).format('YYYY-MM-DD')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateCreation = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>{dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')}</>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.InputDateTime
                    value={new Date(row.dateCreation)}
                    onFocusRemove={dateCreation => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          dateCreation,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'dateActive',
              text: 'Date Active',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: (col, row) =>
                row.dateActive
                  ? dayjs(row.dateActive).format('YYYY-MM-DD')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateActive = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>{dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')}</>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.InputDateTime
                    value={new Date(row.dateActive)}
                    onFocusRemove={dateActive => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          dateActive,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'dateExpire',
              text: 'Date Expiry',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (col, row) =>
                row.dateExpire
                  ? dayjs(row.dateExpire).format('YYYY-MM-DD')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateExpire = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>{dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')}</>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <ModalDateTime
                    {...{
                      visible: true,
                      use12Hours: false,
                      data: row.dateExpire,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    minDate={nextDay}
                    onUpdate={dateExpire => {
                      setModalDetails({ visible: false });
                      props.onSingleDirectUpdateField &&
                        props.onSingleDirectUpdateField(
                          dateExpire,
                          column.dataField,
                          row._id,
                        );
                    }}
                    onClose={() => {
                      setModalDetails({
                        visible: false,
                      });
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'version',
              text: 'Version',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  version = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Company Code',
                getFilter: filter => {
                  companyCode = filter;
                },
              }),
              headerClasses: 'textHeader2',
              // editorRenderer: (
              //   editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex,
              // ) => (
              //   <>
              //     <AutoCompleteCompanyList
              //       isLabel={false}
              //       hasError={false}
              //       onSelect={companyCode => {
              //         props.onUpdateItem &&
              //           props.onUpdateItem(
              //             companyCode,
              //             column.dataField,
              //             row._id,
              //           );
              //       }}
              //     />
              //   </>
              // ),
            },
            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Environment',
                getFilter: filter => {
                  environment = filter;
                },
              }),
              editable: false,
              // editorRenderer: (
              //   editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex,
              // ) => (
              //   <>
              //     <select
              //       value={row.environment}
              //       className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
              //       onChange={e => {
              //         const environment = e.target.value;
              //         props.onUpdateItem &&
              //           props.onUpdateItem(
              //             environment,
              //             column.dataField,
              //             row._id,
              //           );
              //       }}
              //     >
              //      <option>Select</option>
              //       {lookupItems(
              //         props.extraData.lookupItems,
              //         'ENVIRONMENT',
              //       ).map((item: any, index: number) => (
              //         <option key={index} value={item.code}>
              //           {lookupValue(item)}
              //         </option>
              //       ))}
              //     </select>
              //   </>
              // ),
            },

            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
              // hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    {props.isDelete && (
                      <Tooltip tooltipText='Delete'>
                        <Icons.IconContext
                          color='#ffffff'
                          size='20'
                          onClick={() =>
                            props.onDelete &&
                            props.onDelete({
                              type: 'Delete',
                              show: true,
                              id: [row._id],
                              title: 'Are you sure?',
                              body: 'Do you want to delete this record?',
                            })
                          }
                        >
                          {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}

                    {row.status === 'A' && (
                      <>
                        {props.isVersionUpgrade && (
                          <Tooltip
                            className='ml-2'
                            tooltipText='Version Upgrade'
                          >
                            <Icons.IconContext
                              color='#ffffff'
                              size='20'
                              onClick={() =>
                                props.onVersionUpgrade &&
                                props.onVersionUpgrade(row)
                              }
                            >
                              {Icons.getIconTag(Icons.Iconvsc.VscVersions)}
                            </Icons.IconContext>
                          </Tooltip>
                        )}
                        {props.isDuplicate && (
                          <Tooltip className='ml-2' tooltipText='Duplicate'>
                            <Icons.IconContext
                              color='#ffffff'
                              size='20'
                              onClick={() =>
                                props.onDuplicate && props.onDuplicate(row)
                              }
                            >
                              {Icons.getIconTag(
                                Icons.Iconio5.IoDuplicateOutline,
                              )}
                            </Icons.IconContext>
                          </Tooltip>
                        )}
                      </>
                    )}
                    {row.status == 'D' && (
                      <Tooltip tooltipText='Approval'>
                        <Icons.RIcon
                          nameIcon='AiOutlineCheckCircle'
                          propsIcon={{ size: 24, color: '#ffffff' }}
                          onClick={() => props.onApproval(row)}
                        />
                      </Tooltip>
                    )}
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
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='Test Analyte Mapping'
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
            // analyteCode('');
            analyteName('');
            testCode('');
            testName('');
            status('');
            environment('');
            dateCreation();
            dateActive();
            dateExpire();
            version('');
            enteredBy('');
            companyCode('');
          }}
          dynamicStylingFields={[
            'lab',
            'testName',
            'analyteCode',
            'status',
            'environment',
          ]}
          hideExcelSheet={['_id', 'opration']}
        />
        <ModalResultReportOrder
          {...modalResultOrder}
          onClick={orderSeq => {
            props.onUpdateOrderSeq && props.onUpdateOrderSeq(orderSeq);
            setModalResultOrder({ isVisible: false });
          }}
          onClose={() => {
            setModalResultOrder({ isVisible: false });
          }}
        />
      </div>
    </>
  );
};
