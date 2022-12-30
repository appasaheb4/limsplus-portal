import React from 'react';
import dayjs from 'dayjs';
import {lookupItems, lookupValue} from '@/library/utils';
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
} from '@/library/components';
import {Confirm} from '@/library/models';
import {FormHelper} from '@/helper';
import {useForm, Controller} from 'react-hook-form';
import {
  AutoCompleteRegistrationLocation,
  AutoCompleteSalesTerritory,
  AutoCompleteFilterSingleSelectArea,
  AutoCompleteFilterSingleSelectCountry,
  AutoCompleteFilterSingleSelectDistrict,
  AutoCompleteFilterSingleSelectPostalCode,
  AutoCompleteFilterSingleSelectState,
  AutoCompleteFilterSingleSelectCity,
} from '../index';
// import { NumberFilter, DateFilter } from "@/library/components/Organisms"
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
let deliveryType;
let deliveryMethod;
let registrationLocation;
let lab;
let info;
let fyiLine;
let workLine;
let status;
let environment;
interface DoctorsListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
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
}

export const DoctorsList = (props: DoctorsListProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
    clearErrors,
  } = useForm();
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
                      props.onUpdateFileds({...item}, row._id);
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
            style: {textTransform: 'uppercase'},
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
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      placeholder={
                        errors.telephone
                          ? 'Please Enter Telephone'
                          : 'Telephone'
                      }
                      hasError={!!errors.telephone}
                      pattern={FormHelper.patterns.mobileNo}
                      defaultValue={row.telephone}
                      onChange={telephone => {
                        onChange(telephone);
                      }}
                      onBlur={telephone => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            telephone,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  )}
                  name='telephone'
                  rules={{
                    required: true,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=''
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
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      placeholder={
                        errors.mobileNo ? 'Please Enter MobileNo' : 'Mobile No'
                      }
                      hasError={!!errors.mobileNo}
                      pattern={FormHelper.patterns.mobileNo}
                      defaultValue={row.mobileNo}
                      onChange={mobileNo => {
                        onChange(mobileNo);
                      }}
                      onBlur={mobileNo => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            mobileNo,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  )}
                  name='mobileNo'
                  rules={{
                    required: true,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=''
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
          },

          {
            dataField: 'deliveryType',
            text: 'Delivery Type',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                deliveryType = filter;
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
                    const deliveryType = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        deliveryType,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(
                    props.extraData.lookupItems,
                    'DELIVERY_TYPE',
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
            dataField: 'deliveryMethod',
            text: 'Delivery Method',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                deliveryMethod = filter;
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
                    const deliveryMethod = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        deliveryMethod,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(
                    props.extraData.lookupItems,
                    'DELIVERY_METHOD',
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
                    console.log({item});
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
          deliveryType('');
          deliveryMethod('');
          openingTime('');
          registrationLocation('');
          lab('');
          closingTime('');
          info('');
          fyiLine('');
          workLine('');
          status('');
          environment('');
        }}
      />
    </div>
  );
};
