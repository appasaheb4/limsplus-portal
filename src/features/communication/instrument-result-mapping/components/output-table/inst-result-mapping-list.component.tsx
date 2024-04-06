import React, { useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  TableBootstrap,
  sortCaret,
  textFilter,
  Form,
  Tooltip,
  Icons,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { lookupItems, lookupValue } from '@/library/utils';

interface InstResultMappingListProps {
  data: any;
  extraData: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItems?: (value: any, id: string) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  getTestDetails?: (lab: string) => void;
  getAnalyteDetails?: (testCode: string) => void;
  isInputView: boolean;
  setInputView: any;
}

let key;
let pLab;
let testCode;
let testName;
let department;
let instType;
let instId;
let analyteCode;
let analyteName;
let assayCode;
let instTest;
let environment;
let dateOfEntry;
let lastUpdated;
let companyCode;

export const InstResultMappingList = observer(
  ({
    extraData,
    onUpdateItems,
    getTestDetails,
    getAnalyteDetails,
    ...props
  }: InstResultMappingListProps) => {
    const [pLabDetails, setPLabDetails] = useState<any>();

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
              dataField: 'key',
              text: 'Key',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  key = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                  <Form.Input
                    placeholder={row?.key || 'Key'}
                    type='text'
                    onBlur={key => {
                      onUpdateItems && onUpdateItems({ key }, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  pLab = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                    value={row.pLab}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const pLab = e.target.value;
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            pLab,
                          },
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {extraData?.pLabs?.map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'testCodeName',
              text: 'Test Code/Test Name',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  testCode = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.testCode} - ${row.testName}`,
              events: {
                onClick: async (e, column, columnIndex, row, rowIndex) => {
                  if (pLabDetails?.pLab != row.pLab && getTestDetails) {
                    const pLabRecords = await getTestDetails(row.pLab);
                    setPLabDetails({
                      ...pLabDetails,
                      pLab: row.pLab,
                      testCodeName: 'Select',
                      pLabRecords,
                    });
                  }
                },
              },
              formatter: (cell, row) => {
                return <>{`${row.testCode || ''} - ${row.testName || ''}`}</>;
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
                    value={row.testCodeName}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const item = JSON.parse(e.target.value);
                      setPLabDetails({
                        ...pLabDetails,
                        testCodeName: `${item.testCode} - ${item.testName}`,
                      });
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            testCode: item.testCode,
                            testName: item.testName,
                          },
                          row._id,
                        );
                    }}
                  >
                    <option selected>
                      {pLabDetails?.testCodeName || 'Select'}
                    </option>
                    {_.uniqBy(pLabDetails?.pLabRecords, 'testCode')?.map(
                      (item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {`${item.testCode} - ${item.testName}`}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'instType',
              text: 'Inst Type',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  instType = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
                  <select
                    value={row.fieldType}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const instType = e.target.value;
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            instType,
                          },
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {extraData.instTypes?.map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'instId',
              text: 'Inst Id',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  instId = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
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
                  <Form.Input
                    placeholder={row?.instId || 'Inst Id'}
                    type='text'
                    onBlur={instId => {
                      onUpdateItems && onUpdateItems({ instId }, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'analyteCodeName',
              text: 'Analyte Code/Analyte Name',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  analyteCode = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (cell, row, rowIndex) =>
                `${row.analyteCode} - ${row.analyteName}`,
              events: {
                onClick: async (e, column, columnIndex, row, rowIndex) => {
                  console.log({
                    first: pLabDetails?.testCode,
                    secound: row.testCode,
                  });

                  if (
                    pLabDetails?.testCode != row.testCode &&
                    getAnalyteDetails
                  ) {
                    const testCodeRecords = await getAnalyteDetails(
                      row.testCode,
                    );
                    console.log({ testCodeRecords });

                    setPLabDetails({
                      ...pLabDetails,
                      testCode: row.testCode,
                      testCodeRecords,
                    });
                  }
                },
              },
              formatter: (cell, row) => {
                return (
                  <>{`${row.analyteCode || ''} - ${row.analyteName || ''}`}</>
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
                    value={row.fieldType}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const analyteCodeName = JSON.parse(e.target.value);
                      setPLabDetails({
                        ...pLabDetails,
                        analyteCodeName: `${analyteCodeName.analyteCode} - ${analyteCodeName.analyteName}`,
                      });
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            analyteCode: analyteCodeName.analyteCode,
                            analyteName: analyteCodeName.analyteName,
                          },
                          row._id,
                        );
                    }}
                  >
                    <option selected>
                      {pLabDetails?.analyteCodeName || 'Select'}
                    </option>
                    {_.uniqBy(pLabDetails?.testCodeRecords, 'analyteCode').map(
                      (item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {`${item.analyteCode} - ${item.analyteName}`}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'assayCode',
              text: 'Assay Code',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  assayCode = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                  <Form.Input
                    placeholder={row?.assayCode || 'Assay Code'}
                    type='text'
                    onBlur={assayCode => {
                      onUpdateItems && onUpdateItems({ assayCode }, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'instTest',
              text: 'Inst Test',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  instTest = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
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
                  <Form.Input
                    placeholder={row?.instTest || 'Inst Test'}
                    type='text'
                    onBlur={instTest => {
                      onUpdateItems && onUpdateItems({ instTest }, row._id);
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Environment',
                getFilter: filter => {
                  environment = filter;
                },
              }),
              sort: true,
              editable: false,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
            },
            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    {props.isDelete && (
                      <Tooltip tooltipText='Delete'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onDelete &&
                              props.onDelete({
                                type: 'delete',
                                show: true,
                                id: [row._id],
                                title: 'Are you sure? ',
                                body: 'Do you want to delete this record?',
                              });
                          }}
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
          isSelectRow={true}
          fileName='Instrument Result Mapping'
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
            key('');
            pLab('');
            testCode('');
            testName('');
            department('');
            instType('');
            instId('');
            analyteCode('');
            analyteName('');
            assayCode('');
            instTest('');
            environment('');
            dateOfEntry('');
            lastUpdated('');
            companyCode('');
          }}
          dynamicStylingFields={[]}
          hideExcelSheet={['operation', '_id', 'key']}
          isHideForm={props.isInputView}
          setHideForm={props.setInputView}
        />
      </div>
    );
  },
);
