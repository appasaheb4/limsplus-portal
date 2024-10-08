import React from 'react';
import { observer } from 'mobx-react';
import {
  TableBootstrap,
  Icons,
  Form,
  Tooltip,
  textFilter,
  sortCaret,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { lookupItems, lookupValue } from '@/library/utils';

let environmentVariable;
let category;
let descriptions;
let enteredBy;
let status;
let companyCode;
let environment;

interface EnvironmentVariableProps {
  data: any;
  extraData: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedUser: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (records: any) => void;
}
export const EnvironmentVariableList = observer(
  (props: EnvironmentVariableProps) => {
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
                dataField: 'environmentVariable',
                text: 'Environment Variable',
                headerClasses: 'textHeader5',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                editable: (content, row, rowIndex, columnIndex) => row.isModify,
                csvFormatter: col => (col ? col : ''),
                filter: textFilter({
                  placeholder: 'Environment Variable',
                  getFilter: filter => {
                    environmentVariable = filter;
                  },
                }),
                style: {
                  textTransform: 'uppercase',
                },
                editorStyle: { textTransform: 'uppercase' },
              },
              {
                dataField: 'category',
                text: 'Category',
                headerClasses: 'textHeader3',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                editable: (content, row, rowIndex, columnIndex) => row.isModify,
                csvFormatter: col => (col ? col : ''),
                filter: textFilter({
                  placeholder: 'Category',
                  getFilter: filter => {
                    category = filter;
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
                        const category = e.target.value as string;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            category,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'ENVIRONMENT_VARIABLES_CATEGORY',
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
                dataField: 'descriptions',
                text: 'Description',
                headerClasses: 'textHeader',
                editable: (content, row, rowIndex, columnIndex) => row.isModify,
                filter: textFilter({
                  placeholder: 'Descriptions',
                  getFilter: filter => {
                    descriptions = filter;
                  },
                }),
                style: {
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                  maxWidth: '250px',
                  position: 'relative',
                },
                formatter: (cellContent, row) => (
                  <span title={row.description}>{cellContent}</span>
                ),
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: col => (col ? col : ''),
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
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                      }
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
                headerClasses: 'textHeader3',
                editable: false,
                filter: textFilter({
                  placeholder: 'Entered By',
                  getFilter: filter => {
                    enteredBy = filter;
                  },
                }),
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: col => (col ? col : ''),
              },
              {
                dataField: 'allLabs',
                text: 'All Labs',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        disabled={!row.isModify}
                        value={row?.allLabs || false}
                        onChange={allLabs => {
                          props.onUpdateItem &&
                            props.onUpdateItem(allLabs, 'allLabs', row._id);
                        }}
                      />
                    </>
                  );
                },
              },

              {
                dataField: 'allUsers',
                text: 'All User',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        disabled={!row.isModify}
                        value={row?.allUsers || false}
                        onChange={allUsers => {
                          props.onUpdateItem &&
                            props.onUpdateItem(allUsers, 'allUsers', row._id);
                        }}
                      />
                    </>
                  );
                },
              },
              {
                dataField: 'allDepartment',
                text: 'All Department',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        label='Department'
                        disabled={!row.isModify}
                        value={row?.allDepartment || false}
                        onChange={allDepartment => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              allDepartment,
                              'allDepartment',
                              row._id,
                            );
                        }}
                      />
                    </>
                  );
                },
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
                headerClasses: 'textHeader2',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                editable: false,
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: col => (col ? col : ''),
                filter: textFilter({
                  placeholder: 'Environment',
                  getFilter: filter => {
                    environment = filter;
                  },
                }),
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
                //       className='leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md'
                //       onChange={e => {
                //         const environment = e.target.value;
                //         props.onUpdateItem &&
                //           props.onUpdateItem(environment, column.dataField, row._id);
                //       }}
                //     >
                //      <option>Select</option>
                //       {lookupItems(props.extraData.lookupItems, 'ENVIRONMENT').map(
                //         (item: any, index: number) => (
                //           <option key={index} value={item.code}>
                //             {lookupValue(item)}
                //           </option>
                //         ),
                //       )}
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
                                type: 'delete',
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
            isEditModify={props.isUpdate}
            isExport={props.isExport}
            isSelectRow={true}
            fileName='Environement Variable'
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
              environmentVariable('');
              category('');
              descriptions('');
              enteredBy('');
              status('');
              companyCode('');
              environment('');
            }}
            dynamicStylingFields={['environmentVariable', 'category']}
            hideExcelSheet={['_id', 'opration']}
          />
        </div>
      </>
    );
  },
);
