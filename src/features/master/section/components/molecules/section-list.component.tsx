import React from 'react';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  textFilter,
  Icons,
  Tooltip,
  Form,
  sortCaret,
  Toast,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { AutoCompleteFilterSingleSelectDepartment } from '../index';
import { useForm } from 'react-hook-form';
import { FormHelper } from '@/helper';
import { AutoCompleteCompanyList } from '@/core-components';
let departmentCode;
let code;
let name;
let shortName;
let sectionInCharge;
let mobileNo;
let contactNo;
let fyiLine;
let workLine;
let status;
let environment;
let companyCode;

interface SectionListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
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
}

export const SectionList = (props: SectionListProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
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
            dataField: 'departmentCode',
            text: 'Department Code',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Department Code',
              getFilter: filter => {
                departmentCode = filter;
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
                <AutoCompleteFilterSingleSelectDepartment
                  onSelect={item => {
                    props.onUpdateItem &&
                      props.onUpdateItem(item.code, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'code',
            text: 'Code',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
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
            dataField: 'name',
            text: 'Name',
            headerClasses: 'textHeader',
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
              <span title={row.name}>{cellContent}</span>
            ),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Name',
              getFilter: filter => {
                name = filter;
              },
            }),
            editorStyle: { textTransform: 'uppercase' },
            editable: false,
          },
          {
            dataField: 'shortName',
            text: 'Short Name',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Short Name',
              getFilter: filter => {
                shortName = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            style: { textTransform: 'uppercase' },
            editorStyle: { textTransform: 'uppercase' },
          },
          {
            dataField: 'sectionInCharge',
            text: 'Section In Charge',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Section In Charge',
              getFilter: filter => {
                sectionInCharge = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'mobileNo',
            text: 'Mobie No',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Mobile No',
              getFilter: filter => {
                mobileNo = filter;
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
                <Form.Input
                  placeholder={row.mobileNo}
                  defaultValue={row.mobileNo}
                  type='number'
                  onBlur={mobileNo => {
                    if (mobileNo === '') {
                      // Handle the case when the input is empty
                      props.onUpdateItem &&
                        props.onUpdateItem(mobileNo, column.dataField, row._id);
                    } else if (
                      FormHelper.isMobileNoValid(String(mobileNo)) &&
                      mobileNo?.length === 10
                    ) {
                      props.onUpdateItem &&
                        props.onUpdateItem(mobileNo, column.dataField, row._id);
                    } else {
                      Toast.error({
                        message: 'Please Enter a Valid 10-Digit Mobile Number',
                      });
                    }
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'contactNo',
            text: 'Contact No',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Contact No',
              getFilter: filter => {
                contactNo = filter;
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
                <Form.Input
                  placeholder={row.contactNo}
                  defaultValue={row.contactNo}
                  type='number'
                  onBlur={contactNo => {
                    if (contactNo === '') {
                      // Handle the case when the input is empty
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          contactNo,
                          column.dataField,
                          row._id,
                        );
                    } else if (
                      FormHelper.isMobileNoValid(String(contactNo)) &&
                      contactNo?.length === 10
                    ) {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          contactNo,
                          column.dataField,
                          row._id,
                        );
                    } else {
                      Toast.error({
                        message: 'Please Enter a Valid 10-Digit Contact Number',
                      });
                    }
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'fyiLine',
            text: 'Fyi Line',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Fyi Line',
              getFilter: filter => {
                fyiLine = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'workLine',
            text: 'Work Line',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Work Line',
              getFilter: filter => {
                workLine = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                      props.onUpdateItem(status, column.dataField, row._id);
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
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editable: false,
            filter: textFilter({
              placeholder: 'Environment',
              getFilter: filter => {
                environment = filter;
              },
            }),
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
            //           props.onUpdateItem(
            //             environment,
            //             column.dataField,
            //             row._id,
            //           );
            //       }}
            //     >
            //      <option>Select</option>
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
            dataField: 'operation',
            text: 'Action',
            editable: false,
            csvExport: false,
            // hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row'>
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
        fileName='Section'
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
          departmentCode('');
          code('');
          name('');
          shortName('');
          sectionInCharge('');
          mobileNo('');
          contactNo('');
          fyiLine('');
          workLine('');
          status('');
          environment('');
          companyCode('');
        }}
        dynamicStylingFields={[
          'departmentCode',
          'code',
          'name',
          'status',
          'environment',
        ]}
        hideExcelSheet={['_id', 'opration']}
      />
    </div>
  );
};
