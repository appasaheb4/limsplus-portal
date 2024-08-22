import React, { useState } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  NumberFilter,
  DateRangeFilter,
  textFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
  sortCaret,
  ModalDateTime,
  Toast,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { FormHelper } from '@/helper';
import { useForm, Controller } from 'react-hook-form';
import { getDiffByDate, getAgeByAgeObject } from '../../../utils';
import { dateAvailableUnits } from '@/core-utils';
import { TiFlowChildren } from 'react-icons/ti';
import { ModalReportToMobilesModify } from './modal-report-to-mobiles-modify';
import { ModalReportToEmailsModify } from './modal-report-to-emails-modify';

interface PatientMangerProps {
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
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onDirectUpdateField?: (id: any, fileds: any) => void;
  hideInputView: boolean;
  setHideInputView: any;
  disabled: any;
}

let pId;
let mobileNo;
let birthDate;
let title;
let firstName;
let middleName;
let lastName;
let sex;
let species;
let breed;
let usualDoctor;
let companyCode;
let environment;
let email;

export const PatientMangerList = observer((props: PatientMangerProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [modalDetails, setModalDetails] = useState<any>();
  const [modalReportToMobilesModify, setModalReportToMobilesModify] =
    useState<any>({});
  const [modalReportToEmailsModify, setModalReportToEmailsModify] =
    useState<any>({});
  const editorCell = (row: any) => {
    if (row.status === 'I') return false;
    if (row.extraData?.confidental && !props.extraData.confidental)
      return false;
    return true;
  };

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          isPagination={false}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'pId',
              text: 'Pid',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: customFilter({
                getFilter: filter => {
                  pId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: 'isPatientMobileNo',
              text: 'Patient Mobile No',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.isPatientMobileNo
                    ? row.isPatientMobileNo
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isPatientMobileNo}
                      onChange={isPatientMobileNo => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            isPatientMobileNo,
                            'isPatientMobileNo',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'mobileNo',
              text: 'Mobile No',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
                placeholder: 'Mobile No',
                getFilter: filter => {
                  mobileNo = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? 'XXXXXXXX'
                      : row?.mobileNo || ''}
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
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        placeholder={
                          errors.mobileNo
                            ? 'Please Enter MobileNo'
                            : 'Mobile No'
                        }
                        hasError={!!errors.mobileNo}
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
              dataField: 'birthDate',
              text: 'Birthdate',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.birthDate ? dayjs(row.birthDate).format('YYYY-MM-DD') : '',
              filter: customFilter({
                getFilter: filter => {
                  birthDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              // editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.birthDate
                      ? dayjs(row?.birthDate).format('DD-MM-YYYY')
                      : ''}
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
                      data: row.birthDate,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    maxDate={new Date()}
                    onUpdate={birthDate => {
                      const selectedBirthDate = new Date(birthDate);
                      const currentDate = new Date();
                      if (selectedBirthDate < currentDate) {
                        setModalDetails({ visible: false });
                        if (
                          dayjs(new Date()).diff(dayjs(birthDate), 'hour') > 0
                        ) {
                          props.onDirectUpdateField &&
                            props.onDirectUpdateField(row._id, {
                              birthDate,
                              isBirthdateAvailabe: true,
                              age:
                                getAgeByAgeObject(getDiffByDate(birthDate))
                                  .age || 0,
                              ageUnit: getAgeByAgeObject(
                                getDiffByDate(birthDate),
                              ).ageUnit,
                            });
                        } else {
                          alert('Please select correct birth date!!');
                        }
                      } else {
                        Toast.error({
                          message:
                            'Birthdate should not be  grater then Curent Date',
                        });
                      }
                    }}
                    onClose={() => {
                      setModalDetails({ visible: false });
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'age',
              text: 'Age',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
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
                    label=''
                    placeholder={'Age'}
                    type='number'
                    onBlur={age => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            age: Number.parseInt(age),
                            isBirthdateAvailabe: false,
                            birthDate: new Date(
                              dayjs().add(
                                -age,
                                dateAvailableUnits(row?.ageUnit),
                              ) as any,
                            ),
                          },
                          row._id,
                        );
                    }}
                    defaultValue={row.age}
                  />
                </>
              ),
            },
            {
              dataField: 'ageUnit',
              text: 'Age Unit',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
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
                      'leading-4 p-2 mt-4 h-11 focus:outline-none focus:ring block w-20 shadow-sm sm:text-base border-2 border-gray-300 rounded-md'
                    }
                    value={row?.ageUnit}
                    onChange={e => {
                      const ageUnit = e.target.value as any;
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            ageUnit,
                            birthDate: new Date(
                              dayjs().add(
                                -row?.age,
                                dateAvailableUnits(ageUnit),
                              ) as any,
                            ),
                          },
                          row._id,
                        );
                    }}
                  >
                    <option>Select</option>
                    {[
                      { title: 'year', value: 'Y' },
                      { title: 'month', value: 'M' },
                      { title: 'week', value: 'W' },
                      { title: 'day', value: 'D' },
                      { title: 'hour', value: 'H' },
                    ].map((item: any, index: number) => (
                      <option key={index} value={item.value}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'isBirthdateAvailabe',
              text: 'Birthdate Availabe',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.isBirthdateAvailabe
                    ? row.isBirthdateAvailabe
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isBirthdateAvailabe}
                      onChange={isBirthdateAvailabe => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            isBirthdateAvailabe,
                            'isBirthdateAvailabe',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'title',
              text: 'Title',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Title',
                getFilter: filter => {
                  title = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                    }
                    onChange={e => {
                      const title = e.target.value;
                      const sex = lookupItems(
                        props.extraData?.lookupItems,
                        'PATIENT MANAGER - SEX_BY_TITLE',
                      )
                        .find(item => item.code === title)
                        ?.value?.split('-')[0];
                      props.onUpdateFileds &&
                        props.onUpdateFileds({ title, sex }, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PATIENT MANAGER - TITLE',
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
              dataField: 'email',
              text: 'Email',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.extraData.email ? row.extraData.email : '',
              filter: textFilter({
                placeholder: 'Email',
                getFilter: filter => {
                  email = filter;
                },
              }),
              formatter: (cell, row) => {
                return <span>{row.extraData.email}</span>;
              },
            },
            {
              dataField: 'firstName',
              text: 'First Name',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editorStyle: { textTransform: 'uppercase' },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
                placeholder: 'First Name',
                getFilter: filter => {
                  firstName = filter;
                },
              }),

              style: { textTransform: 'uppercase' },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? 'XXXXXXXX'
                      : row?.firstName || ''}
                  </>
                );
              },
            },
            {
              dataField: 'middleName',
              text: 'Middle Name',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editorStyle: { textTransform: 'uppercase' },
              style: { textTransform: 'uppercase' },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
                placeholder: 'Middle Name',
                getFilter: filter => {
                  middleName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? 'XXXXXXXX'
                      : row.middleName || ''}
                  </>
                );
              },
            },
            {
              dataField: 'lastName',
              text: 'Last Name',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editorStyle: { textTransform: 'uppercase' },
              style: { textTransform: 'uppercase' },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
                placeholder: 'Last Name',
                getFilter: filter => {
                  lastName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? 'XXXXXXXX'
                      : row.lastName || ''}
                  </>
                );
              },
            },
            {
              dataField: 'sex',
              text: 'Sex',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Sex',
                getFilter: filter => {
                  sex = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    <option>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PATIENT MANAGER - SEX',
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
              dataField: 'species',
              text: 'Species',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Species',
                getFilter: filter => {
                  species = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                      const species = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(species, column.dataField, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PATIENT MANAGER - SPECIES',
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
              dataField: 'breed',
              text: 'Breed',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Breed',
                getFilter: filter => {
                  breed = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'usualDoctor',
              text: 'Usual Doctor',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Usual Doctor',
                getFilter: filter => {
                  usualDoctor = filter;
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
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const usualDoctor = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          usualDoctor,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option>Select</option>
                    {props.extraData.listDoctors.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.doctorCode}>
                          {`${item.doctorName} - ${item.doctorCode}`}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'diagnosis',
              text: 'Diagnosis',
              headerClasses: 'textHeader1',
              sort: true,
              csvFormatter: (col, row) =>
                row.extraData?.diagnosis ? row.extraData?.diagnosis : '',
              formatter: (cell, row) => {
                return <span>{row.extraData?.diagnosis}</span>;
              },
              editable: (content, row, rowIndex, columnIndex) =>
                row?.history ? true : false,
            },
            {
              dataField: 'disease',
              text: 'Disease',
              headerClasses: 'textHeader1',
              sort: true,
              csvFormatter: (col, row) =>
                row.extraData?.disease ? row.extraData?.disease : '',
              formatter: (cell, row) => {
                return <span>{row.extraData?.disease}</span>;
              },
              editable: (content, row, rowIndex, columnIndex) =>
                row?.history ? true : false,
            },
            {
              dataField: 'history',
              text: 'Histroy',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.history ? (row.history ? 'Yes' : 'No') : 'No'}`,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.history}
                      onChange={history => {
                        props.onUpdateItem &&
                          props.onUpdateItem(history, 'history', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'isVIP',
              text: 'VIP',
              sort: true,
              csvFormatter: (col, row) =>
                `${row?.isVIP ? (row?.isVIP ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row?.isVIP}
                      onChange={isVIP => {
                        props.onUpdateItem &&
                          props.onUpdateItem(isVIP, 'isVIP', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'isCopyDoctor',
              text: 'Copy To Doctor',
              sort: true,
              csvFormatter: (col, row) =>
                `${row?.isVIP ? (row?.isVIP ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row?.isCopyDoctor}
                      onChange={isCopyDoctor => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            isCopyDoctor,
                            'isCopyDoctor',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'reportToMobiles',
              text: 'Report To Mobiles',
              headerClasses: 'textHeader2',
              sort: true,
              editable: false,
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              formatter: (cell, row) => {
                return (
                  <div
                    className='flex items-center flex-row flex-wrap gap-2'
                    key={row?._id}
                  >
                    {row.status !== 'I' && (
                      <Tooltip tooltipText='Edit'>
                        <Icons.IconContext
                          color='#000000'
                          size='20'
                          onClick={() => {
                            setModalReportToMobilesModify({
                              show: true,
                              arrValues: row?.reportToMobiles,
                              _id: row?._id,
                            });
                          }}
                        >
                          {Icons.getIconTag(Icons.IconBi.BiEdit)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    {row?.reportToMobiles?.length > 0 &&
                      row?.reportToMobiles?.map((item, index) => (
                        <span
                          key={index}
                          className='flex p-2 rounded-sm bg-blue-800 text-white'
                        >
                          {item?.name + ' - ' + item?.mobileNo}
                        </span>
                      ))}
                  </div>
                );
              },
            },
            {
              dataField: 'reportToEmails',
              text: 'Report To Emails',
              headerClasses: 'textHeader2',
              sort: true,
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              formatter: (cell, row) => {
                return (
                  <div className='flex flex-row flex-wrap gap-2'>
                    {row.status !== 'I' && (
                      <Tooltip tooltipText='Edit'>
                        <Icons.IconContext
                          color='#000000'
                          size='20'
                          onClick={() => {
                            setModalReportToEmailsModify({
                              show: true,
                              arrValues: row?.reportToEmails,
                              _id: row?._id,
                            });
                          }}
                        >
                          {Icons.getIconTag(Icons.IconBi.BiEdit)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    {row.reportToEmails?.length > 0 &&
                      row.reportToEmails?.map((item, index) => (
                        <span
                          key={index}
                          className='flex p-2 rounded-sm bg-blue-800 text-white'
                        >
                          {item?.name + ' - ' + item?.email}
                        </span>
                      ))}
                  </div>
                );
              },
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
            },
            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader1',
              editable: false,
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.environment ? row.environment : '',
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
              // hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row gap-2'>
                    <Tooltip tooltipText='Traceability'>
                      <TiFlowChildren color='#ffffff' size='20' />
                    </Tooltip>
                    {props.isDelete && (
                      <Tooltip tooltipText='Delete'>
                        <Icons.IconContext
                          color='#ffffff'
                          size='20'
                          onClick={() =>
                            props.onDelete &&
                            props.onDelete({
                              type: 'delete',
                              show: true,
                              id: [row._id],
                              title: 'Are you sure?',
                              body: 'Delete record',
                            })
                          }
                        >
                          {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                        </Icons.IconContext>
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
          dynamicStylingFields={[]}
          hideExcelSheet={['opration', '_id']}
          isSelectRow={true}
          fileName='Patient Manager'
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
            pId('');
            mobileNo('');
            title('');
            firstName('');
            lastName('');
            middleName('');
            sex('');
            species('');
            breed('');
            usualDoctor('');
            birthDate();
            companyCode('');
            environment('');
          }}
          isHideForm={props.hideInputView}
          setHideForm={props.setHideInputView}
          circleButtonDisable={props.disabled}
        />
      </div>
      <ModalReportToMobilesModify
        {...modalReportToMobilesModify}
        onClick={items => {
          setModalReportToMobilesModify({
            show: false,
          });
          props.onUpdateItem &&
            props.onUpdateItem(
              items?.arrValues,
              'reportToMobiles',
              modalReportToMobilesModify?._id,
            );
        }}
        onClose={() => {
          setModalReportToMobilesModify({
            show: false,
          });
        }}
      />
      <ModalReportToEmailsModify
        {...modalReportToEmailsModify}
        onClick={items => {
          setModalReportToEmailsModify({
            show: false,
          });
          props.onUpdateItem &&
            props.onUpdateItem(
              items?.arrValues,
              'reportToEmails',
              modalReportToEmailsModify?._id,
            );
        }}
        onClose={() => {
          setModalReportToEmailsModify({
            show: false,
          });
        }}
      />
    </>
  );
});
