import React, { useState } from 'react';
import { Form, Icons, Tooltip, Buttons } from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import _ from 'lodash';
import { TableBootstrap } from './TableBootstrap';
import { toJS } from 'mobx';

interface InstResultMappingInputTableProps {
  data: any;
  extraData?: any;
  onDelete?: (index: number) => void;
  onUpdateItems?: (item: any, id) => void;
  onDuplicate?: (item: any) => void;
  addItem?: () => void;
  getTestDetails?: (lab) => void;
  getAnalyteDetails?: (testCode) => void;
}

export const InstResultMappingInputTable = ({
  data,
  extraData,
  onDelete,
  onUpdateItems,
  onDuplicate,
  addItem,
  getTestDetails,
  getAnalyteDetails,
}: InstResultMappingInputTableProps) => {
  const [pLabDetails, setPLabDetails] = useState<any>();
  return (
    <div className='flex flex-row gap-2 items-center'>
      <div className='overflow-scroll'>
        <TableBootstrap
          id='index'
          data={toJS(data)}
          columns={[
            {
              dataField: 'index',
              text: 'Index',
              headerClasses: 'textHeader',
              hidden: true,
            },
            {
              dataField: 'key',
              text: 'Key',
              headerClasses: 'textHeader',
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
                      onUpdateItems && onUpdateItems({ key }, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              headerClasses: 'textHeader',
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
                          row.index,
                        );
                    }}
                  >
                    <option>Select</option>
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
              sort: true,
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
                return <>{`${row?.testCode || ''} - ${row?.testName || ''}`}</>;
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
                          row.index,
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
                          row.index,
                        );
                    }}
                  >
                    <option>Select</option>
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
                      onUpdateItems && onUpdateItems({ instId }, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'analyteCodeName',
              text: 'Analyte Code/Analyte Name',
              headerClasses: 'textHeader',
              events: {
                onClick: async (e, column, columnIndex, row, rowIndex) => {
                  if (
                    pLabDetails?.testCode != row.testCode &&
                    getAnalyteDetails
                  ) {
                    const testCodeRecords = await getAnalyteDetails(
                      row.testCode,
                    );
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
                  <>{`${row?.analyteCode || ''} - ${row?.analyteName || ''}`}</>
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
                          row.index,
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
                      onUpdateItems && onUpdateItems({ assayCode }, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'instTest',
              text: 'Inst Test',
              headerClasses: 'textHeader',
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
                      onUpdateItems && onUpdateItems({ instTest }, row.index);
                    }}
                  />
                </>
              ),
            },
            // {
            //   dataField: 'environment',
            //   text: 'Environment',
            //   headerClasses: 'textHeader',
            //   editorRenderer: (
            //     editorProps,
            //     value,
            //     row,
            //     column,
            //     rowIndex,
            //     columnIndex,
            //   ) => (
            //     <>
            //       <select
            //         value={row.environment}
            //         className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
            //         onChange={e => {
            //           const environment = e.target.value;
            //           onUpdateItems &&
            //             onUpdateItems(
            //               {
            //                 environment,
            //               },
            //               row.index,
            //             );
            //         }}
            //       >
            //        <option>Select</option>
            //         {lookupItems(extraData.lookupItems, 'ENVIRONMENT').map(
            //           (item: any, index: number) => (
            //             <option key={index} value={item.code}>
            //               {lookupValue(item)}
            //             </option>
            //           ),
            //         )}
            //       </select>
            //     </>
            //   ),
            // },
            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
              hidden: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Tooltip tooltipText='Delete'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => onDelete && onDelete(row.index)}
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Duplicate'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => onDuplicate && onDuplicate(row)}
                      >
                        {Icons.getIconTag(Icons.IconFa.FaCopy)}
                      </Icons.IconContext>
                    </Tooltip>
                  </div>
                </>
              ),
              headerClasses: 'sticky right-0  bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isEditModify={true}
          isSelectRow={true}
          fileName='Instrument Result Mapping Input Table'
        />
      </div>
      <Buttons.Button
        size='medium'
        type='solid'
        onClick={() => addItem && addItem()}
        disabled={
          data[0].pLab && data[0].instType && data[0].instId ? false : true
        }
      >
        <Icons.EvaIcon icon='plus-circle-outline' />
        {'Add'}
      </Buttons.Button>
    </div>
  );
};
