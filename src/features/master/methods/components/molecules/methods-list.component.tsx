import React from 'react';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  TableBootstrap,
  textFilter,
  Tooltip,
  Icons,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';

let methodsCode;
let methodsName;
let description;
let status;
let environment;

interface MethodsListProps {
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
}

export const MethodsList = (props: MethodsListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
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
          dataField: 'methodsCode',
          text: 'Methods Code',
          headerClasses: 'textHeader4',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          filter: textFilter({
            getFilter: filter => {
              methodsCode = filter;
            },
          }),
          editable: false,
        },
        {
          dataField: 'methodsName',
          text: 'Methods Name',
          headerClasses: 'textHeader4',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          filter: textFilter({
            getFilter: filter => {
              methodsName = filter;
            },
          }),
          editable: false,
        },
        {
          dataField: 'description',
          text: 'Description',
          headerClasses: 'textHeader4',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          filter: textFilter({
            getFilter: filter => {
              description = filter;
            },
          }),
          style: {textTransform: 'uppercase'},
          editorStyle: {textTransform: 'uppercase'},
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: 'status',
          text: 'Status',
          headerClasses: 'textHeader2',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          filter: textFilter({
            getFilter: filter => {
              status = filter;
            },
          }),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
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
          headerClasses: 'textHeader3',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                    props.onUpdateItem(environment, column.dataField, row._id);
                }}
              >
                <option selected>Select</option>
                {lookupItems(props.extraData.lookupItems, 'ENVIRONMENT').map(
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
      fileName='Methods'
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
        methodsCode('');
        methodsName('');
        description('');
        status('');
        environment('');
      }}
      dynamicStylingFields={[
        'methodsCode',
        'methodName',
        'status',
        'environment',
      ]}
      hideExcelSheet={['opration', '_id']}
    />
  );
};
