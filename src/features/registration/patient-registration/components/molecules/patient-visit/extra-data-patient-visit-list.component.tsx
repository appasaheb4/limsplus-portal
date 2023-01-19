import React from 'react';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
import {
  DateFilter,
  textFilter,
  TableBootstrap,
  customFilter,
  Form,
  Icons,
  Tooltip,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {lookupItems, lookupValue} from '@/library/utils';
// import { NumberFilter, DateFilter } from "@/library/components/Organisms"
let additionalInfo;
let invoiceAc;
let billingMethod;
let billNumber;
let methodCollection;
let collectedBy;
let receivedDate;
let resultDate;
let approvalDate;
let approvalStatus;
let reportStatus;
let reportedDate;
let enteredBy;
let height;
let weight;
let archieve;
let loginInterface;
let registrationInterface;
let submittingSystem;
let submittindOn;
let accountType;
let deliveryMode;
let environment;
interface ExtraDataPatientVisitProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const ExtraDataPatientVisitList = observer(
  (props: ExtraDataPatientVisitProps) => {
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
                dataField: 'additionalInfo',
                text: 'Additional Information',
                headerClasses: 'textHeader5',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.additionalInfo
                    ? row.extraData.additionalInfo
                    : '',
                filter: textFilter({
                  getFilter: filter => {
                    additionalInfo = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.additionalInfo}</>;
                },
              },
              {
                dataField: 'invoiceAc',
                text: 'Invoice Ac',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.invoiceAc ? row.extraData.invoiceAc : '',
                filter: textFilter({
                  getFilter: filter => {
                    invoiceAc = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.invoiceAc}</>;
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
                    {row.extraData?.invoiceAc && (
                      <select
                        className={
                          'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                        }
                        disabled={true}
                        value={row.extraData?.invoiceAc}
                        onChange={e => {
                          const invoice = e.target.value;
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              invoice,
                              column.dataField,
                              row._id,
                            );
                        }}
                      >
                        <option selected>Select</option>
                        {props.extraData.listCorporateClients &&
                          props.extraData.listCorporateClients.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.invoiceAc}>
                                {`${item.invoiceAc}`}
                              </option>
                            ),
                          )}
                      </select>
                    )}
                  </>
                ),
              },
              {
                dataField: 'billingMethod',
                text: 'Billing Method',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.billingMethod
                    ? row.extraData.billingMethod
                    : '',
                filter: textFilter({
                  getFilter: filter => {
                    billingMethod = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.billingMethod}</>;
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
                      value={row.extraData?.billingMethod}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                      }
                      onChange={e => {
                        const billingMethod = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            billingMethod,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - BILLING_METHOD',
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
                dataField: 'billNumber',
                text: 'Bill Number',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.billNumber ? row.extraData.billNumber : '',
                filter: textFilter({
                  getFilter: filter => {
                    billNumber = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.billNumber}</>;
                },
              },
              {
                dataField: 'methodCollection',
                text: 'Method Collection',
                headerClasses: 'textHeader5',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.methodCollection
                    ? row.extraData.methodCollection
                    : '',
                filter: textFilter({
                  getFilter: filter => {
                    methodCollection = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.methodCollection}</>;
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
                      value={row.extraData?.methodCollection}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                      }
                      onChange={e => {
                        const methodCollection = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            methodCollection,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - METHOD_COLLECTION',
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
                dataField: 'collectedBy',
                text: 'Collection By',
                headerClasses: 'textHeader5',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.collectedBy ? row.extraData.collectedBy : '',
                filter: textFilter({
                  getFilter: filter => {
                    collectedBy = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.collectedBy}</>;
                },
              },
              {
                dataField: 'receivedDate',
                text: 'Received Date',
                headerClasses: 'textHeader11',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData.receivedDate
                    ? dayjs(row.extraData.receivedDate).format('YYYY-MM-DD')
                    : '',
                filter: customFilter({
                  getFilter: filter => {
                    receivedDate = filter;
                  },
                }),
                filterRenderer: (onFilter, column) => (
                  <DateFilter onFilter={onFilter} column={column} />
                ),
                formatter: (cell, row) => {
                  return (
                    <>
                      {dayjs(row.extraData.receivedDate).format('YYYY-MM-DD')}
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
                      // value={new Date(row.receivedDate)}
                      onFocusRemove={receivedDate => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            receivedDate,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'resultDate',
                text: 'Result Date',
                headerClasses: 'textHeader11',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.resultDate
                    ? dayjs(row.extraData?.resultDate).format('YYYY-MM-DD')
                    : '',
                filter: customFilter({
                  getFilter: filter => {
                    resultDate = filter;
                  },
                }),
                filterRenderer: (onFilter, column) => (
                  <DateFilter onFilter={onFilter} column={column} />
                ),
                formatter: (cell, row) => {
                  return (
                    <>{dayjs(row.extraData.resultDate).format('YYYY-MM-DD')}</>
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
                      onFocusRemove={resultDate => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            resultDate,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'urgent',
                text: 'Urgent',
                sort: true,
                csvFormatter: (col, row) =>
                  `${row.urgent ? (row.urgent ? 'Yes' : 'No') : 'No'}`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        value={row.extraData.urgent}
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
                dataField: 'confidental',
                text: 'Confidental',
                sort: true,
                csvFormatter: (col, row) =>
                  `${
                    row.confidental ? (row.confidental ? 'Yes' : 'No') : 'No'
                  }`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        value={row.extraData.confidental}
                        onChange={confidental => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              confidental,
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
                dataField: 'pendingDataEntry',
                text: 'Pending Data Entry',
                sort: true,
                csvFormatter: (col, row) =>
                  `${
                    row.pendingDataEntry
                      ? row.pendingDataEntry
                        ? 'Yes'
                        : 'No'
                      : 'No'
                  }`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        value={row.extraData.pendingDataEntry}
                        onChange={pendingDataEntry => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              pendingDataEntry,
                              'pendingDataEntry',
                              row._id,
                            );
                        }}
                      />
                    </>
                  );
                },
              },

              {
                dataField: 'approvalDate',
                text: 'Approval Date',
                headerClasses: 'textHeader11',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.approvalDate
                    ? dayjs(row.extraData.approvalDate).format('YYYY-MM-DD')
                    : '',
                filter: customFilter({
                  getFilter: filter => {
                    approvalDate = filter;
                  },
                }),
                filterRenderer: (onFilter, column) => (
                  <DateFilter onFilter={onFilter} column={column} />
                ),
                formatter: (cell, row) => {
                  return (
                    <>
                      {dayjs(row.extraData.approvalDate).format('YYYY-MM-DD')}
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
                      onFocusRemove={approvalDate => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            approvalDate,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'approvalStatus',
                text: 'Approval Status',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.approvalStatus
                    ? row.extraData.approvalStatus
                    : '',
                filter: textFilter({
                  getFilter: filter => {
                    approvalStatus = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.approvalStatus}</>;
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
                      value={row.extraData?.approvalStatus}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                      }
                      onChange={e => {
                        const approvalStatus = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            approvalStatus,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - APPROVAL_STATUS',
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
                dataField: 'reportStatus',
                text: 'Report Status',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.reportStatus ? row.extraData.reportStatus : '',
                filter: textFilter({
                  getFilter: filter => {
                    reportStatus = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.reportStatus}</>;
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
                      value={row.extraData?.reportStatus}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 } rounded-md'
                      }
                      onChange={e => {
                        const reportStatus = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            reportStatus,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - REPORT_STATUS',
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
                dataField: 'reportedDate',
                text: 'Reported Date',
                headerClasses: 'textHeader11',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.reportedDate
                    ? dayjs(row.extraData.reportedDate).format('YYYY-MM-DD')
                    : '',
                filter: customFilter({
                  getFilter: filter => {
                    reportedDate = filter;
                  },
                }),
                filterRenderer: (onFilter, column) => (
                  <DateFilter onFilter={onFilter} column={column} />
                ),
                formatter: (cell, row) => {
                  return (
                    <>
                      {dayjs(row.extraData.reportedDate).format('YYYY-MM-DD')}
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
                      onFocusRemove={reportedDate => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            reportedDate,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'enteredBy',
                text: 'Entered By',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.enteredBy ? row.extraData.enteredBy : '',
                filter: textFilter({
                  getFilter: filter => {
                    enteredBy = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.enteredBy}</>;
                },
                editable: false,
              },
              {
                dataField: 'height',
                text: 'Height',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.height ? row.extraData.height : '',
                filter: textFilter({
                  getFilter: filter => {
                    height = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.height}</>;
                },
              },
              {
                dataField: 'weight',
                text: 'Weight',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.weight ? row.extraData.weight : '',
                filter: textFilter({
                  getFilter: filter => {
                    weight = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.weight}</>;
                },
              },
              {
                dataField: 'archieve',
                text: 'Archive',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.archieve ? row.extraData.archieve : '',
                filter: textFilter({
                  getFilter: filter => {
                    archieve = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.archieve}</>;
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
                      value={row.extraData?.archieve}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                      }
                      onChange={e => {
                        const archieve = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            archieve,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - ARCHIVED',
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
                dataField: 'loginInterface',
                text: 'Login Interface',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.loginInterface
                    ? row.extraData.loginInterface
                    : '',
                filter: textFilter({
                  getFilter: filter => {
                    loginInterface = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.loginInterface}</>;
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
                      value={row.extraData?.loginInterface}
                      disabled={true}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                      }
                      onChange={e => {
                        const loginInterface = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            loginInterface,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - LOGIN_INTERFACE',
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
                dataField: 'registrationInterface',
                text: 'Registration Interface',
                headerClasses: 'textHeader5',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.registrationInterface
                    ? row.extraData.registrationInterface
                    : '',
                filter: textFilter({
                  getFilter: filter => {
                    registrationInterface = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.registrationInterface}</>;
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
                      value={row.extraData?.registrationInterface}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                      }
                      onChange={e => {
                        const registrationInterface = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            registrationInterface,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - REGISTRATION_INTERFACE',
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
                dataField: 'submittingSystem',
                text: 'Submitting System',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.submittingSystem
                    ? row.extraData.submittingSystem
                    : '',
                filter: textFilter({
                  getFilter: filter => {
                    submittingSystem = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.submittingSystem}</>;
                },
              },
              {
                dataField: 'submittindOn',
                text: 'Submitting On',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.submittindOn ? row.extraData.submittindOn : '',
                filter: textFilter({
                  getFilter: filter => {
                    submittindOn = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.submittindOn}</>;
                },
              },
              {
                dataField: 'accountType',
                text: 'Account Type',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.accountType ? row.extraData.accountType : '',
                filter: textFilter({
                  getFilter: filter => {
                    accountType = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.accountType}</>;
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
                      value={row?.extraData?.accountType}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                      }
                      onChange={e => {
                        const accountType = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            accountType,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - ACCOUNT_TYPE',
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
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.deliveryMode ? row.extraData.deliveryMode : '',
                filter: textFilter({
                  getFilter: filter => {
                    deliveryMode = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.deliveryMode}</>;
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
                      value={row?.extraData?.deliveryMode}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                      }
                      onChange={e => {
                        const deliveryMode = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            deliveryMode,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT VISIT - DELIVERY_METHOD',
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
                dataField: 'employeeCode',
                text: 'Employee Code',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) => (col ? col : false),
                editable: false,
                formatter: (cell, row) => {
                  return <>{row.extraData.employeeCode}</>;
                },
              },
              {
                dataField: 'environment',
                text: 'Environment',
                headerClasses: 'textHeader4',
                sort: true,
                headerStyle: {
                  fontSize: 0,
                },
                sortCaret: (order, column) => sortCaret(order, column),
                csvFormatter: (col, row) =>
                  row.extraData?.environment ? row.extraData.environment : '',
                filter: textFilter({
                  getFilter: filter => {
                    environment = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <>{row.extraData.environment}</>;
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
                      value={row.extraData?.environment}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
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
                      <option>Select</option>
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
                              type: 'delete',
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
            fileName='Patient Visit ExtraData'
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
              additionalInfo('');
              invoiceAc('');
              billingMethod('');
              billNumber('');
              methodCollection('');
              collectedBy('');
              receivedDate();
              resultDate();
              approvalDate();
              approvalStatus('');
              reportStatus('');
              reportedDate();
              enteredBy('');
              height('');
              weight('');
              archieve('');
              loginInterface('');
              registrationInterface('');
              submittingSystem('');
              submittindOn('');
              accountType('');
              deliveryMode('');
              environment('');
            }}
          />
        </div>
      </>
    );
  },
);
