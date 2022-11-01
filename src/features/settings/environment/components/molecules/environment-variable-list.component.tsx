import React from 'react';
import {observer} from 'mobx-react';
import {
  TableBootstrap,
  Icons,
  Form,
  Tooltip,
  textFilter,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {lookupItems, lookupValue} from '@/library/utils';

let environmentVariable;
let category;
let description;
let enteredBy;

interface EnvironmentVariableProps {
  data: any;
  extraData: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
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
}
export const EnvironmentVariableList = observer(
  (props: EnvironmentVariableProps) => {
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
                dataField: 'environmentVariable',
                text: 'Environment Variable',
                headerClasses: 'textHeader5',
                sort: true,
                editable: (content, row, rowIndex, columnIndex) => row.isModify,
                csvFormatter: col => (col ? col : ''),
                filter: textFilter({
                  getFilter: filter => {
                    environmentVariable = filter;
                  },
                }),
              },
              {
                dataField: 'category',
                text: 'Category',
                headerClasses: 'textHeader3',
                sort: true,
                editable: (content, row, rowIndex, columnIndex) => row.isModify,
                csvFormatter: col => (col ? col : ''),
                filter: textFilter({
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
                      <option selected>Select</option>
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
                dataField: 'description',
                text: 'Description',
                headerClasses: 'textHeader3',
                editable: (content, row, rowIndex, columnIndex) => row.isModify,
                filter: textFilter({
                  getFilter: filter => {
                    description = filter;
                  },
                }),
                sort: true,
                csvFormatter: col => (col ? col : ''),
              },
              {
                dataField: 'enteredBy',
                text: 'Entered By',
                headerClasses: 'textHeader3',
                editable: false,
                filter: textFilter({
                  getFilter: filter => {
                    enteredBy = filter;
                  },
                }),
                sort: true,
                csvFormatter: col => (col ? col : ''),
              },
              {
                dataField: 'permission',
                text: 'Permission',
                headerClasses: 'textHeader3',
                editable: false,
                csvFormatter: col => (col ? col : false),
                sort: true,
                formatter: (cell, row) => {
                  return (
                    <>
                      <div className='flex flex-row gap-2'>
                        <Form.Toggle
                          disabled={!row.isModify}
                          value={row?.allLabs || false}
                          onChange={allLabs => {
                            props.onUpdateItem &&
                              props.onUpdateItem(allLabs, 'allLabs', row._id);
                          }}
                        />
                        <Form.Toggle
                          disabled={!row.isModify}
                          value={row?.allUsers || false}
                          onChange={allUsers => {
                            props.onUpdateItem &&
                              props.onUpdateItem(allUsers, 'allUsers', row._id);
                          }}
                        />
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
                      </div>
                    </>
                  );
                },
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
                              type: 'delete',
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
              description('');
              enteredBy('');
            }}
          />
        </div>
      </>
    );
  },
);
