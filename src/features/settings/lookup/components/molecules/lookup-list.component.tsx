import React, { useEffect } from 'react';
import { lookupCodeValue, lookupItems, lookupValue } from '@/library/utils';
import {
  AutocompleteGroupBy,
  Buttons,
  textFilter,
  List,
  Form,
  Icons,
  Tooltip,
  sortCaret,
} from '@/library/components';
import { TableBootstrap } from '../organsims/table-bootstrap.component';
import { Confirm } from '@/library/models';
import { dashboardRouter as dashboardRoutes } from '@/routes';
import { AutoCompleteCompanyList } from '@/core-components';
import { Table } from 'reactstrap';
let router = dashboardRoutes;

let documentName;
let fieldName;
let arrValue;
let description;
let defaultItem;
let environment;
let status;

interface LookupListProps {
  data: any;
  totalSize: number;
  uiVariable?: any;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onUpdateValues?(items: any, id: string);
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (record: any) => void;
}

export const LookupList = (props: LookupListProps) => {
  useEffect(() => {
    router = router.filter((item: any) => {
      if (item.name !== 'Dashboard') {
        item.toggle = false;
        item.title = item.name;
        item = item?.children.filter(childernItem => {
          childernItem.title = childernItem.name;
          childernItem.toggle = false;
          return childernItem;
        });
        return item;
      }
    });
  }, []);
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <div className={`${props.isView ? 'shown' : 'hidden'}`}>
      <TableBootstrap
        id='_id'
        editorId={props.uiVariable?.editorId}
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
            dataField: 'documentName',
            text: 'Document Name',
            headerClasses: 'textHeader4',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `${row.documentName?.children.title}`,
            filter: textFilter({
              placeholder: 'Document Name',
              getFilter: filter => {
                documentName = filter;
              },
            }),
            formatter: (cell, row) => {
              return <>{`${row.documentName?.children?.title || ''}`}</>;
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
                <AutocompleteGroupBy
                  data={router}
                  onChange={async (item: any, children: any) => {
                    const documentName = {
                      name: item.name,
                      title: item.title,
                      path: item.path,
                      children,
                    };
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        documentName,
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'fieldName',
            text: 'Field Name',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            style: { textTransform: 'uppercase' },
            editorStyle: { textTransform: 'uppercase' },
            filter: textFilter({
              placeholder: 'Field Name',
              getFilter: filter => {
                fieldName = filter;
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
                <Form.Input
                  placeholder='Field Name'
                  defaultValue={row.fieldName}
                  onBlur={fieldName => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        fieldName.toUpperCase(),
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'arrValue',
            text: 'Value & code',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `Value:${row.arrValue.map(
                item => item.value,
              )} - Code:${row.arrValue.map(item => item.code)}`,
            filter: textFilter({
              placeholder: 'Value & code',
              getFilter: filter => {
                arrValue = filter;
              },
            }),
            editable: false,
            formatter: (cellContent, row) => (
              <>
                <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                  <Table striped bordered>
                    <thead>
                      <tr className='p-0 text-xs'>
                        <th className='text-white' style={{ minWidth: 70 }}>
                          Code
                        </th>
                        <th className='text-white' style={{ minWidth: 70 }}>
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-xs'>
                      {row?.arrValue?.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td>{lookupCodeValue(item)}</td>
                              <td>{lookupValue(item)}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                {/* <div className='flex flex-row w-80 gap-2 items-center overflow-auto'>
                  {row.arrValue.map(item => (
                    <div className='mb-2'>
                      <Buttons.Button
                        size='medium'
                        type='solid'
                        buttonStyle={{
                          backgroundColor: 'gray',
                        }}
                        onClick={() => {}}
                      >
                        {`${lookupValue(item)}  `}
                        <Form.Toggle
                          value={item?.flagUpperCase}
                          disabled={true}
                        />
                      </Buttons.Button>
                    </div>
                  ))}
                </div> */}
              </>
            ),
          },
          {
            dataField: 'description',
            text: 'Description',
            headerClasses: 'textHeader',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Description',
              getFilter: filter => {
                description = filter;
              },
            }),
          },
          {
            dataField: 'defaultItem',
            text: 'Default Item',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `Value:${row.defaultItem.map(
                item => item.value,
              )} - Code:${row.defaultItem.map(item => item.code)}`,
            filter: textFilter({
              placeholder: 'Default Item',
              getFilter: filter => {
                defaultItem = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <List space={2} direction='row' justify='center'>
                  {row.defaultItem &&
                    row.defaultItem.map(item => (
                      <div className='mb-2'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          buttonStyle={{
                            backgroundColor: 'gray',
                          }}
                          onClick={() => {}}
                        >
                          {lookupValue(item)}
                        </Buttons.Button>
                      </div>
                    ))}
                </List>
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
                <select
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                  }
                  onChange={e => {
                    if (e.target.value === 'removeItem') {
                      return (
                        props.onUpdateItem &&
                        props.onUpdateItem([], 'defaultItem', row._id)
                      );
                    }
                    let defaultItem = JSON.parse(e.target.value);
                    defaultItem = [
                      {
                        code: defaultItem.code,
                        value: defaultItem.value,
                      },
                    ];
                    props.onUpdateItem &&
                      props.onUpdateItem(defaultItem, 'defaultItem', row._id);
                  }}
                >
                  <option selected>Select</option>
                  <option value='removeItem'>Remove Item</option>
                  {row.arrValue.map((item: any, index: number) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </>
            ),
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
            // editable: (content, row, rowIndex, columnIndex) =>
            //   row.status == 'D' || row.status == 'I' ? false : true,
            editable: (content, row, rowIndex, columnIndex) =>
              row.status == 'D' ? false : true,
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
          // {
          //   text: 'Company Code',
          //   dataField: 'companyCode',
          //   sort: true,
          //   headerStyle: {
          //     fontSize: 0,
          //   },
          //   sortCaret: (order, column) => sortCaret(order, column),
          //   editable: false,
          //   csvFormatter: col => (col ? col : ''),
          //   filter: textFilter({
          //     getFilter: filter => {
          //       companyCode = filter;
          //     },
          //   }),
          //   headerClasses: 'textHeader2',
          // },
          {
            dataField: 'environment',
            text: 'Environment',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
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
            //       <option selected>Select</option>
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
                <div className='flex flex-row gap-2'>
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

                  {row.status !== 'I' && (
                    <Tooltip tooltipText='Edit'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() =>
                          props.onUpdateValues &&
                          props.onUpdateValues(row, row._id)
                        }
                      >
                        {Icons.getIconTag(Icons.IconBi.BiEdit)}
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
        fileName='Lookup'
        onSelectedRow={rows => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id));
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id);
        }}
        onPageSizeChange={(page, size) =>
          props.onPageSizeChange && props.onPageSizeChange(page, size)
        }
        onFilter={(type, filter, page, size) => {
          props.onFilter && props.onFilter(type, filter, page, size);
        }}
        clearAllFilter={() => {
          documentName('');
          fieldName('');
          arrValue('');
          description('');
          defaultItem('');
          environment('');
          status('');
        }}
        hideExcelSheet={['_id', 'opration']}
        dynamicStylingFields={['documentName', 'fieldName', 'environment']}
      />
    </div>
  );
};
