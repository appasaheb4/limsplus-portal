import React from 'react';
import dayjs from 'dayjs';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  TableBootstrap,
  textFilter,
  Icons,
  Tooltip,
  NumberFilter,
  DateFilter,
  customFilter,
  Form,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {
  AutoCompleteFilterSingleSelectSalesTerrority,
  SalesHierarchyTableForSalesTeam,
  TargetTableForSalesTeam,
} from '../../index';

let dateCreation;
let dateActive;
let dateExpire;
let version;
let salesHierarchy;
let salesTerritory;
let target;
let description;
let empCode;
let empName;
let status;
let environment;

interface SalesTeamListProps {
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
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
}

export const SalesTeamList = (props: SalesTeamListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
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
          // {
          //   dataField: 'salesHierarchy',
          //   text: 'Sales Hierarchy',
          //   headerClasses: 'textHeader5',
          //   sort: true,
          //   csvFormatter: col => (col ? col : ''),
          //   filter: textFilter({
          //     getFilter: filter => {
          //       salesHierarchy = filter;
          //     },
          //   }),
          //   editorRenderer: (
          //     editorProps,
          //     value,
          //     row,
          //     column,
          //     rowIndex,
          //     columnIndex,
          //   ) => (
          //     <>
          //       <select
          //         className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
          //         onChange={e => {
          //           const salesHierarchy = e.target.value;
          //           props.onUpdateItem &&
          //             props.onUpdateItem(
          //               salesHierarchy,
          //               column.dataField,
          //               row._id,
          //             );
          //         }}
          //       >
          //         <option selected>Select </option>
          //         {lookupItems(
          //           props.extraData.lookupItems,
          //           'SALES_HIERARCHY',
          //         ).map((item: any, index: number) => (
          //           <option key={index} value={item.code}>
          //             {lookupValue(item)}
          //           </option>
          //         ))}
          //       </select>
          //     </>
          //   ),
          // },
          {
            dataField: 'salesTerritory',
            text: 'Sales Territory',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                salesTerritory = filter;
              },
            }),
            // formatter: (cell, row) => {
            //   return <>{(row.salesTerritory && row.salesTerritory.area) || ""}</>
            // },
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <AutoCompleteFilterSingleSelectSalesTerrority
                  onSelect={item => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        item.country,
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'description',
            text: 'Description',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                description = filter;
              },
            }),
          },
          {
            dataField: 'empCode',
            text: 'Employee Code',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                empCode = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'empName',
            text: 'Employee Name',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                empName = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'salesHierarchy',
            text: 'Sales Hierarchy',
            headerClasses: 'textHeader6 z-10',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              `Employee: ${row?.salesHierarchy
                ?.map?.(item => item.empCode)
                .join(' , ')} Desgination : ${row?.salesHierarchy
                ?.map?.(item => item.designation)
                .join(' , ')} Level: ${row?.salesHierarchy
                ?.map?.(item => item.level)
                .join(' , ')}`,
            filter: textFilter({
              getFilter: filter => {
                salesHierarchy = filter;
              },
            }),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {row?.salesHierarchy ? (
                    <SalesHierarchyTableForSalesTeam
                      data={row?.salesHierarchy}
                      onUpdate={data => {
                        props.onUpdateItem &&
                          props.onUpdateItem(data, 'salesHierarchy', row._id);
                      }}
                    />
                  ) : null}
                </>
              );
            },
          },
          {
            dataField: 'targets',
            text: 'Target',
            headerClasses: 'textHeader5 z-10',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              `FyYear : ${row?.targets
                ?.map(item => item.fyYear)
                .join(' , ')} Month : ${row?.targets
                ?.map(item => item.month)
                .join(' , ')}`,
            filter: textFilter({
              getFilter: filter => {
                target = filter;
              },
            }),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {row?.targets ? (
                    <TargetTableForSalesTeam
                      data={row?.targets}
                      onUpdate={data => {
                        props.onUpdateItem &&
                          props.onUpdateItem(data, 'targets', row._id);
                      }}
                    />
                  ) : null}
                </>
              );
            },
          },
          {
            dataField: 'dateCreation',
            text: 'Date Creation',
            headerClasses: 'textHeader6',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateCreation
                ? dayjs(row.dateCreation).format('YYYY-MM-DD')
                : '',
            editable: false,
            filter: customFilter({
              getFilter: filter => {
                dateCreation = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateCreation).format('YYYY-MM-DD')}</>;
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
                <Form.InputDateTime
                  value={new Date(row.dateCreation)}
                  onFocusRemove={dateCreation => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        dateCreation,
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'dateActive',
            text: 'Date Active',
            headerClasses: 'textHeader6',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateActive ? dayjs(row.dateActive).format('YYYY-MM-DD') : '',
            editable: false,
            filter: customFilter({
              getFilter: filter => {
                dateActive = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateActive).format('YYYY-MM-DD')}</>;
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
                <Form.InputDateTime
                  value={new Date(row.dateActive)}
                  onFocusRemove={dateActive => {
                    props.onUpdateItem &&
                      props.onUpdateItem(dateActive, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'dateExpire',
            text: 'Date Expire',
            headerClasses: 'textHeader6',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateExpire ? dayjs(row.dateExpire).format('YYYY-MM-DD') : '',
            editable: false,
            filter: customFilter({
              getFilter: filter => {
                dateExpire = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateExpire).format('YYYY-MM-DD')}</>;
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
                <Form.InputDateTime
                  value={new Date(row.dateExpire)}
                  onFocusRemove={dateExpire => {
                    props.onUpdateItem &&
                      props.onUpdateItem(dateExpire, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'version',
            text: 'Version',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editable: false,
            filter: customFilter({
              getFilter: filter => {
                version = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
          },
          {
            dataField: 'status',
            text: 'Status',
            headerClasses: 'textHeader1',
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
            filter: textFilter({
              getFilter: filter => {
                environment = filter;
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
                  {row.status !== 'I' && (
                    <>
                      <Tooltip className='ml-2' tooltipText='Version Upgrade'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() =>
                            props.onVersionUpgrade &&
                            props.onVersionUpgrade(row)
                          }
                        >
                          {Icons.getIconTag(Icons.Iconvsc.VscVersions)}
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip className='ml-2' tooltipText='Duplicate'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() =>
                            props.onDuplicate && props.onDuplicate(row)
                          }
                        >
                          {Icons.getIconTag(Icons.Iconio5.IoDuplicateOutline)}
                        </Icons.IconContext>
                      </Tooltip>
                    </>
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
        fileName='SalesTeam'
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
          dateCreation();
          dateActive();
          dateExpire();
          version('');
          salesHierarchy('');
          salesTerritory('');
          description('');
          empCode('');
          target('');
          empName('');
          status('');
          environment('');
        }}
      />
    </div>
  );
};
