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

import { Buttons, Icons } from '@/library/components';
import { Confirm } from '@/library/models';

// import * as Config from "@/config"
import { PatientTestExpandByTestId } from './patient-test-expand-by-test-Id.component';
import { debounce } from '@/core-utils';
import { ColumnFilter } from '@/library/components/organisms/table-bootstrap/custom-toggle-list.component';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

interface PatientTestExpandPanelProps {
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
}
export const PatientTestExpandPanel = ({
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
  isPagination = true,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  clearAllFilter,
}: PatientTestExpandPanelProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
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
        <PatientTestExpandByTestId
          id='_id'
          data={row.panelMasterList || []}
          totalSize={row.panelMasterList?.length}
          columns={[
            {
              dataField: 'panelCode',
              text: 'Panel Code',
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
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
                {isExport && (
                  <ExportCSVButton
                    className={
                      'inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white'
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
              </div>
              {isFilterOpen && (
                <div className={'mb-2 flex overflow-auto'}>
                  <CustomToggleList
                    contextual='primary'
                    className='list-custom-class'
                    btnClassName='list-btn-custom-class'
                    {...props.columnToggleProps}
                  />
                </div>
              )}
              <div className='scrollTable'>
                {currentColumns.length > 1 ? (
                  <BootstrapTable
                    remote
                    {...props.baseProps}
                    noDataIndication='Table is Empty'
                    hover
                    {...paginationTableProps}
                    filter={filterFactory()}
                    // selectRow={
                    //   isSelectRow
                    //     ? {
                    //         mode: "checkbox",
                    //         onSelect: handleOnSelect,
                    //         onSelectAll: handleOnSelectAll,
                    //       }
                    //     : undefined
                    // }
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
                    //expandRow={expandRow}
                  />
                ) : (
                  <div className='mt-4 text-center'>No columns selected</div>
                )}
              </div>
              {isPagination && (
                <>
                  <div className='flex items-center gap-2 mt-2'>
                    <SizePerPageDropdownStandalone
                      {...Object.assign(
                        {},
                        { ...paginationProps, hideSizePerPage: false },
                      )}
                    />
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                  <div className='flex items-center gap-2 mt-2'>
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
