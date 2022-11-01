import React from 'react';
import {
  textFilter,
  TableBootstrap,
  Icons,
  Tooltip,
  Form,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {Confirm} from '@/library/models';
import {
  AutoCompleteUsers,
  AutoCompleteLabs,
  AutoCompleteDepartment,
  AutoCompleteFilterSingleSelectVariable,
} from '../index';
let lab;
let user;
let department;
let variable;
let value;
let description;
let environment;
interface SessionManagementListProps {
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

export const EnvironmentSettingsList = (props: SessionManagementListProps) => {
  // const userList = React.useMemo(()=> ,[])

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
              dataField: 'variable',
              text: 'Variable',
              sort: true,
              filter: textFilter({
                getFilter: filter => {
                  variable = filter;
                },
              }),
              headerClasses: 'textHeader3',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectVariable
                    selected={row}
                    onUpdate={items => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          items.variable.environmentVariable,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'lab',
              text: 'Labs',
              sort: true,
              editable: false,
              csvFormatter: (cell, row, rowIndex) =>
                `${row.lab.map(item => item.name).join(' , ')}`,
              filter: textFilter({
                getFilter: filter => {
                  lab = filter;
                },
              }),
              headerClasses: 'textHeader4',
              formatter: (cellContent, row) => (
                <>
                  {row?.allLabs ? (
                    '*'
                  ) : (
                    <ul style={{listStyle: 'inside'}}>
                      {row?.lab.map((item, index) => (
                        <li key={index}>{item.name}</li>
                      ))}
                    </ul>
                  )}
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
                  <AutoCompleteLabs
                    selected={row}
                    onUpdate={items => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          items?.allLabs ? items?.allLabs : items?.lab,
                          items?.allLabs ? 'allLabs' : 'lab',
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'user',
              text: 'Users',
              sort: true,
              separator: '| ',
              editable: false,
              // csvFormatter: (cell, row, rowIndex) => `${row.user.map((item,index)=>{
              // return ' '+item.fullName+' ';
              // })}`,
              csvFormatter: (cell, row, rowIndex) =>
                `${row.user.map(item => item.fullName).join(' , ')}`,
              filter: textFilter({
                getFilter: filter => {
                  user = filter;
                },
              }),
              headerClasses: 'textHeader4',
              formatter: (cellContent, row) => (
                <>
                  {row?.allUsers ? (
                    '*'
                  ) : (
                    <ul style={{listStyle: 'inside'}}>
                      {row?.user.map((item, index) => (
                        <li key={index}>{item.fullName}</li>
                      ))}
                    </ul>
                  )}
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
                  <AutoCompleteUsers
                    selected={row}
                    onUpdate={items => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          items?.allUsers ? items?.allUsers : items?.user,
                          items?.allUsers ? 'allUsers' : 'user',
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'department',
              text: 'Departments',
              sort: true,
              editable: false,
              headerClasses: 'textHeader4',
              filter: textFilter({
                getFilter: filter => {
                  department = filter;
                },
              }),
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.department &&
                  row.department.map(item => item.name).join(' , ')
                }`,
              formatter: (cellContent, row) => (
                <>
                  {row?.allDepartment ? (
                    '*'
                  ) : (
                    <ul style={{listStyle: 'inside'}}>
                      {row.department &&
                        row?.department.map((item, index) => (
                          <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                  )}
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
                  <AutoCompleteDepartment
                    selected={row}
                    onUpdate={items => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          items?.allDepartment
                            ? items?.allDepartment
                            : items?.department,
                          items?.allDepartment ? 'allDepartment' : 'department',
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'value',
              text: 'Value',
              sort: true,
              filter: textFilter({
                getFilter: filter => {
                  value = filter;
                },
              }),
              headerClasses: 'textHeader3',
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
                    placeholder={row.value}
                    style={{textTransform: 'uppercase'}}
                    onBlur={value => {
                      if (row.value !== value) {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            value.toUpperCase(),
                            column.dataField,
                            row._id,
                          );
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'description',
              text: 'Description',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  description = filter;
                },
              }),
              headerClasses: 'textHeader3',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.MultilineInput
                    rows={5}
                    name='description'
                    placeholder='Description'
                    onBlur={description => {
                      if (row.description !== description && description) {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            description,
                            column.dataField,
                            row._id,
                          );
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader3',
              csvFormatter: col => (col ? col : ''),
              sort: true,
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
                      'ENVIRONMENT SETTING - ENVIRONMENT',
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
          fileName='EnvironmentSettings'
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
            lab('');
            user('');
            department('');
            variable('');
            value('');
            description('');
            environment('');
          }}
        />
      </div>
    </>
  );
};

// export default React.memo(EnvironmentSettingsList)
