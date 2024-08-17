import React, { useState } from 'react';
import {
  Tooltip,
  Icons,
  textFilter,
  sortCaret,
  Form,
  TableBootstrap,
  DateRangeFilter,
  customFilter,
  NumberFilter,
  DepartmentList,
  ModalDateTime,
} from '@/library/components';
import { Confirm } from '@/library/models';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import { ModalDocxContent } from '@/core-components';
import { FaWordpressSimple } from 'react-icons/fa';

let code;
let description;
let libraryCode;
let lab;
let department;
let position;
let groups;
let libraryType;
let parameter;
let editable;
let details;
let status;
let enteredBy;
let dateCreation;
let dateActive;
let dateExpire;
let versions;
let companyCode;
let environment;

interface LibraryListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isVersionUpgrade?: boolean;
  isDuplicate?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (fields: any, id: string) => void;
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (record: any) => void;
  onSingleDirectUpdateField?: (
    value: any,
    dataField: string,
    id: string,
  ) => void;
}

export const TatMasterList = (props: LibraryListProps) => {
  const [dateExpireModal, setDateExpiryModal] = useState<any>();
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
              dataField: 'sNo',
              text: 'SNo',
              headerClasses: 'textHeaders',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              headerClasses: 'textHeader',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'PLab',
                getFilter: filter => {
                  lab = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => <></>,
            },
            {
              dataField: 'rLab',
              text: 'RLab',
              headerClasses: 'textHeader',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'RLab',
                getFilter: filter => {
                  department = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => <></>,
            },
            {
              dataField: 'registrationLocation',
              text: 'Registration Location',
              headerClasses: 'textHeader',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Registration Location',
                getFilter: filter => {
                  libraryCode = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'tatStartTime',
              text: 'Tat Start Time',
              headerClasses: 'textHeader',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Tat Start Time',
                getFilter: filter => {
                  description = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },

            {
              dataField: 'tat',
              text: 'Tat',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Tat',
                getFilter: filter => {
                  libraryType = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => <></>,
            },
            {
              dataField: 'tatValue',
              text: 'Tat Value',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Tat Value',
                getFilter: filter => {
                  parameter = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => <></>,
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
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const status = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem({ status }, row._id);
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
              headerClasses: 'textHeader1',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'dateCreation',
              editable: false,
              text: 'Date Creation',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row?.dateCreation
                  ? dayjs(row?.dateCreation || 0).format('DD-MM-YYYY HH:mm:ss')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateCreation = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.dateCreation
                      ? dayjs(row?.dateCreation || 0).format(
                          'DD-MM-YYYY HH:mm:ss',
                        )
                      : ''}
                  </>
                );
              },
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              editable: false,
              csvFormatter: col => (col ? col : ''),
              headerClasses: 'textHeader2',
            },
            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
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
                    {row.status === 'A' && (
                      <>
                        {props.isVersionUpgrade && (
                          <Tooltip tooltipText='Version Upgrade'>
                            <Icons.IconContext
                              color='#ffffff'
                              size='20'
                              onClick={() =>
                                props.onVersionUpgrade &&
                                props.onVersionUpgrade(row)
                              }
                            >
                              {Icons.getIconTag(Icons.Iconvsc.VscVersions)}
                            </Icons.IconContext>
                          </Tooltip>
                        )}
                        {props.isDuplicate && (
                          <Tooltip tooltipText='Duplicate'>
                            <Icons.IconContext
                              color='#ffffff'
                              size='20'
                              onClick={() =>
                                props.onDuplicate && props.onDuplicate(row)
                              }
                            >
                              {Icons.getIconTag(
                                Icons.Iconio5.IoDuplicateOutline,
                              )}
                            </Icons.IconContext>
                          </Tooltip>
                        )}
                      </>
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
          fileName='Library'
          onSelectedRow={rows => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id));
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem &&
              props.onUpdateItem({ [dataField]: value }, id);
          }}
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size);
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size);
          }}
          clearAllFilter={() => {
            code('');
            libraryCode('');
            description('');
            lab('');
            department('');
            position('');
            groups('');
            libraryType('');
            parameter('');
            status('');
            enteredBy('');
            versions('');
            environment('');
            companyCode('');
          }}
          hideExcelSheet={['_id', 'opration']}
          dynamicStylingFields={[
            'libraryCode',
            'lab',
            'department',
            'position',
            'status',
            'environment',
          ]}
        />
      </div>
    </>
  );
};
