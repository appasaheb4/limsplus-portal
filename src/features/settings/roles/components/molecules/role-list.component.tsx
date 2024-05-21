import React from 'react';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  Icons,
  Tooltip,
  textFilter,
  sortCaret,
} from '@/library/components';
import { Confirm } from '@/library/models';

let code;
let description;
let environment;
let status;
let companyCode;

interface RoleListProps {
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
  hideAddRole: boolean;
  setHideAddRole: any;
}

export const RoleList = (props: RoleListProps) => {
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
          dataField: 'code',
          text: 'Code',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          headerClasses: 'textHeader',
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            placeholder: 'Code',
            getFilter: filter => {
              code = filter;
            },
          }),
          editorStyle: { textTransform: 'uppercase' },
          style: { textTransform: 'uppercase' },
          editable: false,
        },
        {
          dataField: 'description',
          text: 'Description',
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
          headerClasses: 'textHeader',
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            placeholder: 'Description',
            getFilter: filter => {
              description = filter;
            },
          }),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          editorStyle: { textTransform: 'uppercase' },
        },
        {
          dataField: 'status',
          text: 'Status',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) =>
            row.status == 'D' || row.status == 'I' ? false : true,
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            placeholder: 'Status',
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
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          headerClasses: 'textHeader',
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
          //       className={
          //         'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
          //       }
          //       onChange={e => {
          //         const environment = e.target.value;
          //         props.onUpdateItem &&
          //           props.onUpdateItem(environment, column.dataField, row._id);
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
          dataField: 'opration',
          text: 'Action',
          editable: false,
          csvExport: false,
          // hidden: !props.isDelete,
          formatter: (cellContent, row) => (
            <>
              <div className='flex flex-row'>
                <Tooltip tooltipText='Delete'>
                  <Icons.IconContext
                    color='#fff'
                    size='20'
                    isDisable={row?.code == 'ONBOARDING' ? true : false}
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
      isEditModify={props.isEditModify}
      isSelectRow={true}
      fileName='Role'
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
        code('');
        description('');
        environment('');
        companyCode('');
      }}
      dynamicStylingFields={['code', 'description', 'environment', 'status']}
      hideExcelSheet={['opration', '_id']}
      isHideForm={props.hideAddRole}
      setHideForm={props.setHideAddRole}
    />
  );
};

export default RoleList;
