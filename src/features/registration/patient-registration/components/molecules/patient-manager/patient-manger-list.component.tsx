import React from 'react';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  TableBootstrap,
  NumberFilter,
  DateFilter,
  textFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {FormHelper} from '@/helper';
import {useForm, Controller} from 'react-hook-form';
import {
  dateAvailableUnits,
  getDiffByDate,
  getAgeByAgeObject,
} from '../../../utils';

interface PatientMangerProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
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
export const PatientMangerList = observer((props: PatientMangerProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const editorCell = (row: any) => {
    if (row.status === 'I') return false;
    if (row.extraData?.confidental && !props.extraData.confidental)
      return false;
    return true;
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
              dataField: 'pId',
              text: 'Pid',
              headerClasses: 'textHeader3',
              sort: true,
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
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
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
                      : row.mobileNo}
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
                    render={({field: {onChange}}) => (
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
              headerClasses: 'textHeader11',
              sort: true,
              csvFormatter: (col, row) =>
                row.birthDate ? dayjs(row.birthDate).format('YYYY-MM-DD') : '',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              filter: customFilter({
                getFilter: filter => {
                  birthDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.birthDate).format('YYYY-MM-DD')}</>;
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
                    label=''
                    placeholder='BirthDate'
                    use12Hours={false}
                    // value={row?.birthDate}
                    onChange={birthDate => {
                      if (
                        dayjs(new Date()).diff(dayjs(birthDate), 'hour') > 0
                      ) {
                        props.onUpdateFileds &&
                          props.onUpdateFileds(
                            {
                              birthDate,
                              actualDOB: true,
                              age:
                                getAgeByAgeObject(getDiffByDate(birthDate))
                                  .age || 0,
                              ageUnit: getAgeByAgeObject(
                                getDiffByDate(birthDate),
                              ).ageUnit,
                            },
                            row._id,
                          );
                      } else {
                        alert('Please select correct birth date!!');
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'age',
              text: 'Age',
              headerClasses: 'textHeader',
              sort: true,
              csvFormatter: col => (col ? col : ''),
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
                  <Form.Input
                    label=''
                    placeholder={'Age'}
                    type='number'
                    onBlur={age => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            age: Number.parseInt(age),
                            actualDOB: false,
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
              headerClasses: 'textHeader',
              sort: true,
              csvFormatter: col => (col ? col : ''),
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
                      'leading-4 p-2 mt-4 h-11 focus:outline-none focus:ring block w-20 shadow-sm sm:text-base border-2 border-gray-300 rounded-md'
                    }
                    value={row?.ageUnit}
                    onChange={e => {
                      const ageUnit = e.target.value as any;
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            ageUnit,
                            actualDOB: false,
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
                    <option selected>Select</option>
                    {[
                      {title: 'year', value: 'Y'},
                      {title: 'month', value: 'M'},
                      {title: 'week', value: 'W'},
                      {title: 'day', value: 'D'},
                      {title: 'hour', value: 'H'},
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
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
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
                        props.onUpdateFileds({title, sex}, row._id);
                    }}
                  >
                    <option selected>Select</option>
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
              dataField: 'firstName',
              text: 'First Name',
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
                getFilter: filter => {
                  firstName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? 'XXXXXXXX'
                      : row.firstName}
                  </>
                );
              },
            },
            {
              dataField: 'middleName',
              text: 'Middle Name',
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
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
                      : row.middleName}
                  </>
                );
              },
            },
            {
              dataField: 'lastName',
              text: 'Last Name',
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? 'XXXXXXXX'
                    : col
                  : '',
              filter: textFilter({
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
                      : row.lastName}
                  </>
                );
              },
            },
            {
              dataField: 'sex',
              text: 'Sex',
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
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
                    <option selected>Select</option>
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
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
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
                    <option selected>Select</option>
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
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
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
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
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
                    <option selected>Select</option>
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
              headerClasses: 'textHeader3',
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
              headerClasses: 'textHeader3',
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
          }}
        />
      </div>
    </>
  );
});
