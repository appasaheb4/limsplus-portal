import React, { useState } from 'react';
import dayjs from 'dayjs';
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
  ModalDateTime,
  DateRangeFilter,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectPanelCode,
  ServiceType,
} from '../index';
import { ModalReportOrder } from './modal-report-order.component';

let dateCreation;
let dateActive;
let dateExpire;
let version;
let enteredBy;
let lab;
let packageCode;
let packageName;
let panelCode;
let panelName;
let status;
let serviceType;
let environment;
let companyCode;

interface PackageMasterListProps {
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
  onUpdateOrderSeq?: (orderSeq: any) => void;
  onApproval: (record: any) => void;
  onSingleDirectUpdateField?: (
    value: any,
    dataField: string,
    id: string,
  ) => void;
}

export const PackageMasterList = (props: PackageMasterListProps) => {
  const [modalResultOrder, setModalResultOrder] = useState<any>();
  const [modalDetails, setModalDetails] = useState<any>();
  const editorCell = (row: any) => {
    return row.status !== 'I';
  };
  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);

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
            editable: false,
          },
          {
            dataField: 'lab',
            text: 'Lab',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Lab',
              getFilter: filter => {
                lab = filter;
              },
            }),
            editable: editorCell,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <AutoCompleteFilterSingleSelectLabs
                onSelect={item => {
                  props.onUpdateItem &&
                    props.onUpdateItem(item.code, column.dataField, row._id);
                }}
              />
            ),
          },
          {
            dataField: 'packageCode',
            text: 'Package Code',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: editorCell,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Package Code',
              getFilter: filter => {
                packageCode = filter;
              },
            }),
          },
          {
            dataField: 'packageName',
            text: 'Package Name',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: editorCell,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Package Name',
              getFilter: filter => {
                packageName = filter;
              },
            }),
          },
          {
            dataField: 'serviceType',
            text: 'Service Type',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: editorCell,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Service Type',
              getFilter: filter => {
                serviceType = filter;
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
              <ServiceType
                value={row?.serviceType}
                isError={false}
                onUpdate={serviceItem => {
                  props.onUpdateFileds &&
                    props.onUpdateFileds(
                      {
                        serviceType: serviceItem.code,
                        packageName: undefined,
                        panelCode: [],
                        panelName: [],
                      },
                      row._id,
                    );
                }}
              />
            ),
          },
          {
            dataField: 'panelCode',
            text: 'Panel Code',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: editorCell,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Panel Code',
              getFilter: filter => {
                panelCode = filter;
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
              <AutoCompleteFilterSingleSelectPanelCode
                lab={row.lab}
                serviceType={row.serviceType}
                onSelect={item => {
                  props.onUpdateFileds &&
                    props.onUpdateFileds(
                      {
                        panelCode: [item.panelCode],
                        panelName: [item.panelName],
                      },
                      row._id,
                    );
                }}
              />
            ),
          },
          {
            dataField: 'panelName',
            text: 'Panel Name',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: editorCell,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Panel Name',
              getFilter: filter => {
                panelName = filter;
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
              <AutoCompleteFilterSingleSelectPanelCode
                lab={row.lab}
                serviceType={row.serviceType}
                onSelect={item => {
                  props.onUpdateFileds &&
                    props.onUpdateFileds(
                      {
                        panelCode: [item.panelCode],
                        panelName: [item.panelName],
                      },
                      row._id,
                    );
                }}
              />
            ),
          },
          {
            dataField: 'reportOrder',
            text: 'Report Order',
            headerClasses: 'textHeader5',
            editable: false,
            sort: true,
            formatter: (cell, row) => {
              return (
                <div className=' flex flex-row justify-around'>
                  <span>{row?.reportOrder}</span>
                  <button
                    disabled={!editorCell(row)}
                    className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    onClick={() => {
                      setModalResultOrder({
                        isVisible: true,
                        title: 'Report Order',
                        packageCode: row.packageCode,
                      });
                    }}
                  >
                    Modify
                  </button>
                </div>
              );
            },
          },
          // {
          //   dataField: 'bill',
          //   text: 'Bill',
          //   sort: true,
          //   csvFormatter: (row, col) =>
          //     `${row.bill ? (row.bill ? 'Yes' : 'No') : 'No'}`,
          //   editable: false,
          //   formatter: (cell, row) => {
          //     return (
          //       <Form.Toggle
          //         disabled={!editorCell(row)}
          //         value={row.bill}
          //         onChange={bill => {
          //           props.onUpdateItem &&
          //             props.onUpdateItem(bill, 'bill', row._id);
          //         }}
          //       />
          //     );
          //   },
          // },
          {
            dataField: 'printPackageName',
            text: 'Print Package Name',
            sort: true,
            csvFormatter: (row, col) =>
              `${row.printPackageName ? 'Yes' : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <Form.Toggle
                  disabled={!editorCell(row)}
                  value={row.printPackageName}
                  onChange={printPackageName => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        printPackageName,
                        'printPackageName',
                        row._id,
                      );
                  }}
                />
              );
            },
          },
          {
            dataField: 'printPanelName',
            text: 'Print Panel Name',
            sort: true,
            csvFormatter: (row, col) => `${row.printPanelName ? 'Yes' : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
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
              );
            },
          },
          {
            dataField: 'packageInterpretation',
            text: 'Package Interpretation',
            sort: true,
            csvFormatter: (row, col) =>
              `${row.packageInterpretation ? 'Yes' : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <Form.Toggle
                  disabled={!editorCell(row)}
                  value={row.packageInterpretation}
                  onChange={packageInterpretation => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        packageInterpretation,
                        'packageInterpretation',
                        row._id,
                      );
                  }}
                />
              );
            },
          },
          {
            dataField: 'panelInterpretation',
            text: 'Panel Interpretation',
            sort: true,
            csvFormatter: (row, col) =>
              `${row.panelInterpretation ? 'Yes' : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
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
              );
            },
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
            editable: (content, row) =>
              row.status !== 'D' && row.status !== 'I',
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <select
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                value={value}
                onChange={e => {
                  const status = e.target.value;
                  props.onUpdateItem &&
                    props.onUpdateItem(status, column.dataField, row._id);
                }}
              >
                <option value=''>Select</option>
                {lookupItems(props.extraData.lookupItems, 'STATUS')
                  .filter(item => item.code !== 'D')
                  .map((item, index) => (
                    <option key={index} value={item.code}>
                      {lookupValue(item)}
                    </option>
                  ))}
              </select>
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
              placeholder: 'Entered By',
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
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            csvFormatter: (col, row) =>
              row.dateCreation
                ? dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')
                : '',
            filter: customFilter({
              getFilter: filter => {
                dateCreation = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => (
              <>{dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')}</>
            ),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <Form.InputDateTime
                value={new Date(row.dateCreation)}
                onFocusRemove={dateCreation => {
                  props.onUpdateItem &&
                    props.onUpdateItem(dateCreation, column.dataField, row._id);
                }}
              />
            ),
          },
          {
            dataField: 'dateActive',
            text: 'Date Active',
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            csvFormatter: (col, row) =>
              row.dateActive
                ? dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')
                : '',
            editable: false,
            filter: customFilter({
              getFilter: filter => {
                dateActive = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => (
              <>{dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')}</>
            ),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <Form.InputDateTime
                value={new Date(row.dateActive)}
                onFocusRemove={dateActive => {
                  props.onUpdateItem &&
                    props.onUpdateItem(dateActive, column.dataField, row._id);
                }}
              />
            ),
          },
          {
            dataField: 'dateExpire',
            editable: editorCell,
            text: 'Date Expiry',
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            csvFormatter: (col, row) =>
              row.dateExpire
                ? dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')
                : '',
            filter: customFilter({
              getFilter: filter => {
                dateExpire = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => (
              <>{dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')}</>
            ),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <ModalDateTime
                visible={true}
                use12Hours={false}
                data={row.dateExpire}
                isSingleDatePicker={true}
                isDateTimePicker={false}
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
                  setModalDetails({ visible: false });
                }}
              />
            ),
          },
          {
            dataField: 'version',
            text: 'Version',
            headerClasses: 'textHeader3',
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
              placeholder: 'Company Code',
              getFilter: filter => {
                companyCode = filter;
              },
            }),
            headerClasses: 'textHeader2',
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
            formatter: (cellContent, row) => (
              <div className='flex flex-row'>
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
                      <Tooltip className='ml-2' tooltipText='Version Upgrade'>
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
                      <Tooltip className='ml-2' tooltipText='Duplicate'>
                        <Icons.IconContext
                          color='#ffffff'
                          size='20'
                          onClick={() =>
                            props.onDuplicate && props.onDuplicate(row)
                          }
                        >
                          {Icons.getIconTag(Icons.Iconio5.IoDuplicateOutline)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                  </>
                )}
                {row.status === 'D' && (
                  <Tooltip tooltipText='Approval'>
                    <Icons.RIcon
                      nameIcon='AiOutlineCheckCircle'
                      propsIcon={{ size: 24, color: '#ffffff' }}
                      onClick={() => props.onApproval(row)}
                    />
                  </Tooltip>
                )}
              </div>
            ),
            headerClasses: 'sticky right-0 bg-gray-500 text-white z-50',
            classes: 'sticky right-0 bg-gray-500',
            style: (cell, row, rowIndex) => ({
              zIndex: props.data?.length - rowIndex,
            }),
          },
        ]}
        isDelete={props.isDelete}
        isEditModify={props.isUpdate}
        isExport={props.isExport}
        isSelectRow={true}
        fileName='Package Master'
        onSelectedRow={rows => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map(item => item._id));
        }}
        onUpdateItem={(value, dataField, id) => {
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
          packageCode('');
          packageName('');
          panelCode('');
          panelName('');
          status('');
          serviceType('');
          environment('');
          companyCode('');
        }}
        dynamicStylingFields={[
          'lab',
          'serviceType',
          'packageCode',
          'panelCode',
          'status',
          'environment',
        ]}
        hideExcelSheet={['_id', 'operation']}
      />
      <ModalReportOrder
        {...modalResultOrder}
        onClick={orderSeq => {
          props.onUpdateOrderSeq && props.onUpdateOrderSeq(orderSeq);
          setModalResultOrder({ isVisible: false });
        }}
        onClose={() => {
          setModalResultOrder({ isVisible: false });
        }}
      />
    </div>
  );
};
