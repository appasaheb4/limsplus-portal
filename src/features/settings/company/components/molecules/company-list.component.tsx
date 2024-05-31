import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  TableBootstrap,
  sortCaret,
  textFilter,
  Tooltip,
  Icons,
  Form,
  customFilter,
  DateRangeFilter,
  NumberFilter,
  ModalDateTime,
  ModalPostalCode,
} from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import { MultiSelect } from '@/core-components';
import { useStores } from '@/stores';

let code;
let name;
let description;
let moduleInfo;
let lab;
let department;
let allowedUser;
let admin;
let password;
let postalCode;
let country;
let state;
let district;
let city;
let area;
let address;
let mobileNo;
let contactNo;
let email;
let web;
let webPortal;
let registeredOffice;
let corporateOffice;
let customerCare;
let gst;
let sacCode;
let cinNo;
let fyiLine;
let workLine;
let dateCreation;
let dateActive;
let dateExpire;
let enteredBy;
let version;
let status;
let supportPlan;
let environment;

interface CompanyListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateImage?: (value: any, dataField: string, id: string) => void;
  onUpdateFields?: (items: any, id: string) => void;
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
  onVersionUpgrade?: (item: any) => void;
}
const dynamicStylingFields = ['title', 'environment'];
const hideExcelSheet = ['_id', 'image', 'operation'];

export const CompanyList = (props: CompanyListProps) => {
  const { labStore } = useStores();
  const [modalDetails, setModalDetails] = useState<any>();
  const [modalPostalCodeUpdate, setModalPostalCodeUpdate] = useState<any>({
    show: false,
  });
  const editorCell = (row: any) => {
    return row?.status !== 'I' ? true : false;
  };
  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);
  return (
    <div className={`${props.isView ? 'shown' : 'hidden'}`}>
      <TableBootstrap
        id='_id'
        data={props?.data}
        totalSize={props?.totalSize}
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
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Code',
              getFilter: filter => {
                code = filter;
              },
            }),
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
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Name',
              getFilter: filter => {
                name = filter;
              },
            }),
          },
          {
            dataField: 'description',
            text: 'Description',
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
              <span title={row.description}>{cellContent}</span>
            ),
            editorStyle: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Description',
              getFilter: filter => {
                description = filter;
              },
            }),
          },
          {
            dataField: 'module',
            text: 'Module',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Module',
              getFilter: filter => {
                moduleInfo = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <ul style={{ listStyle: 'inside' }}>
                  {row?.module?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            dataField: 'lab',
            text: 'Lab',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Lab',
              getFilter: filter => {
                lab = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <span title={row.labCode}>
                {row?.labCode + ' - ' + row?.labName}
              </span>
            ),
          },
          {
            dataField: 'department',
            text: 'Department',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Department',
              getFilter: filter => {
                department = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <span title={row.departmentCode}>
                {row?.departmentCode + ' - ' + row?.departmentName}
              </span>
            ),
          },
          {
            dataField: 'allowedUser',
            text: 'Allowed User',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: customFilter({
              getFilter: filter => {
                allowedUser = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
            headerClasses: 'textHeader7',
          },
          {
            dataField: 'admin',
            text: 'Admin',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Admin',
              getFilter: filter => {
                admin = filter;
              },
            }),
          },
          {
            dataField: 'password',
            text: 'Password',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Password',
              getFilter: filter => {
                password = filter;
              },
            }),
          },
          {
            dataField: 'postalCode',
            text: 'Postal Code',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
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
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Country',
              getFilter: filter => {
                country = filter;
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
                  placeholder={row?.country}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={country => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        country?.toUpperCase(),
                        column.dataField,
                        row?._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'state',
            text: 'State',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'State',
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
                <Form.Input
                  placeholder={row?.state}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={state => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        state?.toUpperCase(),
                        column.dataField,
                        row?._id,
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
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'District',
              getFilter: filter => {
                district = filter;
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
                  placeholder={row?.district}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={district => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        district?.toUpperCase(),
                        column.dataField,
                        row?._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'city',
            text: 'City',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'City',
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
                <Form.Input
                  placeholder={row?.city}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={city => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        city?.toUpperCase(),
                        column.dataField,
                        row?._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'area',
            text: 'Area',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editorStyle: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
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
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Address',
              getFilter: filter => {
                address = filter;
              },
            }),
          },
          {
            dataField: 'mobileNo',
            text: 'Mobile No',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Mobile No',
              getFilter: filter => {
                mobileNo = filter;
              },
            }),
          },
          {
            dataField: 'contactNo',
            text: 'Contact No',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Contact No',
              getFilter: filter => {
                contactNo = filter;
              },
            }),
          },
          {
            dataField: 'email',
            text: 'Email',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Email',
              getFilter: filter => {
                email = filter;
              },
            }),
          },
          {
            dataField: 'web',
            text: 'Web',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Web',
              getFilter: filter => {
                web = filter;
              },
            }),
          },
          {
            dataField: 'webPortal',
            text: 'Web Portal',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Web Portal',
              getFilter: filter => {
                webPortal = filter;
              },
            }),
          },
          {
            dataField: 'registeredOffice',
            text: 'Registered Office',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Registered Office',
              getFilter: filter => {
                registeredOffice = filter;
              },
            }),
          },
          {
            dataField: 'corporateOffice',
            text: 'Corporate Office',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Corporate Office',
              getFilter: filter => {
                corporateOffice = filter;
              },
            }),
          },
          {
            dataField: 'customerCare',
            text: 'Customer Care',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Customer Care',
              getFilter: filter => {
                customerCare = filter;
              },
            }),
          },
          {
            dataField: 'gst',
            text: 'GST',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'GST',
              getFilter: filter => {
                gst = filter;
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
                  placeholder={row?.gst}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={gst => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        gst?.toUpperCase(),
                        column.dataField,
                        row?._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'sacCode',
            text: 'SAC Code',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'SAC Code',
              getFilter: filter => {
                sacCode = filter;
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
                  placeholder={row?.sacCode}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={sacCode => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        sacCode?.toUpperCase(),
                        column.dataField,
                        row?._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'cinNo',
            text: 'CIN No',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'CIN No',
              getFilter: filter => {
                cinNo = filter;
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
                  placeholder={row?.cinNo}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={cinNo => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        cinNo?.toUpperCase(),
                        column.dataField,
                        row?._id,
                      );
                  }}
                />
              </>
            ),
          },

          {
            dataField: 'companyLogo',
            text: 'Company Logo',
            csvExport: false,
            headerClasses: 'textHeader',
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return (
                <>
                  <img
                    src={row?.companyLogo}
                    alt={row?.code || row?._id}
                    className='object-fill h-35 w-40 rounded-md'
                  />
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
            dataField: 'fyiLine',
            text: 'FYI Line',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
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
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
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
              row?.dateCreation
                ? dayjs(row?.dateCreation)?.format('DD-MM-YYYY HH:mm:ss')
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
                <>{dayjs(row?.dateCreation)?.format('DD-MM-YYYY HH:mm:ss')}</>
              );
            },
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
              row?.dateActive
                ? dayjs(row?.dateActive)?.format('DD-MM-YYYY HH:mm:ss')
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
                <>{dayjs(row?.dateActive)?.format('DD-MM-YYYY HH:mm:ss')}</>
              );
            },
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
              row?.dateExpire
                ? dayjs(row?.dateExpire)?.format('DD-MM-YYYY HH:mm:ss')
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
                <>{dayjs(row?.dateExpire)?.format('DD-MM-YYYY HH:mm:ss')}</>
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
                  minDate={nextDay}
                  visible={true}
                  use12Hours={false}
                  data={row?.dateExpire}
                  isSingleDatePicker={true}
                  isDateTimePicker={false}
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
            dataField: 'enteredBy',
            text: 'Entered By',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Entered By',
              getFilter: filter => {
                enteredBy = filter;
              },
            }),
          },
          {
            dataField: 'version',
            text: 'Version',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              getFilter: filter => {
                version = filter;
              },
            }),
          },
          {
            dataField: 'supportPlan',
            text: 'Support Plan',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Support Plan',
              getFilter: filter => {
                supportPlan = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'status',
            text: 'Status',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Status',
              getFilter: filter => {
                status = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) =>
              row?.status == 'D' || row?.status == 'I' ? false : true,
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
                  value={row?.status}
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                  }
                  onChange={e => {
                    const status = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(status, column.dataField, row?._id);
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
            headerClasses: 'textHeader',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => false,
            sortCaret: (order, column) => sortCaret(order, column),
            formatter: (cell, row) => {
              return <>{row?.environment?.join(',')}</>;
            },
            filter: textFilter({
              placeholder: 'Environment',
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
                <MultiSelect
                  options={lookupItems(
                    props.extraData.lookupItems,
                    'ENVIRONMENT',
                  ).map(item => item.code)}
                  selectedItems={row?.environment}
                  onSelect={environment => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        environment,
                        column.dataField,
                        row?._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'operation',
            text: 'Action',
            editable: false,
            csvExport: false,
            // hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                {row.code != 'COMP0001' && (
                  <div className='flex flex-row'>
                    {props.isDelete && (
                      <Tooltip tooltipText='Delete'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() =>
                            props.onDelete &&
                            props.onDelete({
                              type: 'delete',
                              show: true,
                              id: [row?._id],
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
                      </>
                    )}
                  </div>
                )}
              </>
            ),
            headerClasses: 'sticky right-0  bg-gray-500 text-white z-50',
            classes: (cell, row, rowIndex, colIndex) => {
              return 'sticky right-0 bg-gray-500 ';
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
        fileName='Company'
        onSelectedRow={rows => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id));
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          console.log({ value });

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
          description('');
          moduleInfo('');
          admin('');
          password('');
          postalCode('');
          country('');
          state('');
          district('');
          city('');
          area('');
          address('');
          mobileNo('');
          contactNo('');
          email('');
          web('');
          webPortal('');
          registeredOffice('');
          corporateOffice('');
          customerCare('');
          gst('');
          sacCode('');
          cinNo('');
          fyiLine('');
          workLine('');
          dateCreation('');
          dateActive('');
          dateExpire('');
          enteredBy('');
          version('');
          status('');
          environment('');
        }}
        dynamicStylingFields={dynamicStylingFields}
        hideExcelSheet={hideExcelSheet}
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
          props.onUpdateFields &&
            props.onUpdateFields({ ...finalData }, modalPostalCodeUpdate.id);
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
};
