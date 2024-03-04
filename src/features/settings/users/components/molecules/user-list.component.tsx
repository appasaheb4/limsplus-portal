import React, { useState } from 'react';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { FormHelper } from '@/helper';
import {
  Svg,
  NumberFilter,
  DateRangeFilter,
  textFilter,
  TableBootstrap,
  Icons,
  Tooltip,
  Form,
  customFilter,
  Buttons,
  sortCaret,
  ModalDateTime,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { AutoCompleteCompanyList } from '@/core-components';
import {
  AutoCompleteFilterMutiSelectRoles,
  AutoCompleteFilterSingleSelectDegnisation,
  AutoCompleteFilterMutiSelectCorporateClient,
  AutoCompleteFilterMutiSelectRegistrationLocation,
  AutoCompleteFilterMultiSelectDoctors,
  AutoCompleteReportingTo,
  ModalDefaultLabDeptUpdate,
  ModalDefaultLabDeptUpdateProps,
} from '..';

let userId;
let empCode;
let defaultLab;
let userModule;
let lab;
let deginisation;
let fullName;
let mobileNo;
let contactNo;
let email;
let dateOfBirth;
let marriageAnniversary;
let userDegree;
let defaultDepartment;
let dateActive;
let department;
let reportingTo;
let exipreDate;
let dateOfEntry;
let role;
let validationLevel;
let createdBy;
let userGroup;
let version;
let companyCode;
let status;
let environment;

interface UserListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isVersionUpgrade?: boolean;
  isDuplicate?: boolean;
  role: string;
  onDelete?: (selectedUser: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onUpdateImage?: (value: any, dataField: string, id: string) => void;
  onChangePassword?: (id: string, userId: string, email: string) => void;
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
  reSendPassword: (details: any) => void;
  onSingleDirectUpdateField?: (
    value: any,
    dataField: string,
    id: string,
  ) => void;
  hideAddUser: boolean;
  setHideAddUser: any;
}

export const UserList = (props: UserListProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [modalDefaultLabDeptUpdate, setModalDefaultLabDeptUpdate] =
    useState<ModalDefaultLabDeptUpdateProps>({ show: false });
  const [modalDetails, setModalDetails] = useState<any>();

  const editorCell = (row: any) => {
    if (props?.role === 'SYSADMIN' && row.status !== 'I') return true;
    return row.status !== 'I' ? true : false;
  };
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
              dataField: 'userId',
              text: 'UserId',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  userId = filter;
                },
              }),
              headerClasses: 'textHeader2',
              editable: false,
            },
            {
              dataField: 'fullName',
              text: 'Full Name',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  fullName = filter;
                },
              }),
              headerClasses: 'textHeader2',
              style: { textTransform: 'uppercase' },
              editorStyle: { textTransform: 'uppercase' },
            },
            {
              dataField: 'userModule',
              text: 'User Module',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sort: true,
              csvFormatter: col => (col ? col : ''),
              headerClasses: 'textHeader2',
              filter: textFilter({
                getFilter: filter => {
                  userModule = filter;
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
                    value={row?.userModule}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const userModule = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          userModule,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.userModule?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'role',
              text: 'Role',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.role.map(item => item.code)}`,
              filter: textFilter({
                getFilter: filter => {
                  role = filter;
                },
              }),
              headerClasses: 'textHeader2',
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: 'inside' }}>
                    {row.role.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
                </>
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
                  <AutoCompleteFilterMutiSelectRoles
                    selected={row.role}
                    onUpdate={items => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'userGroup',
              text: 'User Group',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  userGroup = filter;
                },
              }),
              headerClasses: 'textHeader2',
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
                    value={row?.userGroup}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const userGroup = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          userGroup,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'USER_GROUP').map(
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
              dataField: 'empCode',
              text: 'Emp Code',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  empCode = filter;
                },
              }),
              headerClasses: 'textHeader2',
              editable: false,
            },
            {
              dataField: 'reportingTo',
              text: 'Reporting To',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              filter: textFilter({
                getFilter: filter => {
                  reportingTo = filter;
                },
              }),
              headerClasses: 'textHeader2',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteReportingTo
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.empCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'deginisation',
              text: 'Deginisation',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  deginisation = filter;
                },
              }),
              headerClasses: 'textHeader2',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectDegnisation
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.code,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'userDegree',
              text: 'User Degree',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  userDegree = filter;
                },
              }),
              headerClasses: 'textHeader2',
            },

            {
              dataField: 'defaultLab',
              text: 'Default Lab',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  defaultLab = filter;
                },
              }),
              headerClasses: 'textHeader2',
              formatter: (cellContent, row) => <span>{row.defaultLab}</span>,
              events: {
                onDoubleClick: (
                  e: any,
                  row: any,
                  rowIndex: any,
                  column: any,
                  columnIndex: any,
                ) => {
                  if (row.dataField === 'defaultLab') {
                    setModalDefaultLabDeptUpdate({
                      show: true,
                      id: column._id,
                      type: 'default',
                    });
                  }
                },
              },
            },
            {
              dataField: 'defaultDepartment',
              text: 'Default Department',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  defaultDepartment = filter;
                },
              }),
              formatter: (cellContent, row) => (
                <span>{row.defaultDepartment}</span>
              ),
              events: {
                onDoubleClick: (
                  e: any,
                  row: any,
                  rowIndex: any,
                  column: any,
                  columnIndex: any,
                ) => {
                  if (row.dataField === 'defaultLab') {
                    setModalDefaultLabDeptUpdate({
                      show: true,
                      id: column._id,
                      type: 'default',
                    });
                  }
                },
              },
              headerClasses: 'textHeader5',
            },

            {
              dataField: 'corporateClient',
              text: 'Corporate Client',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.corporateClient.map(item => item.name)}`,
              headerClasses: 'textHeader5',
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: 'inside' }}>
                    {row?.corporateClient?.map((item, index) => (
                      <li key={index}>{item.corporateCode}</li>
                    ))}
                  </ul>
                </>
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
                  <AutoCompleteFilterMutiSelectCorporateClient
                    selected={row.corporateClient}
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.corporateClient,
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
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.registrationLocation?.map(item => item.name)}`,
              headerClasses: 'textHeader5',
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: 'inside' }}>
                    {row?.registrationLocation?.map((item, index) => (
                      <li key={index}>{item.locationCode}</li>
                    ))}
                  </ul>
                </>
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
                  <AutoCompleteFilterMutiSelectRegistrationLocation
                    selected={row.registrationLocation}
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.registrationLocation,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'doctors',
              text: 'Doctors',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.doctors?.map(item => item.doctorCode)}`,
              headerClasses: 'textHeader5',
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: 'inside' }}>
                    {row?.doctors?.map((item, index) => (
                      <li key={index}>{item.doctorCode}</li>
                    ))}
                  </ul>
                </>
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
                  <AutoCompleteFilterMultiSelectDoctors
                    selected={row.doctors}
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.doctors,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },

            {
              dataField: 'lab',
              text: 'Assigned Lab',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.lab.map(item => item.name)}`,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              filter: textFilter({
                getFilter: filter => {
                  lab = filter;
                },
              }),
              headerClasses: 'textHeader5',
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: 'inside' }}>
                    {row?.lab.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
                </>
              ),
              events: {
                onDoubleClick: (
                  e: any,
                  row: any,
                  rowIndex: any,
                  column: any,
                  columnIndex: any,
                ) => {
                  if (row.dataField === 'lab') {
                    setModalDefaultLabDeptUpdate({
                      show: true,
                      id: column._id,
                      type: 'assigned',
                    });
                  }
                },
              },
            },
            {
              dataField: 'department',
              text: 'Assigned Department',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.department.map(item => item.name)}`,
              filter: textFilter({
                getFilter: filter => {
                  department = filter;
                },
              }),
              headerClasses: 'textHeader5',
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: 'inside' }}>
                    {row.department.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
                </>
              ),
              events: {
                onDoubleClick: (
                  e: any,
                  row: any,
                  rowIndex: any,
                  column: any,
                  columnIndex: any,
                ) => {
                  if (row.dataField === 'department') {
                    setModalDefaultLabDeptUpdate({
                      show: true,
                      id: column._id,
                      type: 'assigned',
                    });
                  }
                },
              },
            },
            {
              dataField: 'mobileNo',
              text: 'Mobile No',
              sort: true,
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
              headerClasses: 'textHeader2',
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
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        placeholder={
                          errors.mobileNo
                            ? 'Please enter mobile no'
                            : 'Mobile No'
                        }
                        pattern={FormHelper.patterns.mobileNo}
                        type='number'
                        hasError={!!errors.mobileNo}
                        defaultValue={row?.mobileNo}
                        onChange={mobileNo => {
                          onChange(mobileNo);
                        }}
                        onBlur={mobileNo => {
                          props.onUpdateItem &&
                            props.onUpdateItem(mobileNo, 'mobileNo', row._id);
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
              sort: true,
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
              headerClasses: 'textHeader2',
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
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        type='number'
                        placeholder={
                          errors.contactNo
                            ? 'Please enter contact no'
                            : 'Contact No'
                        }
                        pattern={FormHelper.patterns.mobileNo}
                        hasError={!!errors.contactNo}
                        defaultValue={row?.contactNo}
                        onChange={contactNo => {
                          onChange(contactNo);
                        }}
                        onBlur={contactNo => {
                          props.onUpdateItem &&
                            props.onUpdateItem(contactNo, 'contactNo', row._id);
                        }}
                      />
                    )}
                    name='contactNo'
                    rules={{
                      required: false,
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
              sort: true,
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
              headerClasses: 'textHeader2',
            },
            {
              dataField: 'signature',
              text: 'Signature',
              csvExport: false,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.signature}
                      alt='signature'
                      className='object-cover h-20 w-20 rounded-md'
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
                    onChange={async e => {
                      const signature = e.target.files[0];
                      props.onUpdateFields &&
                        props.onUpdateFields(
                          {
                            signature,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'picture',
              text: 'Picture',
              csvExport: false,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.picture}
                      className='object-cover h-20 w-20 rounded-md'
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
                    onChange={e => {
                      const picture = e.target.files[0];
                      props.onUpdateImage &&
                        props.onUpdateImage(picture, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'validationLevel',
              text: 'Validation Level',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  validationLevel = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: 'textHeader7',
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
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 border-gray-300 rounded-md'
                    }
                    onChange={e => {
                      const validationLevel = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          Number.parseInt(validationLevel),
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
                      <option key={item.description} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'dateOfBirth',
              text: 'Birth Date',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (col, row) =>
                row.dateOfBirth
                  ? dayjs(row.dateOfBirth).format('DD-MM-YYYY')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateOfBirth = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: 'textHeade',
              formatter: (cell, row) => {
                return dayjs(row.dateOfBirth).format('DD-MM-YYYY');
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
                      use12Hours: true,
                      data: row.dateOfBirth,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    onUpdate={dateOfBirth => {
                      setModalDetails({ visible: false });
                      props.onSingleDirectUpdateField &&
                        props.onSingleDirectUpdateField(
                          dateOfBirth,
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
              dataField: 'marriageAnniversary',
              text: 'Marriage Anniversary',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (col, row) =>
                row.marriageAnniversary
                  ? dayjs(row.marriageAnniversary).format('DD-MM-YYYY')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  marriageAnniversary = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: 'textHeader',
              formatter: (cell, row) => {
                return dayjs(row.marriageAnniversary).format('DD-MM-YYYY');
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
                      use12Hours: true,
                      data: row.marriageAnniversary,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    onUpdate={dateExpire => {
                      setModalDetails({ visible: false });
                      props.onSingleDirectUpdateField &&
                        props.onSingleDirectUpdateField(
                          marriageAnniversary,
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
              text: 'Expiry Date',
              dataField: 'exipreDate',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: (col, row) =>
                row.exipreDate
                  ? dayjs(row.exipreDate).format('DD-MM-YYYY HH:mm:ss')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  exipreDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: 'textHeader',
              formatter: (cell, row) => {
                return dayjs(row.exipreDate).format('DD-MM-YYYY HH:mm:ss');
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
                      data: row.exipreDate,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    minDate={nextDay}
                    onUpdate={exipreDate => {
                      setModalDetails({ visible: false });
                      props.onSingleDirectUpdateField &&
                        props.onSingleDirectUpdateField(
                          exipreDate,
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
              dataField: 'confidential',
              text: 'Confidential',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.confidential ? (row.confidential ? 'Yes' : 'No') : 'No'
                }`,
              formatter: (cellContent, row) => (
                <>
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
              ),
            },
            {
              dataField: 'confirguration',
              text: 'Confirguration',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.confirguration
                    ? row.confirguration
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cellContent, row) => (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.confirguration}
                    onChange={confirguration => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          confirguration,
                          'confirguration',
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'systemInfo.accessInfo.mobile',
              text: 'Mobile Access Permission',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={
                        row.systemInfo &&
                        row.systemInfo?.accessInfo &&
                        row.systemInfo?.accessInfo?.mobile
                      }
                      onChange={mobile => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {
                              ...row.systemInfo,
                              accessInfo: {
                                ...row.systemInfo?.accessInfo,
                                mobile,
                              },
                            },
                            'systemInfo',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'systemInfo.accessInfo.desktop',
              text: 'Desktop Access Permission',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={
                        row.systemInfo &&
                        row.systemInfo?.accessInfo &&
                        row.systemInfo?.accessInfo?.desktop
                      }
                      onChange={desktop => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {
                              ...row.systemInfo,
                              accessInfo: {
                                ...row.systemInfo?.accessInfo,
                                desktop,
                              },
                            },
                            'systemInfo',
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
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateOfEntry
                  ? dayjs(row.dateOfEntry).format('DD-MM-YYYY HH:mm:ss')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateOfEntry = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: 'textHeader',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>{dayjs(row.dateOfEntry).format('DD-MM-YYYY HH:mm:ss')}</>
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
                    value={new Date(row.dateOfEntry)}
                    onFocusRemove={dateOfEntry => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          new Date(dateOfEntry),
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
                    {dayjs(row.dateActive || 0).format('DD-MM-YYYY HH:mm:ss')}
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
                        props.onUpdateItem(
                          dateActive,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'createdBy',
              text: 'Created By',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  createdBy = filter;
                },
              }),
              headerClasses: 'textHeader2',
              editable: false,
            },

            {
              text: 'Status',
              dataField: 'status',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  status = filter;
                },
              }),
              headerClasses: 'textHeader2',
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
              dataField: 'environment',
              text: 'Environment',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  environment = filter;
                },
              }),
              headerClasses: 'textHeader2',
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
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
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
                    {props.extraData.environment?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ),
                    )}
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteCompanyList
                    isLabel={false}
                    hasError={false}
                    onSelect={companyCode => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          companyCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'opration',
              headerClasses: 'textHeaderA',
              text: 'Password Re-Send',
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <Buttons.Button
                    size='small'
                    type='outline'
                    icon={Svg.ReSendPassword}
                    onClick={async () => {
                      props.reSendPassword({
                        userId: row.userId,
                        // lab: row.lab[0].code,
                        // role: row.role[0].code,
                        email: row.email,
                      });
                    }}
                  >
                    Send
                  </Buttons.Button>
                </>
              ),
            },
            {
              dataField: 'opration',
              text: 'Change Password',
              csvExport: false,
              editable: false,
              formatter: (cellContent, row) => (
                <>
                  <Buttons.Button
                    size='small'
                    type='outline'
                    icon={Svg.ReSendPassword}
                    onClick={() => {
                      props.onChangePassword &&
                        props.onChangePassword(row._id, row.userId, row.email);
                    }}
                  >
                    Change Password
                  </Buttons.Button>
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

                    {row?.status == 'A' && (
                      <>
                        {props.isVersionUpgrade && (
                          <Tooltip
                            className='ml-2'
                            tooltipText='Version Upgrade'
                          >
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
                          <Tooltip className='ml-2' tooltipText='Duplicate'>
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
          fileName='User'
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
            userId('');
            empCode('');
            defaultLab('');
            userModule('');
            lab('');
            deginisation('');
            reportingTo('');
            fullName('');
            mobileNo('');
            contactNo('');
            email('');
            dateOfBirth();
            userGroup('');
            dateOfEntry();
            marriageAnniversary();
            userDegree('');
            defaultDepartment('');
            exipreDate();
            role('');
            version('');
            dateActive();
            validationLevel('');
            department('');
            createdBy('');
            status('');
            environment('');
          }}
          dynamicStylingFields={[
            'defaultLab',
            'defaultDepartment',
            'userGroup',
            'userModule',
            'userId',
            'fullName',
            'empCode',
            'deginisation',
            'role',
            'lab',
            'department',
            'mobileNo',
            'email',
            'dateOfBirth',
            'exipreDate',
            'environment',
            'status',
          ]}
          hideExcelSheet={[
            '_id',
            'signature',
            'picture',
            'opration',
            'sessionAllowedCount',
            'passwordHistory',
            'passChanged',
          ]}
          isHideForm={props.hideAddUser}
          setHideForm={props.setHideAddUser}
        />
        <ModalDefaultLabDeptUpdate
          {...modalDefaultLabDeptUpdate}
          onClose={() => {
            setModalDefaultLabDeptUpdate({ show: false });
          }}
        />
      </div>
    </>
  );
};
