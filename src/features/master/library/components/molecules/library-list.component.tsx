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

export const LibraryList = (props: LibraryListProps) => {
  const [dateExpireModal, setDateExpiryModal] = useState<any>();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  const [modalDocxContent, setModalDocxContent] = useState<any>();

  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);

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
              dataField: 'code',
              text: 'Code',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'libraryCode',
              text: 'Library Code',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Library Code',
                getFilter: filter => {
                  libraryCode = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'description',
              text: 'Description',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Description',
                getFilter: filter => {
                  description = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'lab',
              text: 'Lab',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Lab',
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
              ) => (
                <>
                  <select
                    value={row.lab}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const lab = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem({ lab }, row._id);
                    }}
                  >
                    <option>Select</option>
                    {[{ code: 'Default' }]
                      .concat(props.extraData?.loginDetails?.labList)
                      ?.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item?.code}
                        </option>
                      ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'department',
              text: 'Department',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Department',
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
              ) => (
                <>
                  <DepartmentList
                    row={row}
                    onUpdate={department =>
                      props.onUpdateItem &&
                      props.onUpdateItem({ department }, row._id)
                    }
                  />
                </>
              ),
            },
            {
              dataField: 'details',
              text: 'Details',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Tooltip tooltipText='Expand library detail'>
                      <FaWordpressSimple
                        size={'30'}
                        onClick={() => {
                          setModalDocxContent({
                            visible: true,
                            details: row?.details,
                            isEditable: editorCell(row),
                            folder: 'library',
                            _id: row?._id,
                          });
                        }}
                      />
                    </Tooltip>
                  </>
                );
              },
            },
            {
              dataField: 'editable',
              text: 'Editable',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${row.editable ? (row.editable ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.editable}
                      onChange={editable => {
                        props.onUpdateItem &&
                          props.onUpdateItem({ editable }, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'position',
              text: 'Position',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Position',
                getFilter: filter => {
                  position = filter;
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
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const position = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem({ position }, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(props.extraData?.lookupItems, 'POSITION').map(
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
              dataField: 'groups',
              text: 'Groups',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Groups',
                getFilter: filter => {
                  groups = filter;
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
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const groups = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem({ groups }, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(props.extraData?.lookupItems, 'GROUPS').map(
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
              dataField: 'libraryType',
              text: 'Library Type',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Library Type',
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
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const libraryType = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem({ libraryType }, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(props.extraData?.lookupItems, 'LIBRARY_TYPE')
                      ?.filter(item => item.code?.match(row?.groups))
                      .map((item: any, index: number) => (
                        <option key={index} value={item.value}>
                          {lookupValue(item)}
                        </option>
                      ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'parameter',
              text: 'Parameter',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Parameter',
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
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const parameter = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem({ parameter }, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(props.extraData?.lookupItems, 'PARAMETER').map(
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
              dataField: 'dateExpire',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              text: 'Date Expiry',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row?.dateExpire
                  ? dayjs(row?.dateExpire || 0).format('DD-MM-YYYY HH:mm:ss')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateExpire = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.dateExpire
                      ? dayjs(row?.dateExpire || 0).format(
                          'DD-MM-YYYY HH:mm:ss',
                        )
                      : ''}
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
                  <ModalDateTime
                    {...{
                      visible: true,
                      use12Hours: false,
                      data: row.dateExpire,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    minDate={nextDay}
                    onUpdate={dateExpire => {
                      setDateExpiryModal({ visible: false });
                      props.onSingleDirectUpdateField &&
                        props.onSingleDirectUpdateField(
                          dateExpire,
                          column.dataField,
                          row._id,
                        );
                    }}
                    onClose={() => {
                      setDateExpiryModal({
                        visible: false,
                      });
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'versions',
              text: 'Versions',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  versions = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
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
        <ModalDocxContent
          {...modalDocxContent}
          onUpdate={details => {
            setModalDocxContent({ visible: false });
            props.onUpdateItem &&
              props.onUpdateItem({ details }, modalDocxContent._id);
          }}
          onClose={() => {
            setModalDocxContent({ visible: false });
          }}
        />
      </div>
    </>
  );
};
