import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'lodash';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
} from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import dayjs from 'dayjs';
import '@/library/components/organisms/style.css';

import {
  Buttons,
  Icons,
  Form,
  ColumnFilter,
  Tooltip,
} from '@/library/components';
import { Confirm } from '@/library/models';

import { PatientOrderExpandPackageList } from './patient-order-expand-package-list.component';
import { debounce } from '@/core-utils';
import { RouterFlow } from '@/flows';
import { useStores } from '@/stores';
import { useColumnManager } from '@/hooks/use-column-manager';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

interface PatientOrderExpandProps {
  id: string;
  data: any;
  totalSize?: number;
  searchPlaceholder?: string;
  page?: number;
  sizePerPage?: number;
  columns: any;
  fileName: string;
  isDelete?: boolean;
  isEditModify?: boolean;
  isExport?: boolean;
  isSelectRow?: boolean;
  isPagination?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, limit: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  clearAllFilter?: () => void;
  isHideForm?: boolean;
  setHideForm?: any;
  circleButtonDisable?: boolean;
}
export const PatientOrderExpand = ({
  id,
  data,
  totalSize = 10,
  searchPlaceholder = 'Search...',
  page = 0,
  sizePerPage = 10,
  columns,
  fileName,
  isEditModify,
  isDelete = true,
  isExport = true,
  isSelectRow,
  isPagination = true,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  clearAllFilter,
  isHideForm,
  setHideForm,
  circleButtonDisable,
}: PatientOrderExpandProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { routerStore } = useStores();

  const {
    isColumnFilterVisible,
    setIsColumnFilterVisible,
    currentColumns,
    handleColumnReorder,
    handleColumnToggle,
    filterableColumns,
    selectedColumns,
    columnOrder,
  } = useColumnManager(columns);

  const customTotal = (from, to, size) => {
    return (
      <>
        <div className='clearfix' />
        <span>
          Showing {from} to {to} of {size} Results
        </span>
      </>
    );
  };

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className='btn-group items-center flex flex-wrap ' role='group'>
      <div className='flex flex-wrap gap-4'>
        {isSelectRow && isDelete && (
          <Buttons.Button
            style={{ height: 40, width: 150 }}
            size='small'
            type='solid'
            onClick={() => {
              if (selectedRow) {
                onSelectedRow && onSelectedRow(selectedRow);
              } else {
                alert('Please select any item.');
              }
            }}
          >
            <Icons.EvaIcon
              icon='trash-outline'
              size='large'
              color='#ffffff'
              className='mr-1'
            />
            {'Remove Selected'}
          </Buttons.Button>
        )}
        {isPagination && (
          <>
            <input
              type='number'
              min='0'
              id={`number-${Date.now()}`}
              placeholder='No'
              onChange={(e: any) => {
                if (e.target.value) {
                  onSizePerPageChange(e.target.value);
                }
              }}
              className='mr-2 ml-2 leading-4 p-2 w-14 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md'
            />
            <div className='flex '>
              {options.map(option => (
                <button
                  key={option.text}
                  type='button'
                  onClick={() => onSizePerPageChange(option.page)}
                  className={`btn  ${
                    currSizePerPage === `${option.page}`
                      ? 'bg-primary'
                      : 'bg-grey'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
  const options = {
    cutome: true,
    totalSize: totalSize,
    paginationSize: 5,
    pageStartIndex: 0,
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
    disablePageTitle: true,
    paginationTotalRenderer: customTotal,
    hideSizePerPage: true,
    showTotal: false,
    alwaysShowAllBtns: true,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '30',
        value: 30,
      },
      {
        text: '40',
        value: 40,
      },
      {
        text: '50',
        value: 50,
      },
    ],
    hidePageListOnlyOnePage: true,
    sizePerPageRenderer: sizePerPageRenderer,
  };
  const searchProps: any = {
    placeholder: searchPlaceholder,
  };
  const handleOnSelect = (rows: any, isSelect) => {
    if (isSelect) {
      if (selectedRow) {
        const itemSelected: any[] = selectedRow;
        itemSelected.push(rows);
        setSelectedRow(itemSelected);
      } else {
        setSelectedRow([rows]);
      }
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      setSelectedRow(rows);
    }
  };

  const handleTableChange = (
    type,
    {
      data,
      cellEdit,
      page,
      sizePerPage,
      filters,
      sortField,
      sortOrder,
      searchText,
    },
  ) => {
    if (type === 'cellEdit' && isEditModify) {
      onUpdateItem &&
        onUpdateItem(cellEdit.newValue, cellEdit.dataField, cellEdit.rowId);
    }
    if (type === 'pagination' && _.isEmpty(filters)) {
      // if (sizePerPage > totalSize) return alert("You have not more records.")
      // if (page * sizePerPage > totalSize) return alert("You have not more records.")
      onPageSizeChange && onPageSizeChange(page, sizePerPage);
    }
    if (type === 'filter' || (type === 'pagination' && !_.isEmpty(filters))) {
      if (type === 'pagination') {
        if (sizePerPage > totalSize) return alert('You have not more records.');
        if (page * sizePerPage > totalSize)
          return alert('You have not more records.');
      }
      let filter: any = {};
      for (const [key, value] of Object.entries(filters)) {
        const values: any = value;
        const object = { [key]: values.filterVal };
        filter = Object.assign(filter, object);
      }
      if (onFilter) {
        debounce(() => {
          onFilter(
            type,
            filter,
            type === 'filter' && page === 1 ? 0 : page,
            sizePerPage,
          );
        });
      }
    }
    if (type === 'search') {
      debounce(() => {
        onFilter && onFilter(type, { srText: searchText }, page, sizePerPage);
      });
    }
    if (type === 'sort') {
      let result;
      if (sortOrder === 'asc') {
        result = data.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = data.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
    }
  };

  const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
    <div className='flex btn-group btn-group-toggle' data-toggle='buttons'>
      {columns
        .map(column => ({
          ...column,
          toggle: toggles[column.dataField],
        }))
        .map((column, index) => {
          if (index > 0) {
            return (
              <button
                type='button'
                key={column.dataField}
                className={` btn btn-primary border-white  btn-sm whitespace-nowrap ${
                  column.toggle ? 'active' : 'inactive'
                }`}
                style={{ height: '31px' }}
                data-toggle='button'
                aria-pressed={column.toggle ? 'true' : 'false'}
                onClick={() => onColumnToggle(column.dataField)}
              >
                {column.text}
              </button>
            );
          }
        })}
    </div>
  );

  const expandRow = {
    renderer: row => (
      <div className='z-0'>
        <PatientOrderExpandPackageList
          id='_id'
          data={row.packageList}
          totalSize={row.packageList.length}
          columns={[
            {
              dataField: 'panelCode',
              text: 'Panel Code',
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '190px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.panelName}>{cellContent}</span>
              ),
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'packageCode',
              text: 'Package Code',
              formatter: (cellContent, row) => (
                <>
                  <span>
                    {row.service === 'S' || row.service === 'M'
                      ? row.serviceType !== 'M' && row.packageCode
                      : row.service === 'N'
                      ? ''
                      : row.packageCode}
                  </span>
                </>
              ),
            },
            {
              dataField: 'serviceType',
              text: 'Service Type',
            },
            {
              dataField: 'department',
              text: 'Department',
            },
            {
              dataField: 'section',
              text: 'Section',
              formatter: (cellContent, row) => (
                <>
                  <span>{row.section?.code || ''}</span>
                </>
              ),
            },
            {
              dataField: 'pLab',
              text: 'PLab',
            },
            {
              dataField: 'rLab',
              text: 'RLab',
            },
            {
              dataField: 'reportGroup',
              text: 'Report Group',
            },
            {
              dataField: 'bill',
              text: 'Bill',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.bill} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'priceGroup',
              text: 'Price Group',
            },
            {
              dataField: 'priceList',
              text: 'Price List',
            },
            {
              dataField: 'grossAmount',
              text: 'Gross Amount',
            },

            {
              dataField: 'netAmount',
              text: 'Net Amount',
            },
            {
              dataField: 'discountAmount',
              text: 'Discount Amount',
            },
            {
              dataField: 'discountPer',
              text: 'Discount Per',
            },
            {
              dataField: 'miscellaneousCharges',
              text: 'Miscellaneous Charges',
            },
            {
              dataField: 'dueDate',
              text: 'Due Date',
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'resultDate',
              text: 'Result Date',
              editable: false,
              headerClasses: 'textHeaderl',
              formatter: (cell, row) => {
                return (
                  <>
                    {row.resultDate
                      ? dayjs(row?.resultDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'orderStatus',
              text: 'Order Status',
            },
            {
              dataField: 'status',
              text: 'Status',
            },
            {
              dataField: 'priority',
              text: 'Priority',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.priority}</span>
                  </>
                );
              },
            },
            {
              dataField: 'outsourceLab',
              text: 'Out Source Lab',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.outsourceLab}</span>
                  </>
                );
              },
            },
            {
              dataField: 'forceOutSource',
              text: 'Force Out Source',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.forceOutSource}</span>
                  </>
                );
              },
            },
            {
              dataField: 'osReceivedDate',
              text: 'OS Received Date',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.osReceivedDate}</span>
                  </>
                );
              },
            },
            {
              dataField: 'osReceivedBy',
              text: 'OS ReceivedBy',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.osReceivedBy}</span>
                  </>
                );
              },
            },
            {
              dataField: 'outsourceStatus',
              text: 'Out Source Status',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.outsourceStatus}</span>
                  </>
                );
              },
            },
            {
              dataField: 'receviedByDept',
              text: 'Recevied ByDept',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.receviedByDept}</span>
                  </>
                );
              },
            },
            {
              dataField: 'autoRelease',
              text: 'Auto Release',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.autoRelease}</span>
                  </>
                );
              },
            },
            {
              dataField: 'rep',
              text: 'Rep',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.rep}</span>
                  </>
                );
              },
            },
            {
              dataField: 'methodOn',
              text: 'MethodOn',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.methodOn}</span>
                  </>
                );
              },
            },
            {
              dataField: 'methodName',
              text: 'Method Name',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.methodName}</span>
                  </>
                );
              },
            },
            {
              dataField: 'reportOrder',
              text: 'Report Order',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.reportOrder}</span>
                  </>
                );
              },
            },
            {
              dataField: 'confidential',
              text: 'Confidential',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.confidential} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'cretical',
              text: 'Cretical',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.cretical} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'abnFlag',
              text: 'Abn Flag',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.abnFlag} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'workflow',
              text: 'Workflow',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.workflow}</span>
                  </>
                );
              },
            },
            {
              dataField: 'loginServgrp',
              text: 'Login Servgrp',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.loginServgrp}</span>
                  </>
                );
              },
            },
            {
              dataField: 'currentServgrp',
              text: 'Current Servgrp',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.currentServgrp}</span>
                  </>
                );
              },
            },
            {
              dataField: 'routingStatus',
              text: 'Routing Status',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.routingStatus}</span>
                  </>
                );
              },
            },
            {
              dataField: 'recvTime',
              text: 'Recv Time',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.recvTime}</span>
                  </>
                );
              },
            },
            {
              dataField: 'outSourceOrdno',
              text: 'Out Source Ordno',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.outSourceOrdno}</span>
                  </>
                );
              },
            },
            {
              dataField: 'deptOutSource',
              text: 'Dept Out Source',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.deptOutSource}</span>
                  </>
                );
              },
            },
            {
              dataField: 'comment',
              text: 'Comment',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.comment}</span>
                  </>
                );
              },
            },
            {
              dataField: 'externalPanelCode',
              text: 'External Panel Code',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.externalPanelCode}</span>
                  </>
                );
              },
            },
          ]}
          onSelectedRow={rows => {}}
          onUpdateItem={(value: any, dataField: string, id: string) => {}}
        />
      </div>
    ),
    showExpandColumn: true,
  };

  return (
    <PaginationProvider
      pagination={paginationFactory(
        totalSize !== 0 ? options : { page, sizePerPage, totalSize },
      )}
      keyField={id}
      columns={currentColumns}
      data={data}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider
          keyField={id}
          bootstrap4
          data={data}
          columns={currentColumns}
          search
          exportCSV={{
            fileName: `${fileName}_${dayjs(new Date()).format(
              'YYYY-MM-DD HH:mm',
            )}.csv`,
            noAutoBOM: false,
            blobType: 'text/csv;charset=ansi',
            exportAll: false,
            onlyExportFiltered: true,
          }}
          columnToggle
        >
          {props => (
            <div>
              <div className='flex flex-row justify-between items-center flex-wrap'>
                <div className='flex items-center flex-wrap'>
                  <div className='mt-2'>
                    <SearchBar
                      {...searchProps}
                      {...props.searchProps}
                      onChange={value => {
                        console.log({ value });
                      }}
                    />
                  </div>
                  <ClearSearchButton
                    className={
                      'inline-flex ml-2 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white'
                    }
                    {...props.searchProps}
                  />
                  <button
                    className={
                      'ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white'
                    }
                    onClick={clearAllFilter}
                  >
                    Clear all filters
                  </button>
                  <ExportCSVButton
                    className={
                      'inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white'
                    }
                    {...props.csvProps}
                  >
                    Export CSV!!
                  </ExportCSVButton>

                  <div className='ml-2 relative'>
                    <Tooltip tooltipText={'Field Selector'}>
                      <Buttons.Button
                        size='medium'
                        type='outline'
                        onClick={() => {
                          setIsColumnFilterVisible(!isColumnFilterVisible);
                        }}
                      >
                        <Icons.IconFa.FaFilter />
                      </Buttons.Button>
                    </Tooltip>
                    {isColumnFilterVisible && (
                      <ColumnFilter
                        columns={filterableColumns}
                        onClose={() => setIsColumnFilterVisible(false)}
                        onColumnReorder={handleColumnReorder}
                        onColumnToggle={handleColumnToggle}
                        selectedColumns={selectedColumns}
                        columnOrder={columnOrder}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='scrollTable'>
                {currentColumns.length > 1 ? (
                  <BootstrapTable
                    remote
                    {...props.baseProps}
                    noDataIndication='Table is Empty'
                    hover
                    {...paginationTableProps}
                    filter={filterFactory()}
                    selectRow={
                      isSelectRow
                        ? {
                            mode: 'checkbox',
                            onSelect: handleOnSelect,
                            onSelectAll: handleOnSelectAll,
                          }
                        : undefined
                    }
                    cellEdit={
                      isEditModify
                        ? cellEditFactory({
                            mode: 'dbclick',
                            blurToSave: true,
                          })
                        : undefined
                    }
                    headerClasses='bg-gray-500 text-white whitespace-nowrap z-0'
                    onTableChange={handleTableChange}
                    expandRow={expandRow}
                  />
                ) : (
                  <div className='mt-4 text-center'>No columns selected</div>
                )}
              </div>

              <div>
                <SizePerPageDropdownStandalone
                  {...Object.assign(
                    {},
                    { ...paginationProps, hideSizePerPage: false },
                  )}
                />
              </div>
              {isPagination && (
                <>
                  <div className='flex items-center gap-2 mt-2 flex-wrap'>
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                  <div className='flex items-center gap-2 mt-2 '>
                    <PaginationTotalStandalone {...paginationProps} />
                  </div>
                </>
              )}
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
