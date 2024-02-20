/* eslint-disable */
import React, { useState } from 'react';
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
import { debounce } from '@/core-utils';

import { Buttons, Icons, Tooltip } from '@/library/components';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

interface TableBootstrapProps {
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
  selectedItem?: any;
  onDelete?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any, type: string) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, limit: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  clearAllFilter?: () => void;
  onClickRow?: (item: any, index: number) => void;
  onFilterRecord?: (item: any) => void;
}
export const TableBootstrap = ({
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
  selectedItem,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  clearAllFilter,
  onClickRow,
  onFilterRecord,
}: TableBootstrapProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

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

  const statusData = [
    { code: 'Pending', value: 'Pending', color: 'blue' },
    { code: 'Recheck', value: 'Recheck', color: 'yellow' },
    { code: 'Retest', value: 'Retest', color: 'orange' },
    { code: 'Hold', value: 'Hold', color: 'indigo' },
    { code: 'Recall', value: 'Recall', color: 'gray' },
  ];

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className='btn-group items-center' role='group'>
      {isSelectRow && (
        <div className='flex flex-row gap-1 border-solid border-2 p-1'>
          <Tooltip tooltipText='Approved'>
            <Icons.IconContext
              color='#fff'
              size='30'
              onClick={() => {
                onSelectedRow && onSelectedRow(selectedRow, 'Approved');
              }}
            >
              {Icons.getIconTag(Icons.Iconai.AiFillCheckCircle)}
            </Icons.IconContext>
          </Tooltip>
          <Tooltip tooltipText='Rejected'>
            <Icons.IconContext
              color='#fff'
              size='30'
              onClick={() => {
                onSelectedRow && onSelectedRow(selectedRow, 'Rejected');
              }}
            >
              {Icons.getIconTag(Icons.Iconai.AiFillCloseCircle)}
            </Icons.IconContext>
          </Tooltip>
        </div>
      )}
      <input
        type='number'
        min='0'
        placeholder='No'
        onChange={(e: any) => {
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
          className={`btn  ${
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

  let searchProps: any = {
    placeholder: searchPlaceholder,
  };

  const handleOnSelect = (rows: any, isSelect) => {
    if (isSelect) {
      if (selectedRow) {
        let itemSelected: any[] = selectedRow;
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
      if (onFilter)
        debounce(() => {
          onFilter(
            type,
            filter,
            type === 'filter' && page === 1 ? 0 : page,
            sizePerPage,
          );
        });
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
                className={` btn btn-primary  btn-sm whitespace-nowrap ${
                  column.toggle ? 'active' : ''
                }`}
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

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      onClickRow && onClickRow(row, rowIndex);
    },
  };

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

  return (
    <PaginationProvider
      pagination={paginationFactory(
        totalSize !== 0 ? options : { page, sizePerPage, totalSize },
      )}
      keyField={id}
      columns={columns}
      data={data}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider
          keyField={id}
          bootstrap4
          data={data}
          columns={columns}
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
              <div className='flex items-center gap-2 flex-wrap'>
                <SearchBar
                  {...searchProps}
                  {...props.searchProps}
                  onChange={value => {
                    console.log({ value });
                  }}
                />
                <ClearSearchButton
                  className={`inline-flex ml-4 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white`}
                  {...props.searchProps}
                />
                <button
                  className={`ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white`}
                  onClick={clearAllFilter}
                >
                  Clear all filters
                </button>
                {isExport && (
                  <ExportCSVButton
                    className={`inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white`}
                    {...props.csvProps}
                  >
                    Export CSV!!
                  </ExportCSVButton>
                )}

                {isFilterOpen ? (
                  <Buttons.Button
                    size='medium'
                    type='outline'
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen);
                    }}
                  >
                    <Icons.IconFa.FaChevronUp />
                  </Buttons.Button>
                ) : (
                  <Buttons.Button
                    size='medium'
                    type='outline'
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen);
                    }}
                  >
                    <Icons.IconFa.FaChevronDown />
                  </Buttons.Button>
                )}
                <div className='flex gap-4'>
                  {statusData.map(status => (
                    <button
                      key={status.code}
                      className={`bg-${status.color}-600 ml-2 px-4 py-2 focus:outline-none items-center outline shadow-sm font-medium w-28 text-center rounded-md h-9 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => onFilterRecord?.(status.value)}
                    >
                      {status.value}
                    </button>
                  ))}
                </div>
              </div>
              {isFilterOpen && (
                <div className={'mb-2 overflow-auto h-10'}>
                  <CustomToggleList
                    contextual='primary'
                    className='list-custom-class'
                    btnClassName='list-btn-custom-class'
                    {...props.columnToggleProps}
                  />
                </div>
              )}
              <div className='scrollTable mb-2'>
                <BootstrapTable
                  remote
                  {...props.baseProps}
                  noDataIndication='Table is Empty'
                  hover
                  {...paginationTableProps}
                  filter={filterFactory()}
                  headerClasses='bg-gray-500 text-white whitespace-nowrap'
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
                  rowEvents={rowEvents}
                  rowStyle={rowStyle}
                  onTableChange={handleTableChange}
                />
              </div>
              <div className='flex  items-center   p-2 justify-start gap-2 bg-[#6A727F] rounded-md   text-white w-full'>
                <div className='flex items-center gap-2 '>
                  <SizePerPageDropdownStandalone
                    {...Object.assign(
                      {},
                      { ...paginationProps, hideSizePerPage: false },
                    )}
                  />
                  <PaginationListStandalone {...paginationProps} />
                </div>
                <div className='flex items-center gap-2'>
                  <PaginationTotalStandalone {...paginationProps} />
                </div>
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
