import React from 'react';
import dayjs from 'dayjs';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  TableBootstrap,
  Tooltip,
  Icons,
  Form,
  List,
  Buttons,
  Svg,
  NumberFilter,
  DateFilter,
  textFilter,
  customFilter,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {AutoCompleteFilterSingleSelectAnalyteCode} from '../index';
let analyteCode;
let analyteName;
let conclusionResult;
let defaultConclusion;
let environment;
let enteredBy;
let dateCreation;
let dateActive;
let dateExpire;
let status;
let version;
interface PossibleResultsListProps {
  data: Array<any>;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  updatePossibleResults?: (values: any) => void;
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (record: any) => void;
}

export const PossibleResultsList = (props: PossibleResultsListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
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
            dataField: 'analyteCode',
            text: 'Analyte Code',
            filter: textFilter({
              getFilter: filter => {
                analyteCode = filter;
              },
            }),
            headerClasses: 'textHeader4',
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
                <AutoCompleteFilterSingleSelectAnalyteCode
                  onSelect={item => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        item.analyteCode,
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
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
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                analyteName = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'conclusionResult',
            text: 'Conclusion Result',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `Result:${row.conclusionResult.map(
                item => item.result,
              )} - PossibleValue: ${row.conclusionResult.map(
                item => item.possibleValue,
              )} - Ab Normal: ${row.conclusionResult.map(item =>
                item.abNormal ? (item.abNormal ? 'Yes' : 'No') : 'No',
              )},Critical: ${row.conclusionResult.map(item =>
                item.critical ? (item.critical ? 'Yes' : 'No') : 'No',
              )}`,
            filter: textFilter({
              getFilter: filter => {
                conclusionResult = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <div className='flex flex-wrap max-w-2xl overflow-scroll'>
                <List space={2} justify='center'>
                  {row.conclusionResult.map(item => (
                    <div className='mb-2'>
                      <Buttons.Button
                        size='medium'
                        type='solid'
                        onClick={() => {}}
                      >
                        {`Result: ${item.result}
                         PossibleValue: ${item.possibleValue}
                         Ab Normal: ${item.abNormal}
                         Critical: ${item.critical}`}
                      </Buttons.Button>
                    </div>
                  ))}
                </List>
              </div>
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
                <div className='flex flex-row gap-4'>
                  <Form.Input
                    placeholder='Result'
                    value={
                      props.extraData.possibleResultsStore?.possibleResults
                        .result
                    }
                    onChange={result => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore
                            .possibleResults,
                          result,
                        });
                    }}
                  />
                  <Form.Input
                    placeholder='Possible Value'
                    value={
                      props.extraData.possibleResultsStore?.possibleResults
                        .possibleValue
                    }
                    onChange={possibleValue => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore
                            .possibleResults,
                          possibleValue,
                        });
                    }}
                  />
                  <Form.Toggle
                    label='AbNormal'
                    value={
                      props.extraData.possibleResultsStore?.possibleResults
                        .abNormal
                    }
                    onChange={abNormal => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore
                            .possibleResults,
                          abNormal,
                        });
                    }}
                  />
                  <Form.Toggle
                    label='Critical'
                    value={
                      props.extraData.possibleResultsStore?.possibleResults
                        .critical
                    }
                    onChange={critical => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore
                            .possibleResults,
                          critical,
                        });
                    }}
                  />

                  <div className='mt-2'>
                    <Buttons.Button
                      size='medium'
                      type='solid'
                      onClick={() => {
                        const result =
                          props.extraData.possibleResultsStore?.possibleResults
                            .result;
                        const possibleValue =
                          props.extraData.possibleResultsStore?.possibleResults
                            .possibleValue;
                        const conclusionResult = row.conclusionResult || [];
                        if (result === undefined || possibleValue === undefined)
                          return alert('Please enter value and code.');
                        if (result !== undefined) {
                          conclusionResult !== undefined
                            ? conclusionResult.push({
                                result,
                                possibleValue,
                                abNormal: false,
                                critical: false,
                              })
                            : [
                                {
                                  result,
                                  possibleValue,
                                  abNormal: false,
                                  critical: false,
                                },
                              ];
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              conclusionResult,
                              'conclusionResult',
                              row._id,
                            );
                        }
                      }}
                    >
                      <Icons.EvaIcon icon='plus-circle-outline' />
                      {'Add'}
                    </Buttons.Button>
                  </div>
                  <div className='clearfix'></div>
                </div>
                <List space={2} direction='row' justify='center'>
                  <div>
                    {row.conclusionResult?.map((item, index) => (
                      <div className='mb-2' key={index}>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          icon={Svg.Remove}
                          onClick={() => {
                            const firstArr =
                              row?.conclusionResult?.slice(0, index) || [];
                            const secondArr =
                              row?.conclusionResult?.slice(index + 1) || [];
                            const finalArray = [
                              ...firstArr,
                              ...secondArr,
                            ] as typeof props.extraData.possibleResultStore.conclusionResult;
                            props.updatePossibleResults &&
                              props.updatePossibleResults({
                                ...props.extraData.possibleResultsStore
                                  .possibleResults,
                                conclusionResult: finalArray,
                              });
                            props.onUpdateItem &&
                              props.onUpdateItem(
                                finalArray,
                                'conclusionResult',
                                row._id,
                              );
                          }}
                        >
                          {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AbNormal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                        </Buttons.Button>
                      </div>
                    ))}
                  </div>
                </List>
              </>
            ),
          },
          {
            dataField: 'defaultConclusion',
            text: 'Defualt Conclusion',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `Result:${
                row.defaultConclusion && row.defaultConclusion.result
              } - PossibleValue: ${
                row.defaultConclusion && row.defaultConclusion.possibleValue
              } - Ab Normal: ${
                row.defaultConclusion && row.defaultConclusion.abNormal
              },Critical: ${
                row.defaultConclusion && row.defaultConclusion.critical
              }`,
            filter: textFilter({
              getFilter: filter => {
                defaultConclusion = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <>
                {row?.defaultConclusion && (
                  <label>
                    {`Result: ${row.defaultConclusion.result || ''} 
                       PossibleValue: ${
                         row.defaultConclusion.possibleValue || ''
                       }
                       Ab Normal: ${row.defaultConclusion.abNormal || false}
                       Critical: ${row.defaultConclusion.critical || false}`}
                  </label>
                )}
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
                <select
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                  }
                  onChange={e => {
                    if (e.target.value === 'removeItem') {
                      return (
                        props.onUpdateItem &&
                        props.onUpdateItem(null, 'defaultConclusion', row._id)
                      );
                    }
                    let defaultItem = JSON.parse(e.target.value);
                    defaultItem = {
                      result: defaultItem.result,
                      possibleValue: defaultItem.possibleValue,
                      abNormal: defaultItem.abNormal,
                      critical: defaultItem.critical,
                    };
                    console.log({defaultItem});

                    props.onUpdateItem &&
                      props.onUpdateItem(
                        defaultItem,
                        'defaultConclusion',
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  <option value='removeItem'>Remove Item</option>
                  {row.conclusionResult.map((item: any, index: number) => (
                    <option key={index} value={JSON.stringify(item)}>
                      {`Result: ${item.result} ,
                        PossibleValue: ${item.possibleValue} ,
                        Ab Normal: ${
                          item.abNormal ? (item.abNormal ? 'Yes' : 'No') : 'No'
                        } ,
                        Critical: ${
                          item.critical ? (item.critical ? 'Yes' : 'No') : 'No'
                        }`}
                    </option>
                  ))}
                </select>
              </>
            ),
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
                  {lookupItems(props.extraData.lookupItems, 'ENVIRONMENT').map(
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
              getFilter: filter => {
                enteredBy = filter;
              },
            }),
          },
          {
            dataField: 'dateCreation',
            editable: false,
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
            editable: false,
            text: 'Date Active',
            headerClasses: 'textHeader11',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateActive ? dayjs(row.dateActive).format('YYYY-MM-DD') : '',
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
                      props.onUpdateItem(dateActive, column.dataField, row._id);
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
              row.dateExpire ? dayjs(row.dateExpire).format('YYYY-MM-DD') : '',
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
                      props.onUpdateItem(dateExpire, column.dataField, row._id);
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            dataField: 'opration',
            text: 'Action',
            editable: false,
            csvExport: false,
            hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row gap-2'>
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
                      <Tooltip tooltipText='Version Upgrade'>
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
                      <Tooltip tooltipText='Duplicate'>
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
                  {row.status == 'D' && (
                    <Tooltip tooltipText='Approval'>
                      <Icons.RIcon
                        nameIcon='AiOutlineCheckCircle'
                        propsIcon={{size: 24, color: '#ffffff'}}
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
        fileName='PossibleResult'
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
          analyteCode('');
          analyteName('');
          conclusionResult('');
          defaultConclusion('');
          environment('');
          enteredBy('');
          dateCreation('');
          dateActive('');
          dateExpire('');
          status('');
          version('');
        }}
        dynamicStylingFields={['analyteCode', 'environment', 'status']}
        hideExcelSheet={['_id', 'opration']}
      />
    </div>
  );
};
