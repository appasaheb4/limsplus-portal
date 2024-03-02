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

interface TableBootstrapReportProps {
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
  isPagination?: boolean;
  onDelete?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, limit: number) => void;
  onPagination?: (type: string) => void;
  onUpdateDeliveryStatus?: () => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  clearAllFilter?: () => void;
  onClickRow?: (item: any, index: number) => void;
  onFindDeliveryStatus?: (item: string) => void;
}
export const TableBootstrapReport = ({
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
  isPagination = true,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onUpdateDeliveryStatus,
  onFilter,
  onPagination,
  clearAllFilter,
  onClickRow,
  onFindDeliveryStatus,
}: TableBootstrapReportProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

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
    { code: 'Hold', value: 'Hold', color: 'green' },
    { code: 'Cancel', value: 'Cancel', color: 'red' },
    { code: 'Done', value: 'Done', color: 'orange' },
    { code: 'All', value: 'All', color: 'red' },
  ];

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
    // console.log({type});
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

  const rowStyle = (row, rowIndex) => {
    if (row?.isAnyCritical || (row?.isAnyABNFlag && row?.isAnyCritical)) {
      return {
        backgroundColor: '#FF0000',
        color: '#FFFF00',
      };
    } else if (row?.isAnyABNFlag) {
      return {
        backgroundColor: '#FFFF00',
        color: '#FF0000',
      };
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
                  style={{ marginTop: 10 }}
                />
                <ClearSearchButton
                  className={`inline-flex bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white`}
                  {...props.searchProps}
                />
                <button
                  className={`px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white`}
                  onClick={clearAllFilter}
                >
                  Clear all filters
                </button>
                {isExport && (
                  <ExportCSVButton
                    className={`inline-flex bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white`}
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
                <Tooltip
                  tooltipText='All generate report update'
                  position='top'
                >
                  <Buttons.Button
                    size='medium'
                    type='outline'
                    disabled={
                      !data.some(item => item.deliveryStatus === 'Pending')
                    }
                    onClick={() => {
                      onUpdateDeliveryStatus && onUpdateDeliveryStatus();
                    }}
                  >
                    <Icons.IconTb.TbExchange />
                  </Buttons.Button>
                </Tooltip>
                <div className='flex gap-2'>
                  {statusData.map(status => (
                    <button
                      key={status.code}
                      className={`px-2 py-2 bg-${status.color}-600 text-white rounded w-20`}
                      onClick={() => onFindDeliveryStatus?.(status.code)}
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
              <div className='scrollTable'>
                <BootstrapTable
                  remote
                  {...props.baseProps}
                  noDataIndication='Table is Empty'
                  hover
                  {...paginationTableProps}
                  filter={filterFactory()}
                  headerClasses='bg-gray-500 text-white whitespace-nowrap'
                  onTableChange={handleTableChange}
                  rowStyle={rowStyle}
                />
              </div>

              <div className='flex items-center gap-2 mt-2'>
                <Icons.IconContext
                  color='#fff'
                  size='25'
                  style={{
                    backgroundColor: '#808080',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    align: 'center',
                    padding: 4,
                  }}
                  onClick={async () => {
                    onPagination && onPagination('next');
                  }}
                >
                  <Icons.IconBi.BiSkipNext />
                </Icons.IconContext>
                <Icons.IconContext
                  color='#fff'
                  size='25'
                  style={{
                    backgroundColor: '#808080',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    align: 'center',
                    padding: 4,
                  }}
                  onClick={async () => {
                    onPagination && onPagination('prev');
                  }}
                >
                  <Icons.IconBi.BiSkipPrevious />
                </Icons.IconContext>
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
