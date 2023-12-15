import React from 'react';
import { observer } from 'mobx-react';
import {
  TableBootstrap,
  Icons,
  Buttons,
  textFilter,
  sortCaret,
  Tooltip,
} from '@/library/components';
import { Confirm } from '@/library/models';
//import {stores} from '@/stores';
import { dashboardRouter as dashboardRoutes } from '@/routes';
let router: any = dashboardRoutes;

let role;
let companyCode;
let environment;

interface RoleMappingListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedUser: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onDuplicate?: (selectedItem: any) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const RoleMappingList = observer((props: RoleMappingListProps) => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <TableBootstrap
          id='_id'
          data={props?.data || []}
          totalSize={props?.totalSize}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'role',
              text: 'Role',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (row, col) => `${col.role?.description}`,
              filter: textFilter({
                getFilter: filter => {
                  role = filter;
                },
              }),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <div>
                    <h6>{`${row.role?.description}`} </h6>
                  </div>
                );
              },
            },

            {
              dataField: 'router',
              text: 'Role Permission',
              editable: false,
              headerClasses: 'textHeader4',
              sort: true,
              formatter: (cellContent, row) => (
                <>
                  {row?.router?.length > 0 && (
                    <ul className='nav nav-stacked' id='accordion1'>
                      {row?.router?.map((item, index) => (
                        <li
                          className='flex flex-col mb-2 ml-2 bg-gray-400 p-2 rounded-md'
                          key={index}
                        >
                          <a
                            data-toggle='collapse'
                            data-parent='#accordion1'
                            className='font-bold'
                          >
                            {item?.title}
                          </a>
                          {item?.children ? (
                            <ul
                              className='flex flex-row ml-1 text-white ' //collapse
                              id={item?.name}
                            >
                              {item.children.map((children, indexChildren) => (
                                <li className='bg-blue-600 ml-4 p-2 rounded-md'>
                                  {children?.title}
                                  <ul className='ml-2'>
                                    {children?.permission.map(
                                      (permission, indexPermission) => (
                                        <li>
                                          <input
                                            type='checkbox'
                                            checked={permission?.checked}
                                            className='m-2'
                                          />
                                          {permission?.title}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <li>{item?.title}</li>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
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
                getFilter: filter => {
                  environment = filter;
                },
              }),
            },
            {
              dataField: 'opration',
              text: 'Delete',
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <Tooltip tooltipText='Edit'>
                    <Buttons.Button
                      key={row?._id}
                      size='small'
                      type='outline'
                      onClick={() => {
                        const roleRouter =
                          row?.router?.length > 0 ? row?.router : [];
                        router = router?.filter((routerItem, indexRouter) => {
                          if (routerItem.name !== 'Dashboard') {
                            return roleRouter?.filter((item, index) => {
                              if (routerItem.name === item.name) {
                                return routerItem.children.filter(
                                  (childrenItem, indexChildren) => {
                                    const itemChildren = item.children;
                                    for (const children of itemChildren) {
                                      if (childrenItem.name == children.name) {
                                        router[indexRouter].children[
                                          indexChildren
                                        ] = children;
                                        router[indexRouter].title = item.title;
                                      }
                                    }
                                  },
                                );
                              } else {
                                return routerItem;
                              }
                            });
                          }
                        });
                        //stores.routerStore.updateRouter(router);
                        props.onDuplicate &&
                          props.onDuplicate({
                            router,
                            id: row._id,
                            description: row.role.description,
                            code: row.role.code,
                          });
                      }}
                    >
                      <Icons.EvaIcon
                        icon='edit-outline'
                        size='medium'
                        color='#fff'
                      />
                    </Buttons.Button>
                  </Tooltip>

                  {props?.isDelete && (
                    <>
                      <br />
                      <Tooltip tooltipText='Delete'>
                        <Buttons.Button
                          size='small'
                          type='outline'
                          onClick={() => {
                            props.onDelete &&
                              props.onDelete({
                                type: 'Delete',
                                show: true,
                                id: [row._id],
                                title: 'Are you sure?',
                                body: 'Delete this role mapping!',
                              });
                          }}
                        >
                          <Icons.EvaIcon
                            icon='trash-2-outline'
                            size='medium'
                            color='#fff'
                          />
                        </Buttons.Button>
                      </Tooltip>
                    </>
                  )}
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
          fileName='Role Mapping'
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
            role('');
            companyCode('');
            environment('');
          }}
          dynamicStylingFields={['role']}
          hideExcelSheet={['_id', 'opration']}
        />
      </div>
    </>
  );
});
