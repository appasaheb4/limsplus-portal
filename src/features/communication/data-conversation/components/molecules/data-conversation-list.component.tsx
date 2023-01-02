import React from 'react';
import {
  TableBootstrap,
  textFilter,
  Icons,
  Tooltip,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {lookupItems, lookupValue} from '@/library/utils';

let hexadecimal;
let binary;
let ascii;
let environment;

interface ConversationMappingListProps {
  data: any;
  extraData: any;
  totalSize: number;
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

export const DataConversationList = (props: ConversationMappingListProps) => {
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
          dataField: 'hexadecimal',
          text: 'Hexa Decimal',
          headerClasses: 'textHeader4',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          filter: textFilter({
            getFilter: filter => {
              hexadecimal = filter;
            },
          }),
          formatter: (cellContent, row) => (
            <>
              {row.hexadecimal !== undefined
                ? row.hexadecimal
                    .toString()
                    .replaceAll(/&amp;/g, '&')
                    .replaceAll(/&gt;/g, '>')
                    .replaceAll(/&lt;/g, '<')
                    .replaceAll(/&quot;/g, '"')
                    .replaceAll(/â/g, '’')
                    .replaceAll(/â¦/g, '…')
                    .toString()
                : undefined}
            </>
          ),
        },
        {
          dataField: 'binary',
          text: 'Binary',
          headerClasses: 'textHeader4',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          filter: textFilter({
            getFilter: filter => {
              binary = filter;
            },
          }),
          formatter: (cellContent, row) => (
            <>
              {row.binary !== undefined
                ? row.binary
                    .toString()
                    .replaceAll(/&amp;/g, '&')
                    .replaceAll(/&gt;/g, '>')
                    .replaceAll(/&lt;/g, '<')
                    .replaceAll(/&quot;/g, '"')
                    .replaceAll(/â/g, '’')
                    .replaceAll(/â¦/g, '…')
                    .toString()
                : undefined}
            </>
          ),
        },
        {
          dataField: 'ascii',
          text: 'ASCII',
          headerClasses: 'textHeader4',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: col => (col ? col : ''),
          filter: textFilter({
            getFilter: filter => {
              ascii = filter;
            },
          }),
          formatter: (cellContent, row) => (
            <>
              {row.ascii
                ? row.ascii
                    .toString()
                    .replaceAll(/&amp;/g, '&')
                    .replaceAll(/&gt;/g, '>')
                    .replaceAll(/&lt;/g, '<')
                    .replaceAll(/&quot;/g, '"')
                    .replaceAll(/â/g, '’')
                    .replaceAll(/â¦/g, '…')
                    .toString()
                : undefined}
            </>
          ),
        },
        {
          dataField: 'environment',
          text: 'Environment',
          headerClasses: 'textHeader2',
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
                className='leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md'
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
          dataField: 'operation',
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
      fileName='Data Conversion'
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
        hexadecimal('');
        binary('');
        ascii('');
        environment('');
      }}
    />
  );
};
