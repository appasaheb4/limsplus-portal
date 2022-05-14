/* eslint-disable */
import React from 'react';
import {
  NumberFilter,
  DateFilter,
  TableBootstrap,
  textFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  AutoCompleteFilterSingleSelectArea,
  AutoCompleteFilterSingleSelectCity,
  AutoCompleteFilterSingleSelectCountry,
  AutoCompleteFilterSingleSelectDistrict,
  AutoCompleteFilterSingleSelectState,
  AutoCompleteFilterSingleSelectPostalCode,
  PriceListTableForCopClientList,
} from '../../index';
import dayjs from 'dayjs';
import {FormHelper} from '@/helper';
import {useForm, Controller} from 'react-hook-form';
import {AutoCompleteSalesTerritory} from '@/features/master/registration-locations/components';
let dateCreation;
let dateActive;
let dateExpire;
let version;
let enteredBy;
let corporateCode;
let corporateName;
let invoiceAc;
let priceList;
let acType;
let sbu;
let acClass;
let billingFrequency;
let billingOn;
let city;
let state;
let country;
let postalCode;
let district;
let customerGroup;
let category;
let telephone;
let mobileNo;
let email;
let deliveryType;
let deliveryMethod;
let salesTerritoRy;
let area;
let zone;
let schedule;
let info;
let fyiLine;
let workLine;
let status;
let environment;
interface CorporateClientListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
  onUpdateFileds?: (fileds: any, id: string) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const CorporateClient = (props: CorporateClientListProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
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
            dataField: 'corporateCode',
            text: 'Client Code',
            headerClasses: 'textHeader5',
            sort: true,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                corporateCode = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'corporateName',
            text: 'Client Name',
            headerClasses: 'textHeader5',
            sort: true,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                corporateName = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'invoiceAc',
            text: 'Invoice Ac',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                invoiceAc = filter;
              },
            }),
          },
          {
            dataField: 'priceList',
            text: 'Price List',
            headerClasses: 'textHeader5 z-10',
            sort: true,
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                priceList = filter;
              },
            }),
            formatter: (cell, row) => {
              return (
                <>
                  {row?.priceList ? (
                    <PriceListTableForCopClientList
                      data={row?.priceList}
                      invoiceAc={row.invoiceAc}
                      onUpdate={data => {
                        props.onUpdateItem &&
                          props.onUpdateItem(data, 'priceList', row._id);
                      }}
                    />
                  ) : null}
                </>
              );
            },
          },
          {
            dataField: 'acType',
            text: 'Ac Type',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                acType = filter;
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
                  value={row.acType}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const acType = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(acType, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'AC_TYPE').map(
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
            dataField: 'acClass',
            text: 'Ac Class',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                acClass = filter;
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
                  value={row.acClass}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const acClass = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(acClass, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'AC_CLASS').map(
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
            dataField: 'billingOn',
            text: 'Billing On',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                billingOn = filter;
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
                  value={row?.billingOn}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                  onChange={e => {
                    const billingOn = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(billingOn, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'BILLING_ON').map(
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
            dataField: 'billingFrequency',
            text: 'Billing Frequency',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                billingFrequency = filter;
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
                  value={row?.billingFrequency}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                  onChange={e => {
                    const billingFrequency = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        billingFrequency,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(
                    props.extraData.lookupItems,
                    'BILLING_FREQUENCY',
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
            dataField: 'customerGroup',
            text: 'Customer Group',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                customerGroup = filter;
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
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const customerGroup = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        customerGroup,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(
                    props.extraData.lookupItems,
                    'CUSTOMER_GROUP',
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
            dataField: 'category',
            text: 'Category',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
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
            dataField: 'country',
            text: 'Country',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            filter: textFilter({
              getFilter: filter => {
                country = filter;
              },
            }),
            headerClasses: 'textHeader4',
            style: {textTransform: 'uppercase'},
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <AutoCompleteFilterSingleSelectCountry
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {
                          country: item.country,
                          state: '',
                          district: '',
                          city: '',
                          area: '',
                          postalCode: parseInt(''),
                        },
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'state',
            text: 'State',
            headerClasses: 'textHeader4',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                state = filter;
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
                <AutoCompleteFilterSingleSelectState
                  country={row.country}
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {
                          state: item.state,
                          district: '',
                          city: '',
                          area: '',
                          postalCode: parseInt(''),
                        },
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'district',
            text: 'District',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                district = filter;
              },
            }),
            headerClasses: 'textHeader4',
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <AutoCompleteFilterSingleSelectDistrict
                  country={row.country}
                  state={row.state}
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {
                          district: item.district,
                          city: '',
                          area: '',
                          postalCode: parseInt(''),
                        },
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'city',
            text: 'City',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                city = filter;
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
                <AutoCompleteFilterSingleSelectCity
                  country={row.country}
                  state={row.state}
                  district={row.district}
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {city: item.city, area: '', postalCode: parseInt('')},
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'area',
            text: 'Area',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                area = filter;
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
                <AutoCompleteFilterSingleSelectArea
                  country={row.country}
                  state={row.state}
                  district={row.district}
                  city={row.city}
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {area: item.area, postalCode: parseInt('')},
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'postalCode',
            text: 'Postal Code',
            headerClasses: 'textHeader6',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: customFilter({
              getFilter: filter => {
                postalCode = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
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
                <AutoCompleteFilterSingleSelectPostalCode
                  country={row.country}
                  state={row.state}
                  district={row.district}
                  city={row.city}
                  area={row.area}
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {
                          postalCode: parseInt(item.postalCode),
                          zone: item.zone,
                          sbu: item.sbu,
                        },
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'zone',
            text: 'Zone',
            headerClasses: 'textHeader1',
            sort: true,
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                zone = filter;
              },
            }),
          },
          {
            dataField: 'sbu',
            text: 'SBU',
            headerClasses: 'textHeader1',
            sort: true,
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                sbu = filter;
              },
            }),
          },
          {
            dataField: 'salesTerritoRy',
            text: 'Sales Territory',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                salesTerritoRy = filter;
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                telephone = filter;
              },
            }),
          },
          {
            dataField: 'mobileNo',
            text: 'Mobile No',
            headerClasses: 'textHeader2',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                mobileNo = filter;
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
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      placeholder={
                        errors.mobileNo ? 'Please Enter MobileNo' : 'Mobile No'
                      }
                      hasError={errors.mobileNo}
                      type='number'
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
            headerClasses: 'textHeader2',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                email = filter;
              },
            }),
          },
          {
            dataField: 'deliveryType',
            text: 'Delivery Type',
            headerClasses: 'textHeader4',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                deliveryType = filter;
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                deliveryMethod = filter;
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
            dataField: 'info',
            text: 'Info',
            headerClasses: 'textHeader3',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                info = filter;
              },
            }),
          },
          {
            dataField: 'confidential',
            text: 'Confidential',
            sort: true,
            editable: false,
            csvFormatter: (col, row) =>
              `${row.confidental ? (row.confidental ? 'Yes' : 'No') : 'No'}`,
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
                          'confidental',
                          row._id,
                        );
                    }}
                  />
                </>
              );
            },
          },

          {
            dataField: 'urgent',
            text: 'Urgent',
            sort: true,
            editable: false,
            csvFormatter: (col, row) =>
              `${row.urgent ? (row.urgent ? 'Yes' : 'No') : 'No'}`,
            formatter: (cell, row) => {
              return (
                <>
                  {' '}
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.urgent}
                    onChange={urgent => {
                      props.onUpdateItem &&
                        props.onUpdateItem(urgent, 'urgent', row._id);
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'reportFormat',
            text: 'Report Format',
            sort: true,
            editable: false,
            csvFormatter: (col, row) =>
              `${row.reportFormat ? (row.reportFormat ? 'Yes' : 'No') : 'No'}`,
            formatter: (cell, row) => {
              return (
                <>
                  {' '}
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
                  />
                </>
              );
            },
          },

          {
            dataField: 'fyiLine',
            text: 'FYI Line',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                fyiLine = filter;
              },
            }),
          },
          {
            dataField: 'workLine',
            text: 'Work Line',
            headerClasses: 'textHeader4',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                workLine = filter;
              },
            }),
          },

          {
            dataField: 'dateCreation',
            editable: false,
            text: 'Date Creation',
            headerClasses: 'textHeader6',
            sort: true,
            csvFormatter: (col, row) =>
              row.dateCreation
                ? dayjs(row.dateCreation || 0).format('YYYY-MM-DD')
                : '',
            filter: customFilter({
              getFilter: filter => {
                dateCreation = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateCreation || 0).format('YYYY-MM-DD')}</>;
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
            editable: false,
            text: 'Date Active',
            headerClasses: 'textHeader6',
            sort: true,
            csvFormatter: (col, row) =>
              row.dateActive
                ? dayjs(row.dateActive || 0).format('YYYY-MM-DD')
                : '',
            filter: customFilter({
              getFilter: filter => {
                dateActive = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateActive || 0).format('YYYY-MM-DD')}</>;
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
            editable: false,
            text: 'Date Expire',
            headerClasses: 'textHeader6',
            sort: true,
            csvFormatter: (col, row) =>
              row.dateExpire
                ? dayjs(row.dateExpire || 0).format('YYYY-MM-DD')
                : '',
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
            editable: false,
            text: 'Version',
            headerClasses: 'textHeader4',
            sort: true,
            csvFormatter: col => (col ? col : ''),
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
            editable: false,
            headerClasses: 'textHeader3',
            text: 'Entered By',
            sort: true,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                enteredBy = filter;
              },
            }),
          },
          {
            dataField: 'status',
            text: 'Status',
            headerClasses: 'textHeader2',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
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
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
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
                  <Tooltip tooltipText='Delete' position='top'>
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
                          body: `Delete item`,
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
            headerClasses: 'sticky right-0  bg-gray-500 text-white',
            classes: (cell, row, rowIndex, colIndex) => {
              return 'sticky right-0 bg-gray-500';
            },
          },
        ]}
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName='CorporateClients'
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
          corporateCode('');
          corporateName('');
          priceList('');
          acType('');
          acClass('');
          billingOn('');
          city('');
          state('');
          country('');
          district('');
          postalCode('');
          customerGroup('');
          category('');
          telephone('');
          mobileNo('');
          billingFrequency('');
          sbu('');
          email('');
          deliveryType('');
          deliveryMethod('');
          corporateCode('');
          invoiceAc('');
          salesTerritoRy('');
          area('');
          zone('');
          schedule('');
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
