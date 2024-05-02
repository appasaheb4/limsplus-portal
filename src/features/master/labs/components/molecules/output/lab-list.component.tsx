import React, { useEffect, useState } from 'react';
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
  ModalPostalCode,
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
let companyCode;
let status;
let environment;

interface LabListProps {
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
  const { salesTeamStore, labStore } = useStores();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const [selectedRowId, setSelectedRowId] = useState('');
  const [widthRefBox, setWidthRefBox] = useState('20px');
  const [modalPostalCodeUpdate, setModalPostalCodeUpdate] = useState<any>({
    show: false,
  });
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
                placeholder: 'Code',
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
              headerClasses: 'textHeader',
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
              filter: textFilter({
                placeholder: 'Name',
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
                placeholder: 'Postal Code',
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
                  <Form.Input
                    placeholder='Search....'
                    onKeyDown={e => {
                      if (e.key === 'F5') {
                        e.preventDefault();
                        setModalPostalCodeUpdate({
                          ...modalPostalCodeUpdate,
                          show: true,
                          id: row._id,
                          data: [
                            {
                              Pincode: '',
                              Country: '',
                              State: '',
                              District: '',
                              Block: '',
                              Name: '',
                            },
                          ],
                        });
                      }
                    }}
                    onChange={postalCode => {
                      if (postalCode?.length == 6) {
                        labStore.LabService?.getAddressDetailsByPincode(
                          postalCode,
                        ).then(res => {
                          setModalPostalCodeUpdate({
                            ...modalPostalCodeUpdate,
                            show: true,
                            id: row._id,
                            data: res,
                            postalCode,
                          });
                        });
                      }
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
                placeholder: 'Country',
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
                placeholder: 'State',
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
                placeholder: 'District',
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
                placeholder: 'City',
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
                placeholder: 'Area',
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
                placeholder: 'Address',
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
              // headerClasses: 'textHeader',
              style: { width: widthRefBox },
              // sort: true,
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                `PriceGroup : ${row?.priceList
                  ?.map(item => item.priceGroup)
                  .join(' , ')} Description: ${row?.priceList
                  ?.map(item => item.description)
                  .join(' , ')} Max Dis% : ${row?.priceList
                  ?.map(item => item.maxDis)
                  .join(' , ')}`,
              // filter: textFilter({
              //   getFilter: filter => {
              //     priceList = filter;
              //   },
              // }),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <div>
                      {row.priceList?.length > 0 && (
                        <Tooltip
                          tooltipText={
                            row._id != selectedRowId
                              ? 'Expand Price List'
                              : 'Collapse Price List'
                          }
                        >
                          <Icons.IconContext
                            color='#000000'
                            size='20'
                            onClick={() => {
                              if (row._id === selectedRowId) {
                                setSelectedRowId('');
                                setWidthRefBox('30px');
                              } else {
                                setSelectedRowId(row._id);
                                setWidthRefBox('800px');
                              }
                            }}
                          >
                            {Icons.getIconTag(
                              row._id != selectedRowId
                                ? Icons.IconBi.BiExpand
                                : Icons.IconBi.BiCollapse,
                            )}
                          </Icons.IconContext>
                        </Tooltip>
                      )}
                    </div>
                    {selectedRowId == row?._id && (
                      <div style={{ width: widthRefBox }}>
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
                      </div>
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
                placeholder: 'Sales Territory',
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
                placeholder: 'Lab Licence',
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
                placeholder: 'Director',
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
                placeholder: 'Physician',
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
                placeholder: 'Mobile No',
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
                placeholder: 'Contact No',
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
                placeholder: 'Specialty',
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
                placeholder: 'Lab Type',
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
                placeholder: 'Default Lab',
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
                placeholder: 'Opening Time',
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
                placeholder: 'Closing Time',
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
                placeholder: 'Email',
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
              headerClasses: 'textHeader',
              formatter: (cell, row) => {
                return (
                  <>
                    {row.image && (
                      <img
                        src={row.image}
                        alt='lab logo'
                        className='object-fill h-40 w-40 rounded-md'
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
                    // label='File'
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
                placeholder: 'Fyi Line',
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
                placeholder: 'Work Line',
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
                placeholder: 'Version',
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
                placeholder: 'Status',
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
              sort: true,
              headerClasses: 'textHeader1',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              filter: textFilter({
                placeholder: 'Environment',
                getFilter: filter => {
                  environment = filter;
                },
              }),
            },
            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
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
                        )}
                        {props.isDuplicate && (
                          <Tooltip tooltipText='Duplicate'>
                            <Icons.IconContext
                              color='#fff'
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
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
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
            companyCode('');
            status('');
            environment('');
          }}
          hideExcelSheet={hideExcelSheet}
          dynamicStylingFields={dynamicStylingFields}
        />
        <ModalPostalCode
          postalCode={modalPostalCodeUpdate.postalCode}
          show={modalPostalCodeUpdate.show}
          data={modalPostalCodeUpdate.data}
          onSelectedRow={item => {
            const finalData = {
              country: item?.Country?.toUpperCase(),
              state: item?.State?.toUpperCase(),
              district: item?.District?.toUpperCase(),
              city: item?.Block?.toUpperCase(),
              area: item?.Name?.toUpperCase(),
              postalCode: item.Pincode,
            };
            props.onUpdateFileds &&
              props.onUpdateFileds({ ...finalData }, modalPostalCodeUpdate.id);
            setModalPostalCodeUpdate({
              show: false,
            });
          }}
          close={() => {
            setModalPostalCodeUpdate({
              show: false,
            });
          }}
        />
      </div>
    </>
  );
};
