import React from 'react';
import { Stores } from '../../../stores';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  textFilter,
  customFilter,
  TableBootstrap,
  Form,
  Icons,
  Tooltip,
  sortCaret,
  Toast,
  NumberFilter,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { useStores } from '@/stores';
import {
  AutoCompleteFilterSingleSelectPostalCode,
  PriceListTableForLabList,
  AutoCompleteDefaultLab,
} from '../..';
import { FormHelper } from '@/helper';
import { useForm } from 'react-hook-form';
let code;
let name;
let country;
let state;
let district;
let city;
let area;
let postalCode;
let address;
let priceList;
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
let version;
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
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (record: any) => void;
}
const dynamicStylingFields = [
  'code',
  'name',
  'defaultLab',
  'status',
  'environment',
];
const hideExcelSheet = ['_id', 'opration', 'image'];
export const LabList = (props: LabListProps) => {
  const { salesTeamStore } = useStores();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
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
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              style: {
                textTransform: 'uppercase',
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  code = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'name',
              text: 'Name',
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              style: {
                textTransform: 'uppercase',
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  name = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'postalCode',
              text: 'Postal Code',

              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              headerClasses: 'textHeader2',
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

              style: { textTransform: 'uppercase' },
            },
            {
              dataField: 'state',
              text: 'State',
              sort: true,
              headerClasses: 'textHeader2',
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
              style: {
                textTransform: 'uppercase',
              },
            },
            {
              dataField: 'district',
              text: 'District',
              sort: true,
              headerClasses: 'textHeader2',
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
              style: {
                textTransform: 'uppercase',
              },
            },
            {
              dataField: 'city',
              text: 'City',
              sort: true,
              headerClasses: 'textHeader2',
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
              style: {
                textTransform: 'uppercase',
              },
            },
            {
              dataField: 'area',
              text: 'Area',
              sort: true,
              headerClasses: 'textHeader2',
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
              style: {
                textTransform: 'uppercase',
              },
            },

            {
              dataField: 'address',
              text: 'Address',
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              filter: textFilter({
                getFilter: filter => {
                  address = filter;
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
                  <Form.MultilineInput
                    label=''
                    placeholder='Address'
                    onBlur={address => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds({ address }, row._id);
                    }}
                    defaultValue={row.address}
                  />
                </>
              ),
            },
            {
              dataField: 'priceList',
              text: 'Price List',
              headerClasses: 'textHeader3 z-10',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                        key={row?._id}
                        rowStatus={!editorCell(row)}
                        isAddRemoveItem={false}
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
              dataField: 'salesTerritory',
              text: 'Sales Territory',
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  salesTerritory = filter;
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  labLicence = filter;
                },
              }),
              style: { textTransform: 'uppercase' },
              editorStyle: {
                textTransform: 'uppercase',
              },
            },

            {
              dataField: 'director',
              text: 'Director',
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  director = filter;
                },
              }),
              style: { textTransform: 'uppercase' },
              editorStyle: {
                textTransform: 'uppercase',
              },
            },
            {
              dataField: 'physician',
              text: 'Physician',
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                  <Form.Input
                    placeholder={row.mobileNo}
                    type='number'
                    onBlur={mobileNo => {
                      if (mobileNo === '') {
                        // Handle the case when the input is empty
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            mobileNo,
                            column.dataField,
                            row._id,
                          );
                      } else if (
                        FormHelper.isMobileNoValid(String(mobileNo)) &&
                        mobileNo?.length === 10
                      ) {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            mobileNo,
                            column.dataField,
                            row._id,
                          );
                      } else {
                        Toast.error({
                          message:
                            'Please Enter a Valid 10-Digit Mobile Number',
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                  <Form.Input
                    placeholder={row.contactNo}
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
                          message:
                            'Please Enter a Valid 10-Digit Contact Number',
                        });
                      }
                    }}
                  />
                </>
              ),
            },

            {
              dataField: 'speciality',
              text: 'Speciality',
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                    key={row?._id}
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              sort: true,
              headerClasses: 'textHeader2',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  email = filter;
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
                  <Form.Input
                    placeholder={row.email}
                    onBlur={email => {
                      if (FormHelper.isEmailValid(email)) {
                        props.onUpdateItem &&
                          props.onUpdateItem(email, column.dataField, row._id);
                      } else {
                        Toast.error({
                          message: 'Please Enter Valid Email',
                        });
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'web',
              text: 'Web',
              sort: true,
              // headerClasses: 'textHeader2',
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'registeredOffice',
              text: 'Registered Office',
              sort: true,
              // headerClasses: 'textHeader2',
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'customerCare',
              text: 'Customer Care',
              sort: true,
              // headerClasses: 'textHeader2',
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'corporateOffice',
              text: 'Corporate Office',
              sort: true,
              // headerClasses: 'textHeader2',
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'gst',
              text: 'GST',
              sort: true,
              // headerClasses: 'textHeader2',
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'sacCode',
              text: 'Sac Code',

              sort: true,
              // headerClasses: 'textHeader2',
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),

              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'cinNo',
              text: 'CIN No',
              sort: true,
              // headerClasses: 'textHeader2',
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'image',
              text: 'Lab Log',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvExport: false,
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
              dataField: 'printLable',
              text: 'Print Lable',
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
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
                      disabled={!editorCell(row)}
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
                      disabled={!editorCell(row)}
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
              dataField: 'specificFormat',
              text: 'Specific Format',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.specificFormat
                    ? row.specificFormat
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
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
              dataField: 'fyiLine',
              text: 'Fyi Line',
              sort: true,
              headerClasses: 'textHeader1',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              sort: true,
              headerClasses: 'textHeader1',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              dataField: 'version',
              editable: false,
              text: 'Version',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
              dataField: 'status',
              text: 'Status',
              sort: true,
              headerClasses: 'textHeader1',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                row.status == 'D' || row.status == 'I' ? false : true,
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
              dataField: 'environment',
              text: 'Environment',
              sort: true,
              headerClasses: 'textHeader1',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                    {row.status === 'A' && (
                      <>
                        <Tooltip tooltipText='Version Upgrade'>
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
                        <Tooltip tooltipText='Duplicate'>
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
              headerClasses: 'sticky right-0 bg-gray-500 text-white z-50',
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
            address('');
            priceList('');
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
          hideExcelSheet={hideExcelSheet}
          dynamicStylingFields={dynamicStylingFields}
        />
      </div>
    </>
  );
};
