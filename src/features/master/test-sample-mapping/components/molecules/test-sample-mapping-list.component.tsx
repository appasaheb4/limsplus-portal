import React from 'react';
import _ from 'lodash';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  Icons,
  Tooltip,
  textFilter,
  Form,
  List,
  Buttons,
  Grid,
  Svg,
  sortCaret,
} from '@/library/components';
import { Confirm } from '@/library/models';
import {
  AutoCompleteFilterSingleSelectTestCode,
  AutoCompleteFilterSingleSelectSampleCode,
  AutoCompleteFilterSingleSelectSampleType,
  AutoCompleteFilterSingleSelectSampleGroup,
  AutoCompleteFilterSingleSelectContainerCode,
  AutoCompleteFilterSingleSelectContainerName,
  AutoCompleteFilterSingleSelectDepartment,
} from '../index';
let testCode;
let sampleCode;
let sampleType;
let sampleGroup;
let collContainerCode;
let collContainerName;
let testContainerCode;
let testContainerName;
let minDrawVol;
let minDrawVolUnit;
let minTestVol;
let minTestVolUnit;
let condition;
let repentionPeriod;
let repentionUnits;
let labelInst;
let info;
let departments;
let environment;
let status;
interface TestSampleMappingListProps {
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
  onApproval: (record: any) => void;
}

export const TestSampleMappingList = (props: TestSampleMappingListProps) => {
  return (
    <>
      <div style={{ position: 'relative' }}>
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
              dataField: 'testCode',
              text: 'Test Code',
              headerClasses: 'textHeader4',
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectTestCode
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.testCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'sampleCode',
              text: 'Sample Code',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  sampleCode = filter;
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
                  <AutoCompleteFilterSingleSelectSampleCode
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.sampleCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'sampleType',
              text: 'Sample Type',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  sampleType = filter;
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
                  <AutoCompleteFilterSingleSelectSampleType
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.sampleType,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'sampleGroup',
              text: 'Sample Group',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  sampleGroup = filter;
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
                  <AutoCompleteFilterSingleSelectSampleGroup
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.sampleGroup,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'collContainerCode',
              text: 'Coll Container Code',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  collContainerCode = filter;
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
                  <AutoCompleteFilterSingleSelectContainerCode
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'collContainerName',
              text: 'Coll Container Name',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  collContainerName = filter;
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
                  <AutoCompleteFilterSingleSelectContainerName
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerName,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testContainerCode',
              text: 'Test Container Code',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testContainerCode = filter;
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
                  <AutoCompleteFilterSingleSelectContainerCode
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testContainerName',
              text: 'Test Container Name',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testContainerName = filter;
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
                  <AutoCompleteFilterSingleSelectContainerName
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerName,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'primaryContainer',
              text: 'Primary Container',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.primaryContainer
                    ? row.primaryContainer
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.primaryContainer}
                      onChange={primaryContainer => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            primaryContainer,
                            'primaryContainer',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'uniqueContainer',
              text: 'Unique Container',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.uniqueContainer
                    ? row.uniqueContainer
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.uniqueContainer}
                      onChange={uniqueContainer => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            uniqueContainer,
                            'uniqueContainer',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'centerIfuge',
              text: 'CenterIfuge',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.centerIfuge ? (row.centerIfuge ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.centerIfuge}
                      onChange={centerIfuge => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            centerIfuge,
                            'centerIfuge',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'aliquot',
              text: 'Aliquot',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.aliquot ? (row.aliquot ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    {' '}
                    <Form.Toggle
                      value={row.aliquot}
                      onChange={aliquot => {
                        props.onUpdateItem &&
                          props.onUpdateItem(aliquot, 'aliquot', row._id);
                      }}
                    />{' '}
                    {row.aliquot ? 'Yes' : 'No'}
                  </>
                );
              },
            },
            {
              dataField: 'labSpecfic',
              text: 'Lab Specfic',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.labSpecfic ? (row.labSpecfic ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.labSpecfic}
                      onChange={labSpecfic => {
                        props.onUpdateItem &&
                          props.onUpdateItem(labSpecfic, 'labSpecfic', row._id);
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'departmentSpecfic',
              text: 'Department Specfic',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.departmentSpecfic
                    ? row.departmentSpecfic
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.departmentSpecfic}
                      onChange={departmentSpecfic => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            departmentSpecfic,
                            'departmentSpecfic',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'sharedSample',
              text: 'Shared Sample',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.sharedSample ? (row.sharedSample ? 'Yes' : 'No') : 'No'
                }`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.sharedSample}
                      onChange={sharedSample => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            sharedSample,
                            'sharedSample',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'minDrawVol',
              text: 'Min Draw Vol',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  minDrawVol = filter;
                },
              }),
            },

            {
              dataField: 'minDrawVolUnit',
              text: 'Min Draw Vol Unit',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  minDrawVolUnit = filter;
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
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-00 rounded-md'
                    onChange={e => {
                      const minDrawVolUnit = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          minDrawVolUnit,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'MIN_DRAW_VOL_UNIT',
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
              dataField: 'minTestVol',
              text: 'Min Test Vol',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  minTestVol = filter;
                },
              }),
            },
            {
              dataField: 'minTestVolUnit',
              text: 'Min Test Vol Unit',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  minTestVolUnit = filter;
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
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-00 rounded-md'
                    onChange={e => {
                      const minTestVolUnit = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          minTestVolUnit,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'MIN_TEST_VOL_UNIT',
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
              dataField: 'condition',
              text: 'Condition',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  condition = filter;
                },
              }),
            },
            {
              dataField: 'repentionPeriod',
              text: 'Repention Period',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  repentionPeriod = filter;
                },
              }),
            },

            {
              dataField: 'repentionUnits',
              text: 'Repention Units',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  repentionUnits = filter;
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
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-00 rounded-md'
                    onChange={e => {
                      const repentionUnits = e.target.value as string;
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          repentionUnits,
                          column.dataField,
                          row._id,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'RETENTION_UNITS',
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
              dataField: 'labelInst',
              text: 'Label Inst',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  labelInst = filter;
                },
              }),
            },

            {
              dataField: 'printLabels',
              text: 'Print Labels',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.printLabels ? (row.printLabels ? 'Yes' : 'No') : 'No'}`,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.printLabels}
                      onChange={printLabels => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            printLabels,
                            'printLabels',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'info',
              text: 'Info',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  info = filter;
                },
              }),
            },
            {
              dataField: 'departments',
              text: 'Departments',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: (cell, row, rowIndex) =>
                `Prefrence:${row.departments?.map(
                  item => item.prefrence,
                )} - Department:${row.departments?.map(
                  item => item.name,
                )} - TatInMin:${row.departments?.map(item => item.tatInMin)}`,
              // filter: textFilter({
              //   getFilter: (filter) => {
              //     departments = filter
              //   },
              // }),
              formatter: (cellContent, row) => (
                <>
                  <List space={2} direction='row' justify='center'>
                    {row.departments?.map(item => (
                      <div className='mb-2'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {}}
                        >
                          {`Department: ${item.code} - ${item.name}`}
                          {` Prefrence: ${item.prefrence}`}
                          {` Tat In Min: ${item.tatInMin}`}
                        </Buttons.Button>
                      </div>
                    ))}
                  </List>
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
                  <Form.InputWrapper>
                    <Grid cols={4}>
                      <div className='mt-1'>
                        <AutoCompleteFilterSingleSelectDepartment
                          onSelect={item => {
                            props.extraData.updateLocalInput({
                              ...props.extraData.localInput,
                              code: item.code,
                              name: item.name,
                            });
                          }}
                        />
                      </div>
                      <Form.Input
                        placeholder='Prefrence'
                        type='number'
                        value={row.prefrence}
                        onChange={prefrence => {
                          props.extraData.updateLocalInput({
                            ...props.extraData.localInput,
                            prefrence: Number.parseFloat(prefrence),
                          });
                        }}
                      />
                      <Form.Input
                        placeholder='TAT IN MIN'
                        type='number'
                        value={row.tatInMin}
                        onChange={tatInMin => {
                          props.extraData.updateLocalInput({
                            ...props.extraData.localInput,
                            tatInMin: Number.parseFloat(tatInMin),
                          });
                        }}
                      />
                      <div className='mt-1'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            const code = props.extraData.localInput?.code;
                            const name = props.extraData.localInput?.name;
                            const prefrence =
                              props.extraData.localInput?.prefrence;
                            const tatInMin =
                              props.extraData.localInput?.tatInMin;
                            let departments = row?.departments || [];
                            if (
                              code === undefined ||
                              prefrence === undefined ||
                              tatInMin === undefined
                            )
                              return alert('Please enter all values.');
                            if (code !== undefined) {
                              departments !== undefined
                                ? departments.push({
                                    code,
                                    name,
                                    prefrence,
                                    tatInMin,
                                  })
                                : (departments = [
                                    {
                                      code,
                                      name,
                                      prefrence,
                                      tatInMin,
                                    },
                                  ]);
                              departments = _.map(departments, o =>
                                _.pick(o, [
                                  'code',
                                  'name',
                                  'prefrence',
                                  'tatInMin',
                                ]),
                              );
                              props.onUpdateItem &&
                                props.onUpdateItem(
                                  departments,
                                  'departments',
                                  row._id,
                                );
                              props.extraData.updateLocalInput({
                                code: undefined,
                                value: undefined,
                                prefrence: undefined,
                                tatInMin: undefined,
                              });
                            }
                          }}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </Grid>
                    <br />
                    <List space={2} direction='row' justify='center'>
                      <div>
                        {row.departments?.map((item, index) => (
                          <div className='mb-2' key={index}>
                            <Buttons.Button
                              size='medium'
                              type='solid'
                              icon={Svg.Remove}
                              onClick={() => {
                                const firstArr =
                                  row?.departments?.slice(0, index) || [];
                                const secondArr =
                                  row?.departments?.slice(index + 1) || [];
                                let finalArray = [...firstArr, ...secondArr];
                                props.extraData.updateSampleType({
                                  ...props.extraData.testSampleMapping,
                                  departments: finalArray,
                                });
                                finalArray = _.map(finalArray, o =>
                                  _.pick(o, [
                                    'code',
                                    'name',
                                    'prefrence',
                                    'tatInMin',
                                  ]),
                                );
                                props.onUpdateItem &&
                                  props.onUpdateItem(
                                    finalArray,
                                    'departments',
                                    row._id,
                                  );
                              }}
                            >
                              {`Department: ${item.code} - ${item.name}`}
                              {` Prefrence: ${item.prefrence}`}
                              {` Tat In Min: ${item.tatInMin}`}
                            </Buttons.Button>
                          </div>
                        ))}
                      </div>
                    </List>
                  </Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: 'status',
              text: 'Status',
              sort: true,
              headerClasses: 'textHeader',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  status = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                row.status != 'D' ? true : false,
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
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
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
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
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
                    <option selected>Select</option>
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
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='TestSampleMapping'
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
            testCode('');
            sampleCode('');
            sampleType('');
            sampleGroup('');
            collContainerCode('');
            collContainerName('');
            testContainerCode('');
            testContainerName('');
            minDrawVol('');
            minDrawVolUnit('');
            minTestVol('');
            minTestVolUnit('');
            condition('');
            repentionPeriod('');
            repentionUnits('');
            labelInst('');
            info('');
            departments('');
            environment('');
            status('');
          }}
          dynamicStylingFields={['testCode', 'sampleCode', 'environment']}
          hideExcelSheet={['opration', '_id']}
        />
      </div>
    </>
  );
};
