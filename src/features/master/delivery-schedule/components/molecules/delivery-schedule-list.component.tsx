import React from 'react';
import { dayjs, lookupItems, lookupValue } from '@/library/utils';
import {
  textFilter,
  TableBootstrap,
  Form,
  Tooltip,
  Icons,
  sortCaret,
  ModalDateTime,
  customFilter,
  DateFilter,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { AutoCompleteCompanyList } from '@/core-components';
let schCode;
let schName;
let pStartTime;
let pEndTime;
let cutofTime;
let secoundCutofTime;
let processingType;
let reportOn;
let dynamicRT;
let dynamicTU;
let fixedRT;
let schForDept;
let schForPat;
let environment;
let status;
let companyCode;
let sampleReceivedDate;
let reportDate;
interface DeliverySchduleListProps {
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
  onApproval: (record: any) => void;
}

export const DeliverySchduleList = (props: DeliverySchduleListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
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
              dataField: 'schCode',
              text: 'Sch Code',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  schCode = filter;
                },
              }),
              editorStyle: { textTransform: 'uppercase' },
              style: { textTransform: 'uppercase' },
              editable: false,
            },
            {
              dataField: 'schName',
              text: 'Delivery Schedule',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  schName = filter;
                },
              }),
              editorStyle: { textTransform: 'uppercase' },
              style: { textTransform: 'uppercase' },
            },
            {
              dataField: 'sundayProcessing',
              text: 'Sunday Processing',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.sundayProcessing
                    ? row.sundayProcessing
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.sundayProcessing}
                      onChange={sundayProcessing => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            sundayProcessing,
                            'sundayProcessing',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'holidayProcessing',
              text: 'Holiday Processing',
              headerClasses: 'textHeader5',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              // filter: textFilter({
              //   getFilter: (filter) =>{
              //     holidayProcessing = filter
              //   }
              // }),
              // editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.holidayProcessing}
                      onChange={holidayProcessing => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            holidayProcessing,
                            'holidayProcessing',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'sundayReporting',
              text: 'Sunday Reporting',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              // filter: textFilter({
              //   getFilter: (filter) =>{
              //     schCode = filter
              //   }
              // }),
              // editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.sundayReporting}
                      onChange={sundayReporting => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            sundayReporting,
                            'sundayReporting',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'holidayReporting',
              text: 'Holiday Reporting',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.holidayReporting
                    ? row.holidayReporting
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.holidayReporting}
                      onChange={holidayReporting => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            holidayReporting,
                            'holidayReporting',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'scheduleForPatAndDept',
              text: 'Schedule For Pat/Dept',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.holidayReporting
                    ? row.holidayReporting
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.DeliveryScheduleToggle
                      disabled={!editorCell(row)}
                      value={row.scheduleForPatAndDept}
                      onChange={scheduleForPatAndDept => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            scheduleForPatAndDept,
                            'scheduleForPatAndDept',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'pStartTime',
              text: 'Processing Start Time',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  pStartTime = filter;
                },
              }),
            },
            {
              dataField: 'pEndTime',
              text: 'Processing End Time',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  pEndTime = filter;
                },
              }),
            },
            {
              dataField: 'cutofTime',
              text: 'Cut-off Time',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  cutofTime = filter;
                },
              }),
            },
            {
              dataField: 'secondCutoffTimeRequired',
              text: 'Second Cut-off Time Required',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.secondCutoffTimeRequired
                    ? row.secondCutoffTimeRequired
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.secondCutoffTimeRequired}
                      onChange={secondCutoffTimeRequired => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            secondCutoffTimeRequired,
                            'secondCutoffTimeRequired',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'secoundCutofTime',
              text: 'Second Cut-off Time',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  secoundCutofTime = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                !row.secondCutoffTimeRequired && editorCell(row),
            },

            {
              dataField: 'processingType',
              text: 'Processing Type',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  processingType = filter;
                },
              }),
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
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const processingType = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          processingType,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PROCESSING_TYPE',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'schFrequency',
              text: 'Sch Frequency',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: (cell, row, rowIndex) =>
                `${JSON.stringify(row.schFrequency)}`,
              //filter: textFilter({})
              formatter: (cell, row) => {
                return <>{JSON.stringify(row.schFrequency)}</>;
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'reportOn',
              text: 'Report On',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  reportOn = filter;
                },
              }),
            },
            {
              dataField: 'dynamicRT',
              text: 'Dynamic Reporting Time Unit',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  dynamicRT = filter;
                },
              }),
            },
            {
              dataField: 'dynamicTU',
              text: 'Dynamic Reporting Time Unit',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  dynamicTU = filter;
                },
              }),
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
                    value={row.dynamicTU}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const dynamicTU = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          dynamicTU,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'DYNAMIC_TU').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'fixedRT',
              text: 'Fixed Reporting Time Unit',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  fixedRT = filter;
                },
              }),
            },
            {
              dataField: 'onTime',
              text: 'On Time',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${row.onTime ? (row.onTime ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.onTime}
                      onChange={onTime => {
                        props.onUpdateItem &&
                          props.onUpdateItem(onTime, 'onTime', row._id);
                      }}
                    />
                  </>
                );
              },
            },

            // {
            //   dataField: 'schForDept',
            //   text: 'Sch For Dept',
            //   headerClasses: 'textHeader1',
            //   sort: true,
            //   headerStyle: {
            //     fontSize: 0,
            //   },
            //   sortCaret: (order, column) => sortCaret(order, column),
            //   csvFormatter: col => (col ? col : ''),
            //   filter: textFilter({
            //     getFilter: filter => {
            //       schForDept = filter;
            //     },
            //   }),
            //   editable: (content, row, rowIndex, columnIndex) =>
            //     editorCell(row),
            // },
            // {
            //   dataField: 'schForPat',
            //   text: 'Sch For Pat',
            //   headerClasses: 'textHeader1',
            //   sort: true,
            //   headerStyle: {
            //     fontSize: 0,
            //   },
            //   sortCaret: (order, column) => sortCaret(order, column),
            //   csvFormatter: col => (col ? col : ''),
            //   filter: textFilter({
            //     getFilter: filter => {
            //       schForPat = filter;
            //     },
            //   }),
            //   editable: (content, row, rowIndex, columnIndex) =>
            //     editorCell(row),
            // },

            {
              dataField: 'status',
              text: 'Status',
              sort: true,
              headerClasses: 'textHeader',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
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
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                    }
                    onChange={e => {
                      const status = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(status, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
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
              dataField: 'sampleReceivedDate',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              text: 'Sample Received Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateExpire
                  ? dayjs(row.sampleReceivedDate).format('YYYY-MM-DD')
                  : '',
              // filter: dateFilter({
              //   comparators: [
              //     Comparator.EQ,
              //     Comparator.GE,
              //     Comparator.LT,
              //   ],
              //   dateStyle: { marginLeft: "2px" },
              //   defaultValue: {
              //     comparator: Comparator.EQ,
              //   },
              //   style: { display: "inline" },
              // }),
              filter: customFilter({
                getFilter: filter => {
                  sampleReceivedDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              // formatter: (cell, row) => {
              //   return (
              //     <>
              //       {dayjs(row.sampleReceivedDate).format(
              //         'DD-MM-YYYY HH:mm:ss',
              //       ) ?? ''}
              //     </>
              //   );
              // },
            },
            {
              dataField: 'reportDate',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              text: 'Report Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),

              // filter: dateFilter({
              //   comparators: [
              //     Comparator.EQ,
              //     Comparator.GE,
              //     Comparator.LT,
              //   ],
              //   dateStyle: { marginLeft: "2px" },
              //   defaultValue: {
              //     comparator: Comparator.EQ,
              //   },
              //   style: { display: "inline" },
              // }),
              filter: customFilter({
                getFilter: filter => {
                  reportDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              // formatter: (cell, row) => {
              //   return (
              //     <>
              //       {dayjs(row.reportDate).format('DD-MM-YYYY HH:mm:ss') ?? ''}
              //     </>
              //   );
              // },
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
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: false,
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  environment = filter;
                },
              }),
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
                          color='#fff'
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
          fileName='Delivery Schedule'
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
            schCode('');
            pStartTime('');
            pEndTime('');
            cutofTime('');
            secoundCutofTime('');
            processingType('');
            reportOn('');
            dynamicRT('');
            dynamicTU('');
            fixedRT('');
            schForDept('');
            schForPat('');
            environment('');
            companyCode('');
            sampleReceivedDate('');
            reportDate('');
          }}
          dynamicStylingFields={['schCode', 'environment']}
          hideExcelSheet={['_id', 'opration']}
        />
      </div>
    </>
  );
};
