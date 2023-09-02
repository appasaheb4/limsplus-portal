import React from 'react';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  textFilter,
  TableBootstrap,
  Form,
  Tooltip,
  Icons,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
let schCode;
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
interface DeliverySchduleListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
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
  return (
    <>
      <div style={{position: 'relative'}}>
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
              editable: false,
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
              editable: false,
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
              editable: false,
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
              dataField: 'pStartTime',
              text: 'P Start Time',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
              text: 'P End Time',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
              text: 'Cutof Time',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  cutofTime = filter;
                },
              }),
            },
            {
              dataField: 'secoundCutofTime',
              text: 'Secound Cutof Time',
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
            },
            {
              dataField: 'processingType',
              text: 'Processing Type',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
            },
            {
              dataField: 'reportOn',
              text: 'Report On',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
              text: 'Dynamic RT',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
              text: 'Dynamic TU',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
              text: 'Fixed RT',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
            {
              dataField: 'schForDept',
              text: 'Sch For Dept',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  schForDept = filter;
                },
              }),
            },
            {
              dataField: 'schForPat',
              text: 'Sch For Pat',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  schForPat = filter;
                },
              }),
            },
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
                    {lookupItems(props.extraData.lookupItems, 'STATUS').map(
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
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  environment = filter;
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
                    value={row.environment}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                    }
                    onChange={e => {
                      const environment = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          environment,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'ENVIRONMENT',
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
              dataField: 'opration',
              text: 'Action',
              editable: false,
              csvExport: false,
              hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
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
                            body: 'Delete item',
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                    </Tooltip>
                    {row.status == 'D' && (
                      <Tooltip tooltipText='Approval'>
                        <Icons.RIcon
                          nameIcon='AiOutlineCheckCircle'
                          propsIcon={{size: 24, color: '#ffffff'}}
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
          isEditModify={props.isEditModify}
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
          }}
          dynamicStylingFields={['schCode', 'environment']}
          hideExcelSheet={['_id', 'opration']}
        />
      </div>
    </>
  );
};
