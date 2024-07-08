import React, { useState, useRef, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'lodash';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import dayjs from 'dayjs';
import '@/library/components/organisms/style.css';

import { Buttons, Icons } from '@/library/components';
import { Confirm } from '@/library/models';

import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { debounce } from '@/core-utils';
import { PatientDemographicsList } from '../patient-demographics/patient-demographics-list.components';
import { ColumnFilter } from '@/library/components/organisms/table-bootstrap/custom-toggle-list.component';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

interface GeneralResultEntryExpandProps {
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
  isFinishResultDisable?: boolean;
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
  onFinishResult?: (selectedRow: any) => void;
  clearAllFilter?: () => void;
  onFilterFinishResult?: (code: string) => void;
  onTestStatusFilter?: (code: string) => void;
  onTableReload?: () => void;
  selectedRowData?: any;
}
export const GeneralResultEntryExpand = ({
  id,
  data,
  totalSize = 10,
  searchPlaceholder = 'Search...',
  page = 0,
  sizePerPage = 10,
  columns,
  fileName,
  isDelete = true,
  isEditModify,
  isExport = true,
  isSelectRow,
  isFinishResultDisable = true,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  onFinishResult,
  clearAllFilter,
  onFilterFinishResult,
  onTestStatusFilter,
  onTableReload,
  selectedRowData,
}: GeneralResultEntryExpandProps) => {
  const selectedRow = useRef<any[]>([]);

  const [filterStatus, setFilterStatus] = useState('P');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isColumnFilterVisible, setIsColumnFilterVisible] =
    useState<boolean>(false);
  const [currentColumns, setCurrentColumns] = useState(columns);
  const [columnOrder, setColumnOrder] = useState(columns);

  useEffect(() => {
    const selectedColumns = columnOrder.filter(col =>
      currentColumns.some(c => c.dataField === col.dataField),
    );
    setCurrentColumns(
      selectedColumns.length > 0
        ? [...selectedColumns, columns[columns.length - 1]]
        : [],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder]);

  const handleColumnReorder = newColumns => {
    setColumnOrder(newColumns);
  };

  const handleColumnToggle = selectedColumns => {
    const newColumns = columnOrder.filter(column =>
      selectedColumns.includes(column.dataField),
    );
    setCurrentColumns(
      newColumns.length > 0 ? [...newColumns, columns[columns.length - 1]] : [],
    );
  };

  // Filter out the "Action" and "Id" columns for the ColumnFilter component
  const filterableColumns = columns.filter(
    column => column.dataField !== 'operation' && column.dataField !== '_id',
  );
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
    <div className='btn-group items-center' role='group'>
      <input
        type='number'
        min='0'
        placeholder='No'
        onChange={e => {
          if (e.target.value) {
            onSizePerPageChange(e.target.value);
          }
        }}
        className='mr-2 ml-2 leading-4 p-2 w-14 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md'
      />
      {options.map(option => (
        <button
          key={option.text}
          type='button'
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${
            currSizePerPage === `${option.page}` ? 'bg-primary' : 'bg-grey'
          }`}
        >
          {option.text}
        </button>
      ))}
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
    <div className='btn-group btn-group-toggle' data-toggle='buttons'>
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
                className={`btn btn-primary btn-sm whitespace-nowrap border-white ${
                  column.toggle ? 'active' : 'inactive'
                }`}
                data-toggle='button'
                aria-pressed={column.toggle ? 'true' : 'false'}
                onClick={() => onColumnToggle(column.dataField)}
              >
                {column.text}
              </button>
            );
          } else {
            return null; // Add this line to return null for the first item
          }
        })}
    </div>
  );

  const rowStyle = (row, rowIndex) => {
    switch (row?.colorScheme?.envRangeColor) {
      case 'BOTH':
        return {
          backgroundColor: row?.colorScheme?.cellColor,
          color: row?.colorScheme?.fontColor,
        };
        break;
      case 'BACKGROUND':
        return {
          backgroundColor: row?.colorScheme?.cellColor,
        };
        break;
      case 'FONT':
        return {
          color: row?.colorScheme?.fontColor,
        };
        break;
      default:
        break;
    }
  };

  const StatusCircle = ({ status, color, onClick }) => {
    return (
      <div
        className={`w-5 h-5 bg-${color}-600 rounded-3xl px-2.5 mx-1.5 border-solid`}
        onClick={onClick}
      >
        {status}
      </div>
    );
  };

  const handleOnSelect = (rows: any, isSelect) => {
    onTableReload && onTableReload();
    let itemSelected: any[] = selectedRow.current;
    if (isSelect) {
      if (selectedRow.current) {
        itemSelected.push(rows);
        // selectedRow.current = itemSelected;
      } else {
        itemSelected = [rows];
      }
    } else {
      itemSelected.pop();
    }
    selectedRow.current = itemSelected;
  };

  const handleOnSelectAll = (isSelect, rows) => {
    let itemSelected;
    onTableReload && onTableReload();
    if (isSelect) {
      itemSelected = rows;
    } else {
      itemSelected = [];
    }
    selectedRow.current = itemSelected;
  };

  const statusData = [
    { code: 'P', value: 'Pending', color: 'blue' },
    { code: 'RC', value: 'Recheck', color: 'orange' },
    { code: 'RT', value: 'Retest', color: 'pink' },
    { code: 'D', value: 'Done', color: 'green' },
    { code: '', value: 'All', color: 'red' },
  ];

  const testStatus = [
    { code: 'N', value: 'Normal', color: 'blue' },
    { code: 'A', value: 'Abnormal', color: 'yellow' },
    { code: 'C', value: 'Critical', color: 'green' },
    // { code: '', value: 'All', color: 'red' },
  ];

  const resultSubmitHandler = (rowStatus: string) => {
    switch (rowStatus) {
      case 'D':
        return (
          <button
            disabled={
              selectedRow.current?.length > 0
                ? false && isFinishResultDisable
                : true
            }
            className={
              'py-2 mt-1 w-24 focus:outline-none bg-blue-600 items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed'
            }
            onClick={() =>
              onFinishResult && onFinishResult(selectedRow.current)
            }
          >
            Submit
          </button>
        );
      case 'P' || 'RC' || 'RT':
        return (
          <button
            className={
              'py-2 mt-1 w-24 focus:outline-none bg-blue-600 items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed'
            }
            onClick={() => {}}
          >
            Save
          </button>
        );

      default:
        break;
    }
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
              <div className='flex flex-row items-center flex-wrap justify-between'>
                <div className='w-3/4 flex align-middle items-center'>
                  <div className='mt-2'>
                    <SearchBar
                      // {...searchProps}
                      {...props.searchProps}
                      onChange={value => {
                        console.log({ value });
                      }}
                    />
                  </div>
                  {isExport && (
                    <ExportCSVButton
                      className={
                        'bg-gray-500 px-3.5 py-1 ml-2 mr-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed'
                      }
                      {...props.csvProps}
                    >
                      Export CSV!!
                    </ExportCSVButton>
                  )}
                  <div className='ml-2 relative'>
                    <Buttons.Button
                      size='medium'
                      type='outline'
                      onClick={() => {
                        setIsColumnFilterVisible(!isColumnFilterVisible);
                      }}
                    >
                      <Icons.IconFa.FaFilter />
                    </Buttons.Button>
                    {isColumnFilterVisible && (
                      <ColumnFilter
                        columns={filterableColumns}
                        onClose={() => setIsColumnFilterVisible(false)}
                        onColumnReorder={handleColumnReorder}
                        onColumnToggle={handleColumnToggle}
                      />
                    )}
                  </div>
                  <div className='flex flex-wrap gap-0'>
                    {statusData.map(status => (
                      <button
                        key={status.code}
                        className={`bg-${status.color}-600 ml-2 px-3.5 py-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => {
                          setFilterStatus(status.code);
                          onFilterFinishResult &&
                            onFilterFinishResult(status.code);
                        }}
                      >
                        {status.value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className='flex justify-end gap-1'>
                  {testStatus.map(status => (
                    <button
                      key={status.code}
                      className={`bg-${status.color}-600 px-3.5 py-2 focus:outline-none  items-center  outline shadow-sm  font-medium  text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => {
                        setFilterStatus(status.code);
                        onTestStatusFilter?.(status.code);
                      }}
                    >
                      {status.value}
                    </button>
                  ))}
                </div>
              </div>
              {isFilterOpen && (
                <div className={'mb-2 overflow-y-hidden h-12 mt-1'}>
                  <CustomToggleList
                    contextual='primary'
                    className='list-custom-class'
                    btnClassName='list-btn-custom-class'
                    {...props.columnToggleProps}
                  />
                </div>
              )}
              {selectedRowData?.length > 0 && (
                <>
                  <div className='mt-2'>
                    <span className='text-lg font-bold leading-4 mt-2'>
                      Patient Demographics
                    </span>
                    <PatientDemographicsList
                      data={selectedRowData || []}
                      totalSize={selectedRowData?.length}
                    />
                  </div>
                </>
              )}
              <div className='scrollTable h-[calc(100vh_-_50vh)] mt-1'>
                {currentColumns.length > 1 ? (
                  <BootstrapTable
                    keyField='_id'
                    remote
                    {...props.baseProps}
                    noDataIndication='Table is Empty'
                    hover
                    {...paginationTableProps}
                    filter={filterFactory()}
                    selectRow={{
                      mode: 'checkbox',
                      style: { backgroundColor: '#c8e6c9' },
                      hideSelectColumn: filterStatus == 'D' ? false : true,
                      onSelect: handleOnSelect,
                      onSelectAll: handleOnSelectAll,
                    }}
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
                    rowStyle={rowStyle}
                  />
                ) : (
                  <div className='mt-4 text-center'>No columns selected</div>
                )}
              </div>
              {resultSubmitHandler(filterStatus)}
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
