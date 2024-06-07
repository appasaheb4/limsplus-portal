import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import {
  NumberFilter,
  DateRangeFilter,
  TableBootstrap,
  textFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
  Type,
  sortCaret,
  Toast,
  ModalDateTime,
  ModalPostalCode,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { lookupItems, lookupValue } from '@/library/utils';
import { useStores } from '@/stores';
import { AutoCompleteFilterMultiSelectPanelList } from '../..';
import dayjs from 'dayjs';
import { FormHelper } from '@/helper';
import { useForm } from 'react-hook-form';
import { AutoCompleteSalesTerritory } from '@/features/master/registration-locations/components';
import { AutoCompleteFilterDeliveryMode } from '@/core-components';

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
let address;
let creditLimit;
let consumedLimit;
let district;
let customerGroup;
let category;
let telephone;
let mobileNo;
let email;
let reportPriority;
let deliveryMode;
let salesTerritoRy;
let area;
let zone;
let schedule;
let info;
let fyiLine;
let workLine;
let status;
let companyCode;
let environment;

interface CorporateClientListProps {
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
  onApproval: (record: any) => void;
  onSingleDirectUpdateField?: (
    value: any,
    dataField: string,
    id: string,
  ) => void;
}

export const CorporateClient = observer((props: CorporateClientListProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [modalDetails, setModalDetails] = useState<any>();
  const { interfaceManagerStore, labStore } = useStores();
  // const [interfaceManagerList, setInterfaceManagerList] = useState([]);
  const interfaceManagerListImportRef = useRef([]);
  const interfaceManagerListExportRef = useRef([]);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [modalPostalCodeUpdate, setModalPostalCodeUpdate] = useState<any>({
    show: false,
  });
  const [widthRefBox, setWidthRefBox] = useState('20px');
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);

  const getTemplateForImportList = (interfaceType: string) => {
    interfaceManagerStore.interfaceManagerService
      .findByFields({
        input: {
          filter: {
            interfaceType,
          },
        },
      })
      .then(res => {
        if (res.findByFieldsInterfaceManager.success) {
          if (interfaceType == 'IMPORT_FILE') {
            interfaceManagerListImportRef.current =
              res.findByFieldsInterfaceManager.data;
          } else {
            interfaceManagerListExportRef.current =
              res.findByFieldsInterfaceManager.data;
          }
        }
      });
  };

  useEffect(() => {
    getTemplateForImportList('IMPORT_FILE');
    getTemplateForImportList('EXPORT_FILE');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            dataField: 'corporateCode',
            text: 'Client Code',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Client Code',
              getFilter: filter => {
                corporateCode = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'corporateName',
            text: 'Client Name',
            headerClasses: 'textHeader',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Client Name',
              getFilter: filter => {
                corporateName = filter;
              },
            }),
            editable: false,
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
              <span title={row.corporateName}>{cellContent}</span>
            ),
          },
          {
            dataField: 'invoiceAc',
            text: 'Invoice Ac',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
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
                <Form.Input
                  placeholder={row?.invoiceAc}
                  onBlur={invoiceAc => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        Number.parseInt(invoiceAc),
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'acType',
            text: 'Ac Type',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Ac Type',
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
                  <option>Select</option>
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Ac Class',
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
                  <option>Select</option>
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Billing On',
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
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                  }
                  onChange={e => {
                    const billingOn = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(billingOn, column.dataField, row._id);
                  }}
                >
                  <option>Select</option>
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Billing Frequency',
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
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                  }
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
                  <option>Select</option>
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Customer Group',
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
                  <option>Select</option>
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Category',
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
                  <option>Select</option>
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
            headerClasses: 'textHeader6',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
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
                <Form.Input
                  placeholder='Search....'
                  // value={row.postalCode}
                  //disabled={true}
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
              placeholder: 'State',
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
              placeholder: 'District',
              getFilter: filter => {
                district = filter;
              },
            }),
            headerClasses: 'textHeader4',
          },
          {
            dataField: 'city',
            text: 'City',
            headerClasses: 'textHeader5',
            sort: true,
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
          },
          {
            dataField: 'area',
            text: 'Area',
            headerClasses: 'textHeader5',
            sort: true,
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
          },
          {
            dataField: 'address',
            text: 'Address',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editor: {
              type: Type.TEXTAREA,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Address',
              getFilter: filter => {
                address = filter;
              },
            }),
          },
          {
            dataField: 'creditLimit',
            text: 'Credit Limit',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Credit Limit',
              getFilter: filter => {
                creditLimit = filter;
              },
            }),
          },
          {
            dataField: 'consumedLimit',
            text: 'Consumed Limit',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Consumed Limit',
              getFilter: filter => {
                consumedLimit = filter;
              },
            }),
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
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Zone',
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'SBU',
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Sales Territory',
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
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Telephone',
              getFilter: filter => {
                telephone = filter;
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            // editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Email',
              getFilter: filter => {
                email = filter;
              },
            }),
            formatter: (cell, row) => {
              return (
                <div className='flex flex-row flex-wrap gap-2'>
                  {row.emails?.map((item, index) => (
                    <span key={index}>{item?.name + '-' + item?.email}</span>
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
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Report Priority',
              getFilter: filter => {
                reportPriority = filter;
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
                    const reportPriority = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        reportPriority,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option>Select</option>
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            formatter: (cell, row) => {
              return (
                <div className='flex flex-row flex-wrap gap-2'>
                  {typeof row.deliveryMode != 'string' &&
                    row.deliveryMode?.map((item, index) => (
                      <span
                        key={index}
                        className='bg-blue-800 rounded-md p-2 text-white'
                      >
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
            dataField: 'info',
            text: 'Info',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Info',
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
              `${
                row?.confidential ? (row?.confidential ? 'Yes' : 'No') : 'No'
              }`,
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
            dataField: 'isEmployeeCode',
            text: 'Employee Code',
            sort: true,
            editable: false,
            csvFormatter: (col, row) =>
              `${
                row.isEmployeeCode ? (row.isEmployeeCode ? 'Yes' : 'No') : 'No'
              }`,
            formatter: (cell, row) => {
              return (
                <>
                  {' '}
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.isEmployeeCode}
                    onChange={isEmployeeCode => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          isEmployeeCode,
                          'isEmployeeCode',
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
                row.specificFormat ? (row.specificFormat ? 'Yes' : 'No') : 'No'
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
            dataField: 'isBalanceCheck',
            text: 'Balance Check',
            sort: true,
            editable: false,
            csvFormatter: (col, row) =>
              `${
                row.isBalanceCheck ? (row.isBalanceCheck ? 'Yes' : 'No') : 'No'
              }`,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.isBalanceCheck}
                    onChange={isBalanceCheck => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          isBalanceCheck,
                          'isBalanceCheck',
                          row._id,
                        );
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'isPredefinedPanel',
            text: 'Predefined Panel',
            sort: true,
            editable: false,
            csvFormatter: (col, row) =>
              `${
                row.isPredefinedPanel
                  ? row.isPredefinedPanel
                    ? 'Yes'
                    : 'No'
                  : 'No'
              }`,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.isPredefinedPanel}
                    onChange={isPredefinedPanel => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          isPredefinedPanel,
                          'isPredefinedPanel',
                          row._id,
                        );
                    }}
                  />
                </>
              );
            },
          },

          {
            dataField: 'panelList',
            text: 'Panel List',
            headerClasses: 'textHeader1',
            // sort: true,
            style: { width: widthRefBox },
            editable: (content, row, rowIndex, columnIndex) =>
              row.isPredefinedPanel,
            csvFormatter: col => (col ? col : ''),
            formatter: (cell, row) => {
              return (
                <>
                  <div>
                    {row.panelList?.length > 0 && (
                      <Tooltip
                        tooltipText={
                          row._id != selectedRowId
                            ? 'Expand Panel List'
                            : 'Collapse Panel List'
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
                    <div className='flex flex-row w-80 gap-2 items-center overflow-auto'>
                      {row.panelList?.map((item, index) => (
                        <span key={index} className='shadow-xl p-2 '>
                          {item?.panelCode + ' - ' + item?.panelName}
                        </span>
                      ))}
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
                <AutoCompleteFilterMultiSelectPanelList
                  disable={row.isPredefinedPanel}
                  selected={row.panelList}
                  onSelect={panelList => {
                    props.onUpdateItem &&
                      props.onUpdateItem(panelList, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },

          {
            dataField: 'templateForImport',
            text: 'Template For Import',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
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
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.templateForImport
                      ? 'border-red  '
                      : 'border-gray-300'
                  } rounded-md`}
                  onChange={e => {
                    const templateForImport = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        templateForImport,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option>Select</option>
                  {interfaceManagerListImportRef.current?.map(
                    (item: any, index: number) => (
                      <option key={index} value={item.instrumentType}>
                        {item?.instrumentType + ' - ' + item?.instrumentName}
                      </option>
                    ),
                  )}
                </select>
              </>
            ),
          },

          {
            dataField: 'templateForExport',
            text: 'Template For Export',
            headerClasses: 'textHeader5',
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
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
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.templateForImport
                      ? 'border-red  '
                      : 'border-gray-300'
                  } rounded-md`}
                  onChange={e => {
                    const templateForExport = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        templateForExport,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option>Select</option>
                  {interfaceManagerListExportRef.current?.map(
                    (item: any, index: number) => (
                      <option key={index} value={item.instrumentType}>
                        {item?.instrumentType + ' - ' + item?.instrumentName}
                      </option>
                    ),
                  )}
                </select>
              </>
            ),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Work Line',
              getFilter: filter => {
                workLine = filter;
              },
            }),
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
              row.dateCreation
                ? dayjs(row.dateCreation || 0).format('DD-MM-YYYY HH:mm:ss')
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
                  {row.dateCreation &&
                    dayjs(row.dateCreation || 0).format('DD-MM-YYYY HH:mm:ss')}
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
            headerClasses: 'textHeader',
            // sort: true,
            headerStyle: {
              fontSize: 0,
            },
            // sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateActive
                ? dayjs(row.dateActive || 0).format('DD-MM-YYYY HH:mm:ss')
                : '',
            filter: customFilter({
              getFilter: filter => {
                dateActive = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return (
                <>
                  {row.dateActive &&
                    dayjs(row.dateActive || 0).format('DD-MM-YYYY HH:mm:ss')}
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            text: 'Date Expiry',
            headerClasses: 'textHeader',
            // sort: true,
            headerStyle: {
              fontSize: 0,
            },
            // sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateExpire
                ? dayjs(row.dateExpire || 0).format('DD-MM-YYYY HH:mm:ss')
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
                  {row.dateExpire &&
                    dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')}
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
          {
            dataField: 'version',
            editable: false,
            text: 'Version',
            headerClasses: 'textHeader2',
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
            dataField: 'enteredBy',
            editable: false,
            headerClasses: 'textHeader2',
            text: 'Entered By',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Entered By',
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
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
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
                  {row.status === 'A' && (
                    <>
                      {props.isVersionUpgrade && (
                        <Tooltip className='ml-2' tooltipText='Version Upgrade'>
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
                        <Tooltip className='ml-2' tooltipText='Duplicate'>
                          <Icons.IconContext
                            color='#ffffff'
                            size='20'
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
                          >
                            {Icons.getIconTag(Icons.Iconio5.IoDuplicateOutline)}
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
          address('');
          creditLimit('');
          consumedLimit('');
          customerGroup('');
          category('');
          telephone('');
          mobileNo('');
          billingFrequency('');
          sbu('');
          email('');
          reportPriority('');
          deliveryMode('');
          corporateCode('');
          invoiceAc('');
          salesTerritoRy('');
          area('');
          zone('');
          schedule('');
          info('');
          fyiLine('');
          workLine('');
          companyCode('');
          status('');
          environment('');
        }}
        dynamicStylingFields={[
          'corporateCode',
          'corporateName',
          'status',
          'environment',
        ]}
        hideExcelSheet={['_id', 'opration']}
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
            postalCode: Number(item.Pincode),
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
  );
});
