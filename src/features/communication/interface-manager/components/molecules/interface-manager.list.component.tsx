import React from 'react';
import {observer} from 'mobx-react';
import {
  TableBootstrap,
  textFilter,
  Form,
  Icons,
  Tooltip,
  List,
  Buttons,
  Grid,
  Svg,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {lookupItems, lookupValue} from '@/library/utils';

let interfaceType;
let instrumentType;
let instrumentName;
let dataFlowFrom;
let protocol;
let block;
let fileds;
let environment;

interface InterfaceManagerListProps {
  data: any;
  extraData: any;
  totalSize: number;
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

export const InterfaceManagerList = observer(
  (props: InterfaceManagerListProps) => {
    return (
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
            dataField: 'interfaceType',
            text: 'Interface Type',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                interfaceType = filter;
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
                  value={row.interfaceType}
                  className='leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md'
                  onChange={e => {
                    const interfaceType = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        interfaceType,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(
                    props.extraData.lookupItems,
                    'INTERFACE_TYPE',
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
            dataField: 'instrumentType',
            text: 'Inst Type',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                instrumentType = filter;
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
                <Form.Input
                  name='instrumentType'
                  placeholder='Instrument Type'
                  onBlur={instrumentType => {
                    if (
                      row.instrumentType !== instrumentType &&
                      instrumentType
                    ) {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          instrumentType,
                          column.dataField,
                          row._id,
                        );
                    }
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'instrumentName',
            text: 'Inst Name',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                instrumentName = filter;
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
                <Form.Input
                  name='instrumentType'
                  placeholder='Instrument Type'
                  onBlur={instrumentType => {
                    if (
                      row.instrumentType !== instrumentType &&
                      instrumentType
                    ) {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          instrumentType,
                          column.dataField,
                          row._id,
                        );
                    }
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'protocol',
            text: 'Protocol',
            headerClasses: 'textHeader6',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                protocol = filter;
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
                  className='leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md'
                  onChange={e => {
                    const protocol = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(protocol, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'PROTOCOL').map(
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
            dataField: 'block',
            text: 'Block',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                block = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <List space={2} direction='row' justify='center'>
                  <div>
                    <div className='mb-2'>
                      <Buttons.Button
                        size='medium'
                        type='solid'
                        onClick={() => {}}
                      >
                        {`Start:${
                          row.blockStart && row.blockStart !== undefined
                            ? row.blockStart
                                .toString()
                                .replaceAll(/&amp;/g, '&')
                                .replaceAll(/&gt;/g, '>')
                                .replaceAll(/&lt;/g, '<')
                                .replaceAll(/&quot;/g, '"')
                                .replaceAll(/â/g, '’')
                                .replaceAll(/â¦/g, '…')
                                .toString()
                            : undefined
                        } - End:${
                          row.blockEnd && row.blockEnd !== undefined
                            ? row.blockEnd
                                .toString()
                                .replaceAll(/&amp;/g, '&')
                                .replaceAll(/&gt;/g, '>')
                                .replaceAll(/&lt;/g, '<')
                                .replaceAll(/&quot;/g, '"')
                                .replaceAll(/â/g, '’')
                                .replaceAll(/â¦/g, '…')
                                .toString()
                            : undefined
                        }`}
                      </Buttons.Button>
                    </div>
                  </div>
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
                <Grid cols={2}>
                  <Form.Input
                    name='startBlock'
                    placeholder='Start Block'
                    onBlur={(blockStart: string | undefined) => {
                      if (row.blockStart !== blockStart && blockStart) {
                        blockStart =
                          blockStart !== undefined
                            ? blockStart
                                .replaceAll('&', '&amp;')
                                .replaceAll('>', '&gt;')
                                .replaceAll('<', '&lt;')
                                .replaceAll('"', '&quot;')
                                .replaceAll('’', 'â')
                                .replaceAll('…', 'â¦')
                                .toString()
                            : undefined;

                        props.onUpdateItem &&
                          props.onUpdateItem(blockStart, 'blockStart', row._id);
                      }
                    }}
                  />
                  <Form.Input
                    name='endBlock'
                    placeholder='End Block'
                    onBlur={(blockEnd: string | undefined) => {
                      if (row.blockEnd !== blockEnd && blockEnd) {
                        blockEnd =
                          blockEnd !== undefined
                            ? blockEnd
                                .replaceAll('&', '&amp;')
                                .replaceAll('>', '&gt;')
                                .replaceAll('<', '&lt;')
                                .replaceAll('"', '&quot;')
                                .replaceAll('’', 'â')
                                .replaceAll('…', 'â¦')
                                .toString()
                            : undefined;
                        props.onUpdateItem &&
                          props.onUpdateItem(blockEnd, 'blockEnd', row._id);
                      }
                    }}
                  />
                </Grid>
              </>
            ),
          },
          {
            dataField: 'fileds',
            text: 'Fileds',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `Filed:${row.fileds.map(
                item => item.filed,
              )},Value${row.fileds.map(item => item.value)}`,
            filter: textFilter({
              getFilter: filter => {
                fileds = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row w-80 gap-2 items-center overflow-auto'>
                  {row.fileds?.map((item, index) => (
                    <div className='mb-2'>
                      <Buttons.Button
                        key={index}
                        size='medium'
                        type='solid'
                        onClick={() => {}}
                      >
                        {`Filed:${item.filed} - Value:${
                          item.value !== undefined
                            ? item.value
                                .toString()
                                .replaceAll(/&amp;/g, '&')
                                .replaceAll(/&gt;/g, '>')
                                .replaceAll(/&lt;/g, '<')
                                .replaceAll(/&quot;/g, '"')
                                .replaceAll(/â/g, '’')
                                .replaceAll(/â¦/g, '…')
                                .toString()
                            : undefined
                        }`}
                      </Buttons.Button>
                    </div>
                  ))}
                </div>
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
                <Grid cols={3}>
                  <Form.Input
                    name='filed'
                    placeholder='Filed'
                    value={row?.filed}
                    onChange={filed => {
                      props.extraData.updateInterfaceManager({
                        ...props.extraData.interfaceManager,
                        filed,
                      });
                    }}
                  />
                  <Form.Input
                    name='value'
                    placeholder='Value'
                    value={row?.value}
                    onChange={value => {
                      props.extraData.updateInterfaceManager({
                        ...props.extraData.interfaceManager,
                        value,
                      });
                    }}
                  />
                  <div className='mt-2'>
                    <Buttons.Button
                      size='medium'
                      type='solid'
                      onClick={() => {
                        let filed = props.extraData.interfaceManager?.filed;
                        let value = props.extraData.interfaceManager?.value;
                        const fileds = row.fileds || [];
                        if (filed === undefined || value === undefined)
                          return alert('Please enter filed and value.');
                        if (filed !== undefined && value !== undefined) {
                          filed = filed
                            .replaceAll('&', '&amp;')
                            .replaceAll('>', '&gt;')
                            .replaceAll('<', '&lt;')
                            .replaceAll('"', '&quot;')
                            .replaceAll('’', 'â')
                            .replaceAll('…', 'â¦');
                          value = value
                            .replaceAll('&', '&amp;')
                            .replaceAll('>', '&gt;')
                            .replaceAll('<', '&lt;')
                            .replaceAll('"', '&quot;')
                            .replaceAll('’', 'â')
                            .replaceAll('…', 'â¦');
                          fileds !== undefined
                            ? fileds.push({
                                filed,
                                value,
                              })
                            : [
                                {
                                  filed,
                                  value,
                                },
                              ];

                          props.onUpdateItem &&
                            props.onUpdateItem(fileds, 'fileds', row._id);

                          props.extraData.updateInterfaceManager({
                            ...props.extraData.interfaceManager,
                            value: '',
                            filed: '',
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
                <List space={2} direction='row' justify='center'>
                  <div>
                    {row.fileds?.map((item, index) => (
                      <div className='mb-2'>
                        <Buttons.Button
                          key={index}
                          size='medium'
                          type='solid'
                          icon={Svg.Remove}
                          onClick={() => {
                            const firstArr = row.fileds?.slice(0, index) || [];
                            const secondArr =
                              row.fileds?.slice(index + 1) || [];
                            const newArrSubCategory = [
                              ...firstArr,
                              ...secondArr,
                            ];

                            props.onUpdateItem &&
                              props.onUpdateItem(
                                newArrSubCategory,
                                'fileds',
                                row._id,
                              );
                          }}
                        >
                          {`${item.filed
                            .replaceAll(/&amp;/g, '&')
                            .replaceAll(/&gt;/g, '>')
                            .replaceAll(/&lt;/g, '<')
                            .replaceAll(/&quot;/g, '"')
                            .replaceAll(/â/g, '’')
                            .replaceAll(/â¦/g, '…')} - ${item.value
                            .replaceAll(/&amp;/g, '&')
                            .replaceAll(/&gt;/g, '>')
                            .replaceAll(/&lt;/g, '<')
                            .replaceAll(/&quot;/g, '"')
                            .replaceAll(/â/g, '’')
                            .replaceAll(/â¦/g, '…')}`}
                        </Buttons.Button>
                      </div>
                    ))}
                  </div>
                </List>
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
                  className='leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md'
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
            dataField: 'operation',
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
        fileName='Interface Manager'
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
          interfaceType('');
          instrumentName('');
          instrumentType('');
          dataFlowFrom('');
          protocol('');
          block('');
          fileds('');
          environment('');
        }}
      />
    );
  },
);
