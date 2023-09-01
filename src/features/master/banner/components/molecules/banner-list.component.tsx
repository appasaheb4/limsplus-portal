import React from 'react';
import {
  TableBootstrap,
  sortCaret,
  textFilter,
  Tooltip,
  Icons,
  Form,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';

let title;
let environment;
let status;

interface BannerListProps {
  data: any;
  totlaSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateImage?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (record: any) => void;
}
const dynamicStylingFields = ['title', 'environment'];
const hideExcelSheet = ['_id', 'image', 'operation'];
export const BannerList = (props: BannerListProps) => {
  return (
    <TableBootstrap
      id='_id'
      data={props.data}
      totalSize={props.totlaSize}
      columns={[
        {
          dataField: '_id',
          text: 'Id',
          hidden: true,
          csvExport: false,
        },
        {
          dataField: 'title',
          text: 'Title',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              title = filter;
            },
          }),
        },
        {
          dataField: 'image',
          text: 'Image',
          csvExport: false,
          headerClasses: 'textHeader',
          formatter: (cell, row) => {
            return (
              <>
                <img
                  src={row.image}
                  alt={row.title || row._id}
                  className='object-fill h-35 w-40 rounded-md'
                />
              </>
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
              <Form.InputFile
                label='File'
                placeholder='File'
                onChange={e => {
                  const image = e.target.files[0];
                  props.onUpdateImage &&
                    props.onUpdateImage(image, column.dataField, row._id);
                }}
              />
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
          headerClasses: 'textHeader',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
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
                  ' leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
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
            return 'sticky right-0 bg-gray-500 ';
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
      fileName='Banner'
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
        title('');
        environment('');
        status('');
      }}
      dynamicStylingFields={dynamicStylingFields}
      hideExcelSheet={hideExcelSheet}
    />
  );
};
