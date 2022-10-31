import React, {useState} from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  NumberFilter,
  customFilter,
  DateFilter,
  textFilter,
  Form,
  Tooltip,
  Icons,
  TableBootstrap,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectPanelCode,
  AutoCompleteFilterSingleSelectTestName,
} from '../index';
import {ModalReportOrder} from './modal-report-order.component';

let dateCreation;
let dateActive;
let dateExpire;
let version;
let enteredBy;
let lab;
let panelCode;
let testCode;
let testName;
let description;
let status;
let environment;

interface TestPanelMappingListProps {
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
  onUpdateOrderSeq?: (orderSeq: any) => void;
}

export const TestPanelMappingList = (props: TestPanelMappingListProps) => {
  const [modalResultOrder, setModalResultOrder] = useState<any>();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  const getMasterFlags = row => {
    console.log({row});

    return [
      {
        title: 'PM',
        isSelected: row?.panelMethod || false,
        icon: 'Icons.IconFa.FaSolarPanel',
      },
      {
        title: 'TM',
        isSelected: row?.testMethod || false,
      },
      {
        title: 'AM',
        isSelected: row?.analyteMethod || false,
      },
    ];
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
              dataField: 'lab',
              text: 'Lab',
              headerClasses: 'textHeader',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
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
              dataField: 'panelCode',
              text: 'Panel Code',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  panelCode = filter;
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
                  <AutoCompleteFilterSingleSelectPanelCode
                    lab={row.lab}
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.panelCode,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testCode = filter;
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
                  <AutoCompleteFilterSingleSelectTestName
                    lab={row.lab}
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            testCode: [item.testCode],
                            testName: [item.testName],
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testName',
              text: 'Test Name',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  testName = filter;
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
                  <AutoCompleteFilterSingleSelectTestName
                    lab={row.lab}
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            testCode: [item.testCode],
                            testName: [item.testName],
                          },
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
              dataField: 'printPanelName',
              text: 'Print Panel Name',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.printTestName ? (row.printPanelName ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.printPanelName}
                      onChange={printPanelName => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            printPanelName,
                            'printPanelName',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'printTestName',
              text: 'Print Test Name',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.printTestName ? (row.printTestName ? 'Yes' : 'No') : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.printTestName}
                      onChange={printTestName => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            printTestName,
                            'printTestName',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'masterFlags',
              text: 'Method Flags',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.panelMethod ? (row.panelMethod ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <div className='inline-flex rounded-md' role='group'>
                    {getMasterFlags(row).map((item, index) => (
                      <button
                        type='button'
                        className={
                          'inline-flex items-center py-2 px-4 text-sm font-medium text-white ' +
                          (item.isSelected ? 'bg-green-800 ' : 'bg-red ') +
                          (index === 0 ? 'rounded-l-lg' : 'rounded-r-md') +
                          ' border border-gray-900'
                        }
                        onClick={() => {
                          const arrMasterFlag: any = getMasterFlags(row).find(
                            e => {
                              if (e.isSelected) return e;
                            },
                          );
                          if (
                            arrMasterFlag.title !==
                            getMasterFlags(row)[index].title
                          )
                            props.onUpdateFileds &&
                              props.onUpdateFileds(
                                {
                                  panelMethod: index === 0 ? true : false,
                                  testMethod: index === 1 ? true : false,
                                  analyteMethod: index === 2 ? true : false,
                                },
                                row._id,
                              );
                          //console.log({arrMasterFlag});

                          // testPanelMappingStore.updateTestPanelMapping({
                          //   ...testPanelMappingStore.testPanelMapping,
                          //   panelMethod: arrMasterFlag.find(
                          //     item => item.title === 'PM',
                          //   ).isSelected,
                          //   testMethod: arrMasterFlag.find(
                          //     item => item.title === 'TM',
                          //   ).isSelected,
                          //   analyteMethod: arrMasterFlag.find(
                          //     item => item.title === 'AM',
                          //   ).isSelected,
                          // });
                        }}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                );
              },
            },
            {
              dataField: 'panelInterpretation',
              text: 'Panel Interpretation',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.panelInterpretation
                    ? row.panelInterpretation
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
                      value={row.panelInterpretation}
                      onChange={panelInterpretation => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            panelInterpretation,
                            'panelInterpretation',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'testInterpretation',
              text: 'Test Interpretation',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.testInterpretation
                    ? row.testInterpretation
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
                      value={row.testInterpretation}
                      onChange={testInterpretation => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            testInterpretation,
                            'testInterpretation',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'analyteInterpretation',
              text: 'Analyte Interpretation',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.analyteInterpretation
                    ? row.analyteInterpretation
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
                      value={row.analyteInterpretation}
                      onChange={analyteInterpretation => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            analyteInterpretation,
                            'analyteInterpretation',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'reportOrder',
              text: 'Report Order',
              headerClasses: 'textHeader5',
              sort: true,
              formatter: (cell, row) => {
                return (
                  <div className=' flex flex-row justify-around'>
                    <span>{row?.reportOrder}</span>
                    <button
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                      onClick={() => {
                        setModalResultOrder({
                          isVisible: true,
                          title: 'Report Order',
                          panelCode: row.panelCode,
                        });
                      }}
                    >
                      Modify
                    </button>
                  </div>
                );
              },
            },
            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader1',
              sort: true,
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
              text: 'Entered By',
              headerClasses: 'textHeader2',
              sort: true,
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
              editable: false,
              text: 'Date Creation',
              headerClasses: 'textHeader6',
              sort: true,
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
              text: 'Date Active',
              headerClasses: 'textHeader6',
              sort: true,
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
              text: 'Date Expire',
              headerClasses: 'textHeader6',
              sort: true,
              csvFormatter: (col, row) =>
                row.dateExpire
                  ? dayjs(row.dateExpire).format('YYYY-MM-DD')
                  : '',
              editable: false,
              filter: customFilter({
                getFilter: filter => {
                  dateExpire = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateExpire || 0).format('YYYY-MM-DD')}</>;
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
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader',
              sort: true,
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
          fileName='Test Panel Mapping'
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
            lab('');
            panelCode('');
            testCode('');
            testName('');
            description('');
            status('');
            environment('');
          }}
        />
        <ModalReportOrder
          {...modalResultOrder}
          onClick={orderSeq => {
            props.onUpdateOrderSeq && props.onUpdateOrderSeq(orderSeq);
            setModalResultOrder({isVisible: false});
          }}
          onClose={() => {
            setModalResultOrder({isVisible: false});
          }}
        />
      </div>
    </>
  );
};
