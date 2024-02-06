import React, { useState } from 'react';
import daysjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  textFilter,
  NumberFilter,
  DateFilter,
  Form,
  Tooltip,
  Icons,
  customFilter,
  Toast,
  sortCaret,
  ModalDateTime,
} from '@/library/components';
import { Confirm } from '@/library/models';
import {
  AutoCompleteFilterSingleSelectPlabs,
  AutoCompleteFilterSingleSelectDepartment,
  AutoCompleteFilterSingleSelectPanelMethod,
  AutoCompleteInterpretation,
  AutoCompleteFilterSingleSelectReportTemplate,
  AutoCompletePanelBottomMarker,
} from '../index';
import { FormHelper } from '@/helper';
import { AutoCompleteCompanyList } from '@/core-components';

let rLab;
let pLab;
let department;
let panelCode;
let panelName;
let panelMethodCode;
let panelMethodName;
let description;
let shortName;
let price;
let tat;
let validationLevel;
let reportGroup;
let reportOrder;
let sex;
let sexAction;
let ageAction;
let actionMessage;
let hiAge;
let loAge;
let processing;
let category;
let suffix;
let serviceType;
let panelType;
let tubeGroup;
let labelInstruction;
let panelMethod;
let workflow;
let reportTemplate;
let sampleType;
let specalInstructions;
let internalComments;
let externalComments;
let panelBottomMarker;
let panelRightMarker;
let status;
let environment;
let dateCreation;
let dateActive;
let dateExpire;
let version;
let enteredBy;
let interpretation;
let companyCode;

interface PanelMasterListProps {
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
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFileds?: (fileds: any, id: string) => void;
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
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

export const PanelMasterList = (props: PanelMasterListProps) => {
  const [modalDetails, setModalDetails] = useState<any>();
  const editorCell = (row: any) => {
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
              dataField: 'rLab',
              text: 'RLab',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  rLab = filter;
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
                      const rLab = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(rLab, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.labList &&
                      props.extraData.labList.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        ),
                      )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  pLab = filter;
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
                  <AutoCompleteFilterSingleSelectPlabs
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
              dataField: 'department',
              text: 'Department',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  department = filter;
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
                  <AutoCompleteFilterSingleSelectDepartment
                    lab={row.pLab}
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            department: item.code,
                            reportGroup: Number.parseInt(item.reportOrder),
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'serviceType',
              text: 'Service Type',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  serviceType = filter;
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
                      const serviceType = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          serviceType,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'SERVICE_TYPE',
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
              dataField: 'panelCode',
              text: 'Panel Code',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  panelCode = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  panelName = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'description',
              text: 'Description',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  description = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'panelMethodCode',
              text: 'Panel Method Code',
              headerClasses: 'textHeader5',
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
                  panelMethodCode = filter;
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
                  <AutoCompleteFilterSingleSelectPanelMethod
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            panelMethodCode: item.methodsCode,
                            panelMethodName: item.methodsName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'panelMethodName',
              text: 'Panel Method Name',
              headerClasses: 'textHeader5',
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
                  panelMethodName = filter;
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
                  <AutoCompleteFilterSingleSelectPanelMethod
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            panelMethodCode: item.methodsCode,
                            panelMethodName: item.methodsName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'method',
              text: 'Method',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.method ? (row.method ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.method}
                      onChange={method => {
                        props.onUpdateItem &&
                          props.onUpdateItem(method, 'method', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'shortName',
              text: 'Short Name',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  shortName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'price',
              text: 'Price',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  price = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
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
                    placeholder='Price'
                    type='number'
                    value={row.price}
                    onChange={price => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          Number.parseFloat(price),
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'bill',
              text: 'Bill',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.bill ? (row.bill ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.bill}
                      onChange={bill => {
                        props.onUpdateItem &&
                          props.onUpdateItem(bill, 'bill', row._id);
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'schedule',
              text: 'Schedule',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  rLab = filter;
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
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const schedule = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(schedule, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.listDeliverySchedule.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.schCode}>
                          {`${item.schCode}`}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'validationLevel',
              text: 'Validation Level',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  validationLevel = filter;
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
                    value={row.validationLevel}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const validationLevel: any = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          validationLevel,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
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
              dataField: 'reportGroup',
              text: 'Report Group',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  reportGroup = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'reportOrder',
              text: 'Report Order',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  reportOrder = filter;
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
                  <Form.Input
                    type='number'
                    onBlur={reportOrder => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          Number.parseInt(reportOrder),
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'processing',
              text: 'Processing',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  processing = filter;
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
                      const processing = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          processing,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'PROCESSING').map(
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
              dataField: 'workflow',
              text: 'Workflow',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  workflow = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'category',
              text: 'Category',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  category = filter;
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
                      const category = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(category, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
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
              dataField: 'panelType',
              text: 'Panel Type',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  panelType = filter;
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
                      const panelType = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          panelType,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'PANEL_TYPE').map(
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
              dataField: 'autoRelease',
              text: 'Auto Release',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.autoRelease ? (row.autoRelease ? 'Yes' : 'No') : 'No'}`,
              editable: false,
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
              dataField: 'holdOOS',
              text: 'Hold OOS',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.holdOOS ? (row.holdOOS ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.holdOOS}
                      onChange={holdOOS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(holdOOS, 'holdOOS', row._id);
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'confidential',
              text: 'Confidential',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.confidential ? (row.confidential ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
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
                );
              },
            },

            {
              dataField: 'urgent',
              text: 'Urgent',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.urgent ? (row.urgent ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
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
              dataField: 'repitation',
              text: 'Repitation',
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.repitation}
                      onChange={repitation => {
                        props.onUpdateItem &&
                          props.onUpdateItem(repitation, 'repitation', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'printLabel',
              text: 'Print Label',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.printLabel ? (row.printLabel ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.printLabel}
                      onChange={printLabel => {
                        props.onUpdateItem &&
                          props.onUpdateItem(printLabel, 'printLabel', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'isSaleable',
              text: 'Is Saleable',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.isSaleable ? (row.isSaleable ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.isSaleable}
                      onChange={isSaleable => {
                        props.onUpdateItem &&
                          props.onUpdateItem(isSaleable, 'isSaleable', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'cumulative',
              text: 'Cumulative',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.cumulative ? (row.cumulative ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.cumulative}
                      onChange={cumulative => {
                        props.onUpdateItem &&
                          props.onUpdateItem(cumulative, 'cumulative', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'sexAction',
              text: 'Sex Action',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  sexAction = filter;
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
                    value={row.sexAction}
                    disabled={!row.ageSexAction}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const sexAction = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          sexAction,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'SEX_ACTION').map(
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
              dataField: 'sex',
              text: 'sex',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                    value={row.sex}
                    disabled={!row.ageSexAction}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const sex = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(sex, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'SEX').map(
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
              dataField: 'ageAction',
              text: 'Age Action',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  ageAction = filter;
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
                    value={row.ageAction}
                    disabled={!row.ageSexAction}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const ageAction = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          ageAction,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'AGE_ACTION').map(
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
              dataField: 'loAge',
              text: 'Lo Age',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  loAge = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row) && row.sexAction,
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
                    disabled={!row?.ageSexAction}
                    placeholder={row.loAge}
                    onBlur={loAge => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                      if (
                        regex.test(loAge) &&
                        FormHelper.isNumberAvailable(loAge)
                      ) {
                        props.onUpdateItem &&
                          props.onUpdateItem(loAge, column.dataField, row._id);
                      } else {
                        Toast.warning({
                          message:
                            '😔 Only > and < sign and numbers should be allowed',
                        });
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'hiAge',
              text: 'Hi Age',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  hiAge = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row) && row.sexAction,
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
                    disabled={!row?.ageSexAction}
                    placeholder={row.hiAge}
                    onBlur={hiAge => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                      if (
                        regex.test(hiAge) &&
                        FormHelper.isNumberAvailable(hiAge)
                      ) {
                        props.onUpdateItem &&
                          props.onUpdateItem(hiAge, column.dataField, row._id);
                      } else {
                        Toast.warning({
                          message:
                            '😔 Only > and < sign and numbers should be allowed',
                        });
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'actionMessage',
              text: 'Action Message',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  actionMessage = filter;
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
                  <Form.Input
                    disabled={!row?.ageSexAction}
                    placeholder={'Action Message'}
                    value={row?.actionMessage}
                    onChange={actionMessage => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          actionMessage,
                          'actionMessage',
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },

            {
              dataField: 'ageSexAction',
              text: 'Age/Sex Action',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.ageSexAction ? (row.ageSexAction ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.ageSexAction}
                      onChange={ageSexAction => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            ageSexAction,
                            'ageSexAction',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'pageBreak',
              text: 'Page Break',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.pageBreak ? (row.pageBreak ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.pageBreak}
                      onChange={pageBreak => {
                        props.onUpdateItem &&
                          props.onUpdateItem(pageBreak, 'pageBreak', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'reportTemplate',
              text: 'Report Template',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  reportTemplate = filter;
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
                  <AutoCompleteFilterSingleSelectReportTemplate
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            reportTemplate: item?.reportTemplate,
                            reportTemplateOrder: item?.reportOrder,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'reportTemplateOrder',
              text: 'Report Template Order',
              headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'labelInstruction',
              text: 'Label Instruction',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  labelInstruction = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'specalInstructions',
              text: 'Specal Instructions',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  specalInstructions = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              style: { textTransform: 'uppercase' },
              editorStyle: {
                textTransform: 'uppercase',
              },
            },
            {
              dataField: 'interpretation',
              text: 'Interpretation',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  interpretation = filter;
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
                  <AutoCompleteInterpretation
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'internalComments',
              text: 'Internal Comments',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  internalComments = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'externalComments',
              text: 'External Comments',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  externalComments = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'panelBottomMarker',
              text: 'Panel Bottom Marker',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return <span>{row?.panelBottomMarker?.details}</span>;
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
                  <AutoCompletePanelBottomMarker
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'panelRightMarker',
              text: 'Panel Right Marker',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  panelRightMarker = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'externalPanelCode',
              text: 'External Panel Code',
              headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                      const status = e.target.value as string;
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
              dataField: 'enteredBy',
              text: 'Entered By',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  enteredBy = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'dateCreation',
              text: 'Date Creation',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateCreation
                  ? daysjs(row.dateCreation).format('YYYY-MM-DD')
                  : '',
              editable: false,
              filter: customFilter({
                getFilter: filter => {
                  dateCreation = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>{daysjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')}</>
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
              text: 'Date Active',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateActive
                  ? daysjs(row.dateActive || 0).format('YYYY-MM-DD')
                  : '',
              editable: false,
              filter: customFilter({
                getFilter: filter => {
                  dateActive = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {daysjs(row.dateActive || 0).format('DD-MM-YYYY HH:mm:ss')}
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
              dataField: 'dateExpire',
              text: 'Date Expiry',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateExpire
                  ? daysjs(row.dateExpire || 0).format('YYYY-MM-DD')
                  : '',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              filter: customFilter({
                getFilter: filter => {
                  dateExpire = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {daysjs(row.dateExpire || 0).format('DD-MM-YYYY HH:mm:ss')}
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
              text: 'Version',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
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
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              filter: textFilter({
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
              //       className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
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
              //       <option selected>Select</option>
              //       {lookupItems(
              //         props.extraData.lookupItems,
              //         'ENVIRONMENT',
              //       ).map((item: any, index: number) => (
              //         <option key={index} value={item.code}>
              //           {lookupValue(item)}
              //         </option>
              //       ))}
              //     </select>
              //   </>
              // ),
            },

            {
              dataField: 'opration',
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
                    )}

                    {row.status === 'A' && (
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
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='Panel Master'
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
            rLab('');
            pLab('');
            department('');
            panelCode('');
            panelName('');
            panelMethodCode('');
            panelMethodName('');
            description('');
            shortName('');
            price('');
            validationLevel('');
            reportGroup('');
            reportOrder('');
            sex('');
            ageAction('');
            hiAge('');
            sexAction('');
            actionMessage('');
            loAge('');
            processing('');
            category('');
            serviceType('');
            panelType('');
            labelInstruction('');
            workflow('');
            reportTemplate('');
            interpretation('');
            specalInstructions('');
            internalComments('');
            externalComments('');
            panelBottomMarker('');
            panelRightMarker('');
            status('');
            environment('');
            companyCode('');
          }}
          dynamicStylingFields={[
            'rLab',
            'pLab',
            'department',
            'serviceType',
            'panelCode',
            'panelName',
            'schedule',
            'status',
            'environment',
          ]}
          hideExcelSheet={['_id', 'opration']}
        />
      </div>
    </>
  );
};
