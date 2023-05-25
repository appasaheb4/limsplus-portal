import React from 'react';
import dayjs from 'dayjs';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  NumberFilter,
  DateFilter,
  textFilter,
  customFilter,
  TableBootstrap,
  Form,
  Icons,
  Tooltip,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectDepartment,
  AutoCompleteFilterSingleSelectDeliverySchedule,
  AutoCompleteFilterSingleSelectTestMethod,
  AutoCompleteInterpretation,
  AutoCompleteTestBottomMarker,
} from '../index';
// import { NumberFilter, DateFilter } from "@/library/components/Organisms"

let dateCreation;
let dateActive;
let dateExpire;
let version;
let enteredBy;
let rLab;
let pLab;
let department;
let section;
let testCode;
let testName;
let description;
let shortName;
let price;
let schedule;
let tat;
let validationLevel;
let reportGroup;
let processing;
let tubeGroup;
let testMethodCode;
let testMethodName;
let labelInstruction;
let panelMethod;
let sampleRunOn;
let workflow;
let sampleType;
let speicalInstructions;
let disease;
let category;
let testType;
let workflowCode;
let worklistCode;
let cptCode;
let prefix;
let sufix;
let collectionContainer;
let holdingDays;
let internalComments;
let externalComments;
let testRightMarker;
let status;
let environment;
let interpretation;
let testResultDate;

interface TestMasterProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
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
}

export const TestMasterList = (props: TestMasterProps) => {
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
              dataField: 'rLab',
              text: 'RLab',
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
                          <option key={index} value={item?.code}>
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
              headerClasses: 'textHeader2',
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
                  <AutoCompleteFilterSingleSelectLabs
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item?.code,
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
              headerClasses: 'textHeader3',
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
                  <AutoCompleteFilterSingleSelectDepartment
                    lab={row.pLab}
                    posstion='relative'
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item?.code,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'section',
              text: 'Section',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                `${row?.section?.code} - ${row?.section?.name}`,
              filter: textFilter({
                getFilter: filter => {
                  section = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>{`${row?.section?.code || ''} -${
                    row?.section?.name || ''
                  }`}</>
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
                      const section = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(section, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.sectionListByDeptCode &&
                      props.extraData.sectionListByDeptCode.map(
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
              dataField: 'testCode',
              text: 'Test  Code',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testCode = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'testName',
              text: 'Test  Name',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testName = filter;
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
              headerClasses: 'textHeader3',
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
              style: {textTransform: 'uppercase'},
              editorStyle: {textTransform: 'uppercase'},
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
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  schedule = filter;
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
                  <AutoCompleteFilterSingleSelectDeliverySchedule
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.schCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },

            {
              dataField: 'validationLevel',
              text: 'Validation Level',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  validationLevel = filter;
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
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
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
              dataField: 'processing',
              text: 'Processing',
              headerClasses: 'textHeader4',
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
                      const processing = e.target.value as
                        | 'MANUAL'
                        | 'AEMI'
                        | 'AUTOMATIC';
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          processing,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {['MANUAL', 'AEMI', 'AUTOMATIC'].map(
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
              dataField: 'sampleRunOn',
              text: 'Sample Run On',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  sampleRunOn = filter;
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
                      const sampleRunOn = e.target.value as
                        | 'LABID'
                        | 'SAMPLEID';
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          sampleRunOn,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {['LABID', 'SAMPLEID'].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'workflow',
              text: 'Workflow',
              headerClasses: 'textHeader4',
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
                      const workflow = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(workflow, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'WORKFLOW').map(
                      (item: any, index: number) => (
                        <option key={index} value={item?.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },

            {
              dataField: 'disease',
              text: 'disease',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  disease = filter;
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
                      const disease = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(disease, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'DISEASE').map(
                      (item: any, index: number) => (
                        <option key={index} value={item?.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'category',
              text: 'Category',
              headerClasses: 'textHeader4',
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
                        <option key={index} value={item?.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'testType',
              text: 'Test Type',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testType = filter;
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
                      const testType = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(testType, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'TEST_TYPE').map(
                      (item: any, index: number) => (
                        <option key={index} value={item?.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'workflowCode',
              text: 'Workflow Code',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  workflowCode = filter;
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
                      const workflowCode = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          workflowCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {['Workflow Code 1'].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'cptCode',
              text: 'CPT Code',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  cptCode = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },

            {
              dataField: 'autoFinish',
              text: 'Auto Finish',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.autoFinish ? (row.autoFinish ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.autoFinish}
                      onChange={autoFinish => {
                        props.onUpdateItem &&
                          props.onUpdateItem(autoFinish, 'autoFinish', row._id);
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
              dataField: 'testMethodCode',
              text: 'Test Method Code',
              headerClasses: 'textHeader2',
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
                  testMethodCode = filter;
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
                  <AutoCompleteFilterSingleSelectTestMethod
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            testMethodCode: item.methodsCode,
                            testMethodName: item.methodsName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testMethodName',
              text: 'Test Method Name',
              headerClasses: 'textHeader4',
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
                  testMethodName = filter;
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
                  <AutoCompleteFilterSingleSelectTestMethod
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            testMethodCode: item.methodsCode,
                            testMethodName: item.methodsName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },

            {
              dataField: 'accredited',
              text: 'Accredited',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.accredited ? (row.accredited ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.accredited}
                      onChange={accredited => {
                        props.onUpdateItem &&
                          props.onUpdateItem(accredited, 'accredited', row._id);
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
              csvFormatter: (col, row) =>
                `${row.abnFlag ? (row.abnFlag ? 'Yes' : 'No') : 'No'}`,
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
              dataField: 'cretical',
              text: 'Cretical',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.cretical ? (row.cretical ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.cretical}
                      onChange={cretical => {
                        props.onUpdateItem &&
                          props.onUpdateItem(cretical, 'cretical', row._id);
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
              csvFormatter: (col, row) =>
                `${row.repitation ? (row.repitation ? 'Yes' : 'No') : 'No'}`,
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
              dataField: 'qcHold',
              text: 'QC Hold',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.qcHold ? (row.qcHold ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.qcHold}
                      onChange={qcHold => {
                        props.onUpdateItem &&
                          props.onUpdateItem(qcHold, 'qcHold', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            // {
            //   dataField: 'oosHold',
            //   text: 'OOS Hold',
            //   sort: true,
            //   csvFormatter: (col, row) =>
            //     `${row.oosHold ? (row.oosHold ? 'Yes' : 'No') : 'No'}`,
            //   editable: false,
            //   formatter: (cell, row) => {
            //     return (
            //       <>
            //         <Form.Toggle
            //           disabled={!editorCell(row)}
            //           value={row.oosHold}
            //           onChange={oosHold => {
            //             props.onUpdateItem &&
            //               props.onUpdateItem(oosHold, 'oosHold', row._id);
            //           }}
            //         />
            //       </>
            //     );
            //   },
            // },
            {
              dataField: 'deltaHold',
              text: 'Delta Hold',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.deltaHold ? (row.deltaHold ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.deltaHold}
                      onChange={deltaHold => {
                        props.onUpdateItem &&
                          props.onUpdateItem(deltaHold, 'deltaHold', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'prefix',
              text: 'Prefix',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  prefix = filter;
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
                      const prefix = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(prefix, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'PREFIX').map(
                      (item: any, index: number) => (
                        <option key={index} value={item?.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },

            {
              dataField: 'sufix',
              text: 'Sufix',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  sufix = filter;
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
                      const sufix = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(sufix, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'SUFIX').map(
                      (item: any, index: number) => (
                        <option key={index} value={item?.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'speicalInstructions',
              text: 'Speical Instructions',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  speicalInstructions = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'allowPartial',
              text: 'Allow Partial',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.allowPartial ? (row.allowPartial ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.allowPartial}
                      onChange={allowPartial => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            allowPartial,
                            'allowPartial',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'internalComments',
              text: 'Internal Comments',
              headerClasses: 'textHeader2',
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
              dataField: 'testBottomMarker',
              text: 'Test Bottom Marker',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return <span>{row?.testBottomMarker?.details}</span>;
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
                  <AutoCompleteTestBottomMarker
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testRightMarker',
              text: 'Test Right Marker',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testRightMarker = filter;
                },
              }),
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
                      const status = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(status, column.dataField, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'STATUS').map(
                      (item: any, index: number) => (
                        <option key={index} value={item?.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              headerClasses: 'textHeader3',
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
                  ? dayjs(row.dateCreation).format('YYYY-MM-DD')
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
                return <>{dayjs(row.dateCreation).format('YYYY-MM-DD')}</>;
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
                  ? dayjs(row.dateActive).format('YYYY-MM-DD')
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
                return <>{dayjs(row.dateActive).format('YYYY-MM-DD')}</>;
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
              editable: false,
              text: 'Date Expire',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateExpire
                  ? dayjs(row.dateExpire).format('YYYY-MM-DD')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateExpire = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateExpire).format('YYYY-MM-DD')}</>;
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
                    value={new Date(row.dateExpire)}
                    onFocusRemove={dateExpire => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          dateExpire,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'version',
              text: 'Version',
              headerClasses: 'textHeader5',
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
              dataField: 'interpretation',
              text: 'Interpretation',
              headerClasses: 'textHeader2',
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
              dataField: 'testResultDate',
              editable: false,
              text: 'Test Result Date',
              headerClasses: 'textHeader11',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.testResultDate
                  ? dayjs(row.testResultDate).format('YYYY-MM-DD')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  testResultDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.testResultDate
                      ? dayjs(row.testResultDate).format('YYYY-MM-DD')
                      : ''}
                  </>
                );
              },
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
                    {lookupItems(
                      props.extraData.lookupItems,
                      'ENVIRONMENT',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item?.code}>
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
                    {row.status !== 'I' && (
                      <>
                        <Tooltip className='ml-2' tooltipText='Version Upgrade'>
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
                        <Tooltip className='ml-2' tooltipText='Duplicate'>
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
          fileName='TestMaster'
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
            section('');
            testCode('');
            testName('');
            description('');
            shortName('');
            price('');
            schedule('');
            tat('');
            validationLevel('');
            reportGroup('');
            processing('');
            testMethodCode('');
            testMethodName('');
            tubeGroup('');
            labelInstruction('');
            panelMethod('');
            sampleRunOn('');
            workflow('');
            sampleType('');
            speicalInstructions('');
            disease('');
            category('');
            testType('');
            workflowCode('');
            worklistCode('');
            cptCode('');
            prefix('');
            sufix('');
            collectionContainer('');
            holdingDays('');
            status('');
            environment('');
            interpretation('');
            testResultDate('');
          }}
        />
      </div>
    </>
  );
};
