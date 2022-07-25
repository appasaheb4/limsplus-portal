import React from 'react';
import {Stores} from '../../../stores';
import {lookupItems, lookupValue} from '@/library/utils';
import _ from 'lodash';
import {
  textFilter,
  TableBootstrap,
  Form,
  Icons,
  Tooltip,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {useStores} from '@/stores';
import {
  AutoCompleteFilterSingleSelectCountry,
  AutoCompleteFilterSingleSelectState,
  AutoCompleteFilterSingleSelectDistrict,
  AutoCompleteFilterSingleSelectCity,
  AutoCompleteFilterSingleSelectArea,
  AutoCompleteFilterSingleSelectPostalCode,
  PriceListTableForLabList,
  AutoCompleteDefaultLab,
} from '../..';
import {FormHelper} from '@/helper';
import {useForm, Controller} from 'react-hook-form';
let code;
let name;
let country;
let state;
let district;
let city;
let area;
let postalCode;
let priceList;
let deliveryType;
let salesTerritory;
let labLicence;
let defaultLab;
let director;
let physician;
let mobileNo;
let contactNo;
let speciality;
let labType;
let openingTime;
let closingTime;
let email;
let fyiLine;
let workLine;
let status;
let environment;

interface LabListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateFileds?: (fileds: any, id: string) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFields?: (items: any, id: string) => void;
  onUpdateImage?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}
export const LabList = (props: LabListProps) => {
  const {administrativeDivisions, salesTeamStore} = useStores();
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
              dataField: 'code',
              text: 'Code',
              sort: true,
              filter: textFilter({
                getFilter: filter => {
                  code = filter;
                },
              }),
              editable: false,
              headerClasses: 'textHeader3',
            },
            {
              dataField: 'name',
              text: 'Name',
              sort: true,
              filter: textFilter({
                getFilter: filter => {
                  name = filter;
                },
              }),
              editable: false,
              headerClasses: 'textHeader3',
            },
            {
              dataField: 'country',
              text: 'Country',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              filter: textFilter({
                getFilter: filter => {
                  country = filter;
                },
              }),
              headerClasses: 'textHeader3',
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
                      props.onUpdateFields &&
                        props.onUpdateFields(
                          {
                            country: item.country,
                            state: '',
                            district: '',
                            city: '',
                            area: '',
                            postalCode: '',
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
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                            postalCode: '',
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
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  district = filter;
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
                            postalCode: '',
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
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                          {city: item.city, area: '', postalCode: ''},
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
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                          {area: item.area, postalCode: ''},
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
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    country={row.country}
                    state={row.state}
                    district={row.district}
                    city={row.city}
                    area={row.area}
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {postalCode: item.postalCode},
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'priceList',
              text: 'Price List',
              headerClasses: 'textHeader3 z-10',
              sort: true,
              csvFormatter: (col, row) =>
                `PriceGroup : ${row?.priceList
                  ?.map(item => item.priceGroup)
                  .join(' , ')} Description: ${row?.priceList
                  ?.map(item => item.description)
                  .join(' , ')} Max Dis% : ${row?.priceList
                  ?.map(item => item.maxDis)
                  .join(' , ')}`,
              filter: textFilter({
                getFilter: filter => {
                  priceList = filter;
                },
              }),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.priceList ? (
                      <PriceListTableForLabList
                        data={row?.priceList}
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
              dataField: 'deliveryType',
              text: 'Delivery Type',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
              dataField: 'salesTerritory',
              text: 'Sales Territory',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  salesTerritory = filter;
                },
              }),
              headerClasses: 'textHeader5',
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
                      const salesTerritory = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          salesTerritory,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {salesTeamStore.listSalesTeam &&
                      salesTeamStore.listSalesTeam.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.salesTerritory.area}>
                            {`${item.salesTerritory.area}`}
                          </option>
                        ),
                      )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'labLicence',
              text: 'Lab Licence',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  labLicence = filter;
                },
              }),
              style: {textTransform: 'uppercase'},
              editorStyle: {
                textTransform: 'uppercase',
              },
            },

            {
              dataField: 'director',
              text: 'Director',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  director = filter;
                },
              }),
              style: {textTransform: 'uppercase'},
              editorStyle: {
                textTransform: 'uppercase',
              },
            },
            {
              dataField: 'physician',
              text: 'Physician',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  physician = filter;
                },
              }),
            },
            {
              dataField: 'mobileNo',
              text: 'Mobile No',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                          errors.mobileNo
                            ? 'Please Enter MobileNo'
                            : 'Mobile No'
                        }
                        hasError={!!errors.mobileNo}
                        pattern={FormHelper.patterns.mobileNo}
                        defaultValue={row.mobileNo}
                        type='number'
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
              dataField: 'contactNo',
              text: 'Contact No',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  contactNo = filter;
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
                          errors.contactNo
                            ? 'Please Enter ContactNo'
                            : 'Contact No'
                        }
                        hasError={!!errors.contactNo}
                        pattern={FormHelper.patterns.mobileNo}
                        defaultValue={row.contactNo}
                        type='number'
                        onChange={contactNo => {
                          onChange(contactNo);
                        }}
                        onBlur={contactNo => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              contactNo,
                              column.dataField,
                              row._id,
                            );
                        }}
                      />
                    )}
                    name='contactNo'
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
              dataField: 'speciality',
              text: 'Speciality',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  speciality = filter;
                },
              }),
            },
            {
              dataField: 'labType',
              text: 'Lab Type',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  labType = filter;
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
                    value={Stores.labStore.labs?.labType}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const labType = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(labType, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'LAB_TYPE').map(
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
              dataField: 'defaultLab',
              text: 'Default Lab',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  defaultLab = filter;
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
                  <AutoCompleteDefaultLab
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'openingTime',
              text: 'Opening Time',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  closingTime = filter;
                },
              }),
            },
            {
              dataField: 'email',
              text: 'Email',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  email = filter;
                },
              }),
            },
            {
              dataField: 'image',
              text: 'Lab Log',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvExport: false,
              filter: textFilter(),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.image && (
                      <img
                        src={row.image}
                        alt='lab logo'
                        className='object-fill h-35 w-40 rounded-md'
                      />
                    )}
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
                  <Form.InputFile
                    label='File'
                    placeholder='File'
                    onChange={e => {
                      const image = e.target.files[0];
                      props.onUpdateImage &&
                        props.onUpdateImage(image, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'reportFormat',
              text: 'Report Format',
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
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
              dataField: 'printLable',
              text: 'Print Lable',
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.printLable}
                      onChange={printLable => {
                        props.onUpdateItem &&
                          props.onUpdateItem(printLable, 'printLable', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'abnFlag',
              text: 'Abn Flag',
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.abnFlag}
                      onChange={abnFlag => {
                        props.onUpdateItem &&
                          props.onUpdateItem(abnFlag, 'abnFlag', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'critical',
              text: 'Critical',
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.critical}
                      onChange={critical => {
                        props.onUpdateItem &&
                          props.onUpdateItem(critical, 'critical', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'autoRelease',
              text: 'Auto Release',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${row.autoRelease ? (row.autoRelease ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.autoRelease}
                      onChange={autoRelease => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            autoRelease,
                            'autoRelease',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'requireReceveInLab',
              text: 'Require Receve In Lab',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.requireReceveInLab
                    ? row.requireReceveInLab
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.requireReceveInLab}
                      onChange={requireReceveInLab => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            requireReceveInLab,
                            'requireReceveInLab',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'requireScainIn',
              text: 'Require Scain In',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.requireScainIn
                    ? row.requireScainIn
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.requireScainIn}
                      onChange={requireScainIn => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            requireScainIn,
                            'requireScainIn',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'routingDept',
              text: 'Routing Dept',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${row.routingDept ? (row.routingDept ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.routingDept}
                      onChange={routingDept => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            routingDept,
                            'routingDept',
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
              text: 'Fyi Line',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  workLine = filter;
                },
              }),
            },
            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader3',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    value={row.status}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                    }
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
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                      'ENVIRONMENT',
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
              headerClasses: 'sticky right-0 bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='Lab'
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
            code('');
            name('');
            country('');
            state('');
            district('');
            city('');
            area('');
            postalCode('');
            priceList('');
            deliveryType('');
            salesTerritory('');
            labLicence('');
            director('');
            physician('');
            mobileNo('');
            contactNo('');
            speciality('');
            labType('');
            defaultLab('');
            openingTime('');
            closingTime('');
            email('');
            fyiLine('');
            workLine('');
            status('');
            environment('');
          }}
        />
      </div>
    </>
  );
};
