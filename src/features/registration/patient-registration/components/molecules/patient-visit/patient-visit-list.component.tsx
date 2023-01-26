import React from 'react';
import dayjs from 'dayjs';
import {observer} from 'mobx-react';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  NumberFilter,
  DateFilter,
  customFilter,
  textFilter,
  TableBootstrap,
  Form,
  Tooltip,
  Icons,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
// import { NumberFilter, DateFilter } from "@/library/components/Organisms"
import {
  AutoCompleteFilterSingleSelectCollectionCenter,
  AutoCompleteFilterSingleSelectCorporateCode,
  AutoCompleteFilterSingleSelectDoctorId,
} from '../../index';

interface DeleteExtraParams extends Confirm {
  labId?: Array<number>;
}
interface PatientVisitProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: DeleteExtraParams) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFields?: (fileds: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}
let labId;
let pId;
let rLab;
let visitId;
let dateVisit;
let registrationDate;
let collectionDate;
let dueDate;
let birthDate;
let age;
let ageUnits;
let collectionCenter;
let corporateCode;
let acClass;
let doctorId;
let doctorName;
let reportPriority;
let holdReason;
let status;

export const PatientVisitList = observer((props: PatientVisitProps) => {
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
              dataField: 'labId',
              text: 'Lab Id',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  labId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: 'externalLabId',
              text: 'External Lab Id',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: (col, row) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return <>{row.extraData.externalLabId}</>;
              },
            },
            {
              dataField: 'pId',
              text: 'Pid',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
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
              dataField: 'rLab',
              text: 'Rlab',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  rLab = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'visitId',
              text: 'Visit Id',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  visitId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: 'visitDate',
              text: 'Visit Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.visitDate ? dayjs(row.visitDate).format('YYYY-MM-DD') : '',
              filter: customFilter({
                getFilter: filter => {
                  dateVisit = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.visitDate).format('YYYY-MM-DD')}</>;
              },
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
                  <Form.InputDateTime
                    value={new Date(row.visitDate)}
                    onFocusRemove={visitDate => {
                      props.onUpdateItem &&
                        props.onUpdateItem(visitDate, 'visitDate', row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'registrationDate',
              text: 'Registration Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.registrationDate
                  ? dayjs(row.registrationDate).format('YYYY-MM-DD')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  registrationDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.registrationDate).format('YYYY-MM-DD')}</>;
              },
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
                  <Form.InputDateTime
                    value={new Date(row.registrationDate)}
                    onFocusRemove={registrationDate => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          registrationDate,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'collectionDate',
              text: 'Collection Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.collectionDate
                  ? dayjs(row.collectionDate).format('YYYY-MM-DD')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  collectionDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.collectionDate).format('YYYY-MM-DD')}</>;
              },
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
                  <Form.InputDateTime
                    value={new Date(row.collectionDate)}
                    onFocusRemove={collectionDate => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          collectionDate,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'dueDate',
              text: 'Due Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dueDate ? dayjs(row.dueDate).format('YYYY-MM-DD') : '',
              filter: customFilter({
                getFilter: filter => {
                  dueDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.dueDate
                      ? dayjs(row?.dueDate).format('YYYY-MM-DD')
                      : ''}
                  </>
                );
              },
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
                  <Form.InputDateTime
                    onFocusRemove={dueDate => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dueDate, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'birthDate',
              text: 'Birth Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.birthDate ? dayjs(row.birthDate).format('YYYY-MM-DD') : '',
              filter: customFilter({
                getFilter: filter => {
                  birthDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.birthDate
                      ? dayjs(row?.birthDate).format('YYYY-MM-DD')
                      : ''}
                  </>
                );
              },
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
                  <Form.InputDateTime
                    value={new Date(row.birthDate)}
                    onFocusRemove={birthDate => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          birthDate,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'age',
              text: 'Age',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  age = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: 'ageUnits',
              text: 'Age Units',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  ageUnits = filter;
                },
              }),
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
                    disabled={true}
                    value={row?.ageUnits}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const ageUnits = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(ageUnits, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PATIENT VISIT - AGE_UNITS',
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
              dataField: 'collectionCenter',
              text: 'Collection Center',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  collectionCenter = filter;
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
                  <AutoCompleteFilterSingleSelectCollectionCenter
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.locationCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'corporateCode',
              text: 'Corporate Code',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  corporateCode = filter;
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
                  <AutoCompleteFilterSingleSelectCorporateCode
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.corporateCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'acClass',
              text: 'AC Class',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  acClass = filter;
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
                    value={row?.acClass}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const acClass = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(acClass, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PATIENT VISIT - AC_CLASS',
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
              dataField: 'grossAmount',
              text: 'Gross Amount',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'netAmount',
              text: 'Net Amount',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'discountAmount',
              text: 'Discount Amount',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'discountPer',
              text: 'Discount Per',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'isNewDoctor',
              text: 'New Doctor',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.isNewDoctor ? (row.isNewDoctor ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isNewDoctor}
                      onChange={isNewDoctor => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            isNewDoctor,
                            'isNewDoctor',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'doctorId',
              text: 'Doctor Id',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  doctorId = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                row.isNewDoctor ? false : true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectDoctorId
                    onSelect={item => {
                      props.onUpdateFields &&
                        props.onUpdateFields(
                          {
                            doctorId: item.doctorCode,
                            doctorName: item.doctorName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'doctorName',
              text: 'Doctor Name',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  doctorName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                row.isNewDoctor ? true : false,
            },
            {
              dataField: 'doctorMobileNo',
              text: 'Doctor Mobile Number',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                row.isNewDoctor ? true : false,
            },
            {
              dataField: 'miscellaneousCharges',
              text: 'Miscellaneous Charges',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'miscCharges',
              text: 'Misc Charges',
              headerClasses: 'textHeader5',
              sort: true,
              csvFormatter: (col, row) => (col ? col : ''),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <div className='flex flex-row gap-2'>
                      {row?.miscCharges?.map(item => (
                        <span>
                          {item?.code + ' - ' + item?.amount?.toString()}
                        </span>
                      ))}
                    </div>
                  </>
                );
              },
            },
            {
              dataField: 'discountCharges',
              text: 'Other Charges',
              headerClasses: 'textHeader5',
              sort: true,
              csvFormatter: (col, row) => (col ? col : ''),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.discountCharges && (
                      <span>
                        {row?.discountCharges?.code +
                          ' - ' +
                          row?.discountCharges?.amount?.toString()}
                      </span>
                    )}
                  </>
                );
              },
            },

            {
              dataField: 'reportPriority',
              text: 'Report Priority',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  reportPriority = filter;
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
                    value={row.reportPriority}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const reportPriority = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          reportPriority,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PATIENT VISIT - REPORT_PRIORITY',
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
              dataField: 'resultDate',
              text: 'Result Date',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.resultDate
                      ? dayjs(row.resultDate).format('YYYY-MM-DD HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'history',
              text: 'History',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.history ? (row.history ? 'Yes' : 'No') : 'No'}`,
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
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },

            {
              dataField: 'holdReport',
              text: 'Hold Report',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.holdReport ? (row.holdReport ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.holdReport}
                      onChange={holdReport => {
                        props.onUpdateItem &&
                          props.onUpdateItem(holdReport, 'holdReport', row._id);
                      }}
                    />
                  </>
                );
              },
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },

            {
              dataField: 'holdReason',
              text: 'Hold Reason',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              filter: textFilter({
                getFilter: filter => {
                  holdReason = filter;
                },
              }),
            },
            {
              dataField: 'abnFlag',
              text: 'Abn Flag',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${row.abnFlag ? (row.abnFlag ? 'Yes' : 'No') : 'No'}`,
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
              editable: false,
              csvFormatter: (col, row) =>
                `${row.critical ? (row.critical ? 'Yes' : 'No') : 'No'}`,
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
              dataField: 'isPrintPrimaryBarcod',
              text: 'Print Primary Barcod',
              sort: true,
              editable: false,
              csvFormatter: (col, row) =>
                `${
                  row.isPrintPrimaryBarcod
                    ? row.isPrintPrimaryBarcod
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isPrintPrimaryBarcod}
                      onChange={isPrintPrimaryBarcod => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            isPrintPrimaryBarcod,
                            'isPrintPrimaryBarcod',
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
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) => (col ? col : false),
              filter: textFilter({
                getFilter: filter => {
                  status = filter;
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
                    value={row?.status}
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
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PATIENT VISIT - STATUS',
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
                            type: 'delete',
                            show: true,
                            id: [row._id],
                            labId: [row.labId],
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
          fileName='Patient Visit'
          onSelectedRow={rows => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item));
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
            labId('');
            pId('');
            rLab('');
            visitId('');
            dateVisit();
            registrationDate();
            collectionDate();
            dueDate();
            birthDate();
            age('');
            ageUnits('');
            collectionCenter('');
            corporateCode('');
            acClass('');
            doctorId('');
            doctorName('');
            reportPriority('');
            holdReason('');
            status('');
          }}
        />
      </div>
    </>
  );
});
