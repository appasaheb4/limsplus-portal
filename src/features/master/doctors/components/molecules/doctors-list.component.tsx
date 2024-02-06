import React, { useState } from 'react';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  NumberFilter,
  DateFilter,
  Icons,
  Tooltip,
  textFilter,
  customFilter,
  TableBootstrap,
  Form,
  sortCaret,
  Toast,
  ModalDateTime,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { FormHelper } from '@/helper';
import { useForm } from 'react-hook-form';
import {
  AutoCompleteRegistrationLocation,
  AutoCompleteSalesTerritory,
  AutoCompleteFilterSingleSelectPostalCode,
} from '../index';
import { AutoCompleteFilterDeliveryMode } from '@/core-components';

let dateCreation;
let dateActive;
let dateExpire;
let version;
let enteredBy;
let doctorCode;
let doctorName;
let sex;
let title;
let sbu;
let reportName;
let category;
let city;
let state;
let country;
let doctorType;
let speciality;
let salesTerritoRy;
let district;
let postalCode;
let openingTime;
let closingTime;
let area;
let zone;
let telephone;
let mobileNo;
let email;
let reportPriority;
let registrationLocation;
let lab;
let info;
let fyiLine;
let workLine;
let status;
let environment;
let companyCode;

interface DoctorsListProps {
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
  onUpdateFileds?: (fileds: any, id: string) => void;
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

export const DoctorsList = (props: DoctorsListProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const [modalDetails, setModalDetails] = useState<any>();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);

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
            dataField: 'title',
            text: 'Title',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                title = filter;
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
                    const title = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(title, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'TITLE').map(
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
            dataField: 'doctorCode',
            text: 'Doctor Code',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                doctorCode = filter;
              },
            }),
            editorStyle: { textTransform: 'uppercase' },
            style: { textTransform: 'uppercase' },
            editable: false,
          },
          {
            dataField: 'doctorName',
            text: 'Doctor Name',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                doctorName = filter;
              },
            }),
            editorStyle: { textTransform: 'uppercase' },
            style: { textTransform: 'uppercase' },
            editable: false,
          },
          {
            dataField: 'reportName',
            text: 'Report Name',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                reportName = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'sex',
            text: 'Sex',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                sex = filter;
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
                    const sex = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(sex, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {['Male', 'Female'].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {`${item}`}
                    </option>
                  ))}
                </select>
              </>
            ),
          },

          {
            dataField: 'doctorType',
            text: 'Doctor Type',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                doctorType = filter;
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
                  value={row.doctorType}
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                  }
                  onChange={e => {
                    const doctorType = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(doctorType, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'DOCTOR_TYPE').map(
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
            dataField: 'speciality',
            text: 'Speciality',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                speciality = filter;
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
                    const speciality = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(speciality, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'SPECIALITY').map(
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
            dataField: 'category',
            text: 'Category',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                category = filter;
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
                  value={row.category}
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                  }
                  onChange={e => {
                    const category = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(category, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'CATEGORY').map(
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
            dataField: 'postalCode',
            text: 'Postal Code',
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
                postalCode = filter;
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
                <AutoCompleteFilterSingleSelectPostalCode
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds({ ...item }, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'country',
            text: 'Country',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            filter: textFilter({
              getFilter: filter => {
                country = filter;
              },
            }),
            headerClasses: 'textHeader4',
            style: { textTransform: 'uppercase' },
          },
          {
            dataField: 'state',
            text: 'State',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                state = filter;
              },
            }),
          },
          {
            dataField: 'district',
            text: 'District',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                district = filter;
              },
            }),
            headerClasses: 'textHeader4',
          },
          {
            dataField: 'city',
            text: 'City',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                city = filter;
              },
            }),
          },
          {
            dataField: 'area',
            text: 'Area',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                area = filter;
              },
            }),
          },

          {
            dataField: 'sbu',
            text: 'SBU',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                sbu = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'zone',
            text: 'Zone',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                zone = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'salesTerritoRy',
            text: 'Sales Territory',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                salesTerritoRy = filter;
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
                <AutoCompleteSalesTerritory
                  onSelect={item => {
                    props.onUpdateItem &&
                      props.onUpdateItem(item, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },

          {
            dataField: 'telephone',
            text: 'Telephone',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                telephone = filter;
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
                  placeholder={row.telephone}
                  defaultValue={row.telephone}
                  type='number'
                  onBlur={telephone => {
                    if (telephone === '') {
                      // Handle the case when the input is empty
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          telephone,
                          column.dataField,
                          row._id,
                        );
                    } else if (
                      FormHelper.isMobileNoValid(String(telephone)) &&
                      telephone?.length === 10
                    ) {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          telephone,
                          column.dataField,
                          row._id,
                        );
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
            dataField: 'mobileNo',
            text: 'Mobile No',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
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
            dataField: 'email',
            text: 'Email',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                email = filter;
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
                  defaultValue={row.email}
                  onBlur={email => {
                    if (email === '') {
                      // Handle the case when the input is empty
                      props.onUpdateItem &&
                        props.onUpdateItem(email, column.dataField, row._id);
                    } else if (FormHelper.isEmailValid(email)) {
                      props.onUpdateItem &&
                        props.onUpdateItem(email, column.dataField, row._id);
                    } else {
                      Toast.error({
                        message: 'Please enter a valid email address.',
                      });
                    }
                  }}
                />
              </>
            ),
          },

          {
            dataField: 'reportPriority',
            text: 'Report Priority',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                reportPriority = filter;
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
                    const reportPriority = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        reportPriority,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(
                    props.extraData.lookupItems,
                    'REPORT_PRIORITY',
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
            dataField: 'deliveryMode',
            text: 'Delivery Mode',
            headerClasses: 'textHeader5',
            sort: true,
            csvFormatter: col => (col ? col : ''),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return (
                <div className='flex flex-row flex-wrap gap-2'>
                  {typeof row.deliveryMode != 'string' &&
                    row.deliveryMode?.map(item => (
                      <span className='bg-blue-800 rounded-md p-2 text-white'>
                        {item.value}
                      </span>
                    ))}
                </div>
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
                <AutoCompleteFilterDeliveryMode
                  selectedItems={
                    Array.isArray(row?.deliveryMode) ? row?.deliveryMode : []
                  }
                  onSelect={deliveryMode => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        deliveryMode,
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },

          {
            dataField: 'registrationLocation',
            text: 'Registration Location',
            headerClasses: 'textHeader6',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                registrationLocation = filter;
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
                <AutoCompleteRegistrationLocation
                  onSelect={item => {
                    if (item !== 'RemoveItem') {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, column.dataField, row._id);
                    } else {
                      props.onUpdateItem &&
                        props.onUpdateItem('', column.dataField, row._id);
                    }
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'lab',
            text: 'Lab',
            headerClasses: 'textHeader',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                lab = filter;
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
                  value={row?.lab}
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                  }
                  onChange={e => {
                    const lab = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(lab, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {props.extraData?.labList?.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.code} - ${item.name}`}
                    </option>
                  ))}
                </select>
              </>
            ),
          },
          {
            dataField: 'openingTime',
            text: 'Opening Time',
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
                openingTime = filter;
              },
            }),
          },

          {
            dataField: 'closingTime',
            text: 'Closing Time',
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
                closingTime = filter;
              },
            }),
          },
          {
            dataField: 'info',
            text: 'Info',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                info = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'fyiLine',
            text: 'FYI Line',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                fyiLine = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'workLine',
            text: 'Work Line',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                workLine = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'confidential',
            text: 'Confidential',
            sort: true,
            csvFormatter: (col, row) =>
              `${row.confidential ? (row.confidential ? 'Yes' : 'No') : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {' '}
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.confidential}
                    onChange={confidential => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          confidential,
                          'confidential',
                          row._id,
                        );
                    }}
                  />{' '}
                </>
              );
            },
          },
          {
            dataField: 'urgent',
            text: 'Urgent',
            sort: true,
            csvFormatter: (col, row) =>
              `${row.urgent ? (row.urgent ? 'Yes' : 'No') : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.urgent}
                    onChange={urgent => {
                      props.onUpdateItem &&
                        props.onUpdateItem(urgent, 'urgent', row._id);
                    }}
                  />{' '}
                </>
              );
            },
          },
          {
            dataField: 'reportFormat',
            text: 'Report Format',
            sort: true,
            csvFormatter: (col, row) =>
              `${row.urgent ? (row.urgent ? 'Yes' : 'No') : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.reportFormat}
                    onChange={reportFormat => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          reportFormat,
                          'reportFormat',
                          row._id,
                        );
                    }}
                  />{' '}
                </>
              );
            },
          },
          {
            dataField: 'specificFormat',
            text: 'Specific Format',
            sort: true,
            csvFormatter: (col, row) =>
              `${
                row.specificFormat ? (row.specificFormat ? 'Yes' : 'No') : 'No'
              }`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.specificFormat}
                    onChange={specificFormat => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          specificFormat,
                          'specificFormat',
                          row._id,
                        );
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'dateCreation',
            text: 'Date Creation',
            headerClasses: 'textHeader11',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateCreation
                ? dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')
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
              return (
                <>{dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')}</>
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
            headerClasses: 'textHeader11',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateActive
                ? dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')
                : '',
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
              return <>{dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')}</>;
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
            text: 'Date Expiry',
            headerClasses: 'textHeader11',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateExpire
                ? dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')
                : '',
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            filter: customFilter({
              getFilter: filter => {
                dateExpire = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')}</>;
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
                    setModalDetails({ visible: false });
                    props.onSingleDirectUpdateField &&
                      props.onSingleDirectUpdateField(
                        dateExpire,
                        column.dataField,
                        row._id,
                      );
                  }}
                  onClose={() => {
                    setModalDetails({
                      visible: false,
                    });
                  }}
                />
              </>
            ),
          },
          // {
          //   dataField: 'version',
          //   text: 'Version',
          //   headerClasses: 'textHeader4',
          //   sort: true,
          //   headerStyle: {
          //     fontSize: 0,
          //   },
          //   sortCaret: (order, column) => sortCaret(order, column),
          //   csvFormatter: col => (col ? col : ''),
          //   editable: false,
          //   filter: customFilter({
          //     getFilter: filter => {
          //       version = filter;
          //     },
          //   }),
          //   filterRenderer: (onFilter, column) => (
          //     <NumberFilter onFilter={onFilter} column={column} />
          //   ),
          // },
          {
            dataField: 'enteredBy',
            text: 'Entered By',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                enteredBy = filter;
              },
            }),
            editable: false,
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
        isEditModify={props.isUpdate}
        isExport={props.isExport}
        isSelectRow={true}
        fileName='Doctors'
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
          enteredBy('');
          doctorCode('');
          doctorName('');
          sex('');
          sbu('');
          title('');
          reportName('');
          postalCode('');
          district('');
          city('');
          state('');
          country('');
          doctorType('');
          speciality('');
          salesTerritoRy('');
          area('');
          zone('');
          telephone('');
          mobileNo('');
          email('');
          category('');
          reportPriority('');
          openingTime('');
          registrationLocation('');
          lab('');
          closingTime('');
          info('');
          fyiLine('');
          workLine('');
          status('');
          companyCode('');
          environment('');
        }}
        dynamicStylingFields={[
          'doctorCode',
          'doctorName',
          'status',
          'environment',
        ]}
        hideExcelSheet={['_id', 'opration']}
      />
    </div>
  );
};
