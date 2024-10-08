import React, { useState } from 'react';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  NumberFilter,
  DateFilter,
  TableBootstrap,
  textFilter,
  customFilter,
  Form,
  Icons,
  Tooltip,
  Toast,
  sortCaret,
  ModalDateTime,
  DateRangeFilter,
} from '@/library/components';
import { Confirm } from '@/library/models';
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectAnalayteMethod,
  AutoCompleteDepartment,
  AutoCompleteInterpretation,
  AutoCompleteAnalyteBottomMarker,
} from '../index';
import { FormHelper } from '@/helper';
import { InputResult } from '@/core-components';

let lab;
let analyteCode;
let analyteName;
let description;
let shortName;
let price;
let analyteMethodCode;
let analyteMethodName;
let calcyName;
let high;
let low;
let picture;
let units;
let usage;
let cptCode;
let departments;
let resultType;
let defaultResult;
let analyteType;
let environment;
let enteredBy;
let dateCreation;
let dateActive;
let dateExpire;
let internalComments;
let externalComments;
let analyteRightMarker;
let status;
let version;
let minReportable;
let maxReportable;
let interpretation;
let companyCode;

interface MasterAnalyteProps {
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

export const MasterAnalyteList = (props: MasterAnalyteProps) => {
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
              dataField: 'analyteCode',
              text: 'Analyte Code',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Analyte Code',
                getFilter: filter => {
                  analyteCode = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'analyteName',
              text: 'Analyte Name',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Analyte Name',
                getFilter: filter => {
                  analyteName = filter;
                },
              }),
              editable: false,
            },
            {
              dataField: 'lab',
              text: 'Lab',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Lab',
                getFilter: filter => {
                  lab = filter;
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
              dataField: 'description',
              text: 'Description',
              headerClasses: 'textHeader',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              style: {
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
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Description',
                getFilter: (filter: any) => {
                  description = filter;
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
                  <Form.MultilineInput
                    rows={3}
                    value={row.description}
                    onChange={description => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          description,
                          column.dataField,
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
              dataField: 'analyteMethodCode',
              text: 'Analyte Method Code',
              headerClasses: 'textHeader6',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Analyte Method Code',
                getFilter: filter => {
                  analyteMethodCode = filter;
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
                  <AutoCompleteFilterSingleSelectAnalayteMethod
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            analyteMethodCode: item.methodsCode,
                            analyteMethodName: item.methodsName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'analyteMethodName',
              text: 'Analyte Method Name',
              headerClasses: 'textHeader6',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Analyte Method Name',
                getFilter: filter => {
                  analyteMethodName = filter;
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
                  <AutoCompleteFilterSingleSelectAnalayteMethod
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            analyteMethodCode: item.methodsCode,
                            analyteMethodName: item.methodsName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'shortName',
              text: 'Short Name',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Short Name',
                getFilter: filter => {
                  shortName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              style: { textTransform: 'uppercase' },
              editorStyle: { textTransform: 'uppercase' },
            },
            {
              dataField: 'price',
              text: 'Price',
              headerClasses: 'textHeader4',
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
                    name='txtPrice'
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
              dataField: 'rangeSetOn',
              text: 'Range Set On',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Range Set On',
                getFilter: filter => {
                  high = filter;
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
                      const rangeSetOn = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          rangeSetOn,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'RANGE_SET_ON',
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
              dataField: 'reportable',
              text: 'Reportable',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.reportable ? (row.reportable ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.reportable}
                      onChange={reportable => {
                        props.onUpdateItem &&
                          props.onUpdateItem(reportable, 'reportable', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'departments',
              text: 'Departments',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Departments',
                getFilter: filter => {
                  departments = filter;
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
                  <AutoCompleteDepartment
                    lab={row.lab}
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, 'departments', row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'resultType',
              text: 'Result Type',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Result Type',
                getFilter: filter => {
                  resultType = filter;
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
                      const resultType = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          resultType,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'RESULT_TYPE',
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
              dataField: 'defaultResult',
              text: 'Default Result',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Default Result',
                getFilter: filter => {
                  defaultResult = filter;
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
                  <InputResult
                    label='Default Result'
                    row={{
                      resultType: row?.resultType,
                      picture: row?.picture,
                      analyteCode: row?.analyteCode,
                      pLab: row?.lab,
                      departement: row?.departments,
                    }}
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            defaultResult: item?.result,
                            numeric: item?.numeric,
                            alpha: item?.alpha,
                            abnFlag: item?.abnFlag,
                            critical: item?.critical,
                          },
                          row?._id,
                        );
                    }}
                    onError={error => {
                      Toast.error({
                        message: `😊 ${error}`,
                      });
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'calculationFlag',
              text: 'Calculation Flag',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.calculationFlag
                    ? row.calculationFlag
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.calculationFlag}
                      onChange={calculationFlag => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            calculationFlag,
                            'calculationFlag',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'analyteType',
              text: 'Analyte Type',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Analyte Type',
                getFilter: filter => {
                  analyteType = filter;
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
                      const analyteType = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          analyteType,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'ANALYTE_TYPE',
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
              dataField: 'units',
              text: 'Units',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Units',
                getFilter: filter => {
                  units = filter;
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
                      const units = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(units, column.dataField, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'UNITS').map(
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
              dataField: 'usage',
              text: 'Usage',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Usage',
                getFilter: filter => {
                  usage = filter;
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
                      const usage = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(usage, column.dataField, row._id);
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'USAGE').map(
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
              dataField: 'picture',
              text: 'Picture',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                placeholder: 'Picture',
                getFilter: filter => {
                  picture = filter;
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
                      const picture = e.target.value;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          Number.parseInt(picture),
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option>Select</option>
                    {['0', '1', '2', '3', '4'].map(
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
              dataField: 'repetition',
              text: 'Repetition',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.repetition ? (row.repetition ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.repetition}
                      onChange={repetition => {
                        props.onUpdateItem &&
                          props.onUpdateItem(repetition, 'repetition', row._id);
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'instantResult',
              text: 'Instant Result',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.instantResult ? (row.instantResult ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.instantResult}
                      onChange={instantResult => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            instantResult,
                            'instantResult',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },

            // {
            //   dataField: "workflow",
            //   text: "Workflow",
            //   sort: true,

            //   filter: textFilter(),
            //   editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            //   editorRenderer: (
            //     editorProps,
            //     value,
            //     row,
            //     column,
            //     rowIndex,
            //     columnIndex
            //   ) => (
            //     <>
            //       <Form.InputWrapper label="Workflow">
            //         <select
            //           className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //           onChange={(e) => {
            //             const workflow = e.target.value as string
            //             props.onUpdateItem &&
            //               props.onUpdateItem(workflow, column.dataField, row._id)
            //           }}
            //         >
            //          <option>Select</option>
            //           {lookupItems(lookupItems, "WORKFLOW").map(
            //             (item: any, index: number) => (
            //               <option key={index} value={item.code}>
            //                 {lookupValue(item)}
            //               </option>
            //             )
            //           )}
            //         </select>
            //
            //     </>
            //   ),
            // },
            // {
            //   dataField: "sampleType",
            //   text: "sampleType",
            //   sort: true,

            //   filter: textFilter(),
            //   editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            //   editorRenderer: (
            //     editorProps,
            //     value,
            //     row,
            //     column,
            //     rowIndex,
            //     columnIndex
            //   ) => (
            //     <>
            //       <Form.InputWrapper
            //         label="Sample Type"
            //         id="optionSampleType"
            //       >
            //         <select
            //           name="optionSampleTypes"
            //           className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //           onChange={(e) => {
            //             const sampleType = e.target.value as string
            //             props.onUpdateItem &&
            //               props.onUpdateItem(sampleType, column.dataField, row._id)
            //           }}
            //         >
            //          <option>Select</option>
            //           {["sampleType1"].map((item: any, index: number) => (
            //             <option key={index} value={item}>
            //               {item}
            //             </option>
            //           ))}
            //         </select>
            //
            //     </>
            //   ),
            // },

            {
              dataField: 'calcyName',
              text: 'Calculation Name',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Calculation Name',
                getFilter: filter => {
                  calcyName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row) && row.calculationFlag,
            },
            {
              dataField: 'cptCode',
              text: 'CPT Code',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'CPT Code',
                getFilter: filter => {
                  cptCode = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'internalComments',
              text: 'Internal Comments',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Internal Comments',
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
                placeholder: 'External Comments',
                getFilter: filter => {
                  externalComments = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'analyteBottomMarker',
              text: 'Analyte Bottom Marker',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              formatter: (cell, row) => {
                return <span>{row?.analyteBottomMarker?.details}</span>;
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
                  <AutoCompleteAnalyteBottomMarker
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, column.dataField, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'analyteRightMarker',
              text: 'Analyte Right Marker',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Analyte Right Marker',
                getFilter: filter => {
                  analyteRightMarker = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'reagentCode',
              text: 'Reagent Code',
              headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
            },
            {
              dataField: 'abnormalHighlighterCSS',
              text: 'Abnormal Highlighter CSS',
              headerClasses: 'textHeader4',
              sort: true,
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
                  <Form.MultilineInput
                    label=''
                    style={{ color: '#ffffff', backgroundColor: '#000000' }}
                    placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
                    onBlur={abnormalHighlighterCSS => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          abnormalHighlighterCSS,
                          column.dataField,
                          row._id,
                        );
                    }}
                    defaultValue={row?.abnormalHighlighterCSS}
                  />
                </>
              ),
            },
            {
              dataField: 'criticalHighlighterCSS',
              text: 'Critical Highlighter CSS',
              headerClasses: 'textHeader4',
              sort: true,
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              sortCaret: (order, column) => sortCaret(order, column),
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
                    style={{ color: '#ffffff', backgroundColor: '#000000' }}
                    placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
                    onBlur={criticalHighlighterCSS => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          criticalHighlighterCSS,
                          column.dataField,
                          row._id,
                        );
                    }}
                    defaultValue={row?.criticalHighlighterCSS}
                  />
                </>
              ),
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
              dataField: 'enteredBy',
              editable: false,
              text: 'Entered By',
              headerClasses: 'textHeader4',
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
                  ? dayjs(row.dateCreation).format('YYYY-MM-DD')
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
                  <>{dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')}</>
                );
              },
              // editorRenderer: (
              //   editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex,
              // ) => (
              //   <>
              //     <Form.InputDateTime
              //       value={new Date(row.dateCreation)}
              //       onFocusRemove={dateCreation => {
              //         props.onUpdateItem &&
              //           props.onUpdateItem(
              //             dateCreation,
              //             column.dataField,
              //             row._id,
              //           );
              //       }}
              //     />
              //   </>
              // ),
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
                  ? dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')
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
                  <>{dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')}</>
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
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              text: 'Date Expiry',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateExpire
                  ? dayjs(row.dateExpire).format('YYYY-MM-DD')
                  : '',
              // filter: dateFilter({
              //   comparators: [
              //     Comparator.EQ,
              //     Comparator.GE,
              //     Comparator.LT,
              //   ],
              //   dateStyle: { marginLeft: "2px" },
              //   defaultValue: {
              //     comparator: Comparator.EQ,
              //   },
              //   style: { display: "inline" },
              // }),
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
                  <>{dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')}</>
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
                      isDateExpire: true,
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
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
                zIndex: 1,
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
              dataField: 'minReportable',
              text: 'Min Reportable',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
                zIndex: 1,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  minReportable = filter;
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
                    label='Min Reportable'
                    placeholder={row.minReportable}
                    onBlur={minReportable => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                      if (
                        regex.test(minReportable) &&
                        FormHelper.isNumberAvailable(minReportable)
                      ) {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            minReportable,
                            column.dataField,
                            row._id,
                          );
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
              dataField: 'maxReportable',
              text: 'Max Reportable',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
                zIndex: 1,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  maxReportable = filter;
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
                    label='Max Reportable'
                    placeholder={row.maxReportable}
                    onBlur={maxReportable => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                      if (
                        regex.test(maxReportable) &&
                        FormHelper.isNumberAvailable(maxReportable)
                      ) {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            maxReportable,
                            column.dataField,
                            row._id,
                          );
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
                placeholder: 'Interpretation',
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
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
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
              // hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row gap-2'>
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
                          <Tooltip tooltipText='Version Upgrade'>
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
                          <Tooltip tooltipText='Duplicate'>
                            <Icons.IconContext
                              color='#ffffff'
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
          fileName='AnalyteMaster'
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
            lab('');
            analyteCode('');
            analyteName('');
            description('');
            shortName('');
            analyteMethodCode('');
            analyteMethodName('');
            calcyName('');
            high('');
            picture('');
            units('');
            usage('');
            cptCode('');
            resultType('');
            defaultResult('');
            analyteType('');
            status('');
            environment('');
            enteredBy();
            dateCreation();
            dateActive();
            dateExpire();
            version('');
            interpretation('');
            minReportable('');
            maxReportable('');
            price('');
            companyCode('');
          }}
          dynamicStylingFields={[
            'lab',
            'analyteCode',
            'analyteName',
            'status',
            'environment',
          ]}
          hideExcelSheet={['_id', 'opration']}
        />
      </div>
    </>
  );
};
