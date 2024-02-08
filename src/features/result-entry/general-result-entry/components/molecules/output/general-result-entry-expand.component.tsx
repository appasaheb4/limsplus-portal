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
} from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import dayjs from 'dayjs';
import '@/library/components/organisms/style.css';

import { Buttons, Icons } from '@/library/components';
import { Confirm } from '@/library/models';

import { RefRangesExpandList } from './ref-ranges-expand-list.component';
import { debounce } from '@/core-utils';

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
  onFinishResult?: () => void;
  clearAllFilter?: () => void;
  onFilterFinishResult?: (code: string) => void;
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
}: GeneralResultEntryExpandProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusClick = code => {
    onFilterFinishResult?.(code);
  };

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
                className={` btn btn-primary btn-sm whitespace-nowrap ${
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

  const expandRow = {
    renderer: row =>
      row?.resultType === 'V' ? (
        <div className='z-0'>
          <h1 className='hidden'>{JSON.stringify(row)}</h1>
          <RefRangesExpandList
            id='_id'
            data={row?.refRangesList || []}
            totalSize={row?.refRangesList?.length || 0}
            columns={[
              {
                dataField: 'result',
                text: 'Result',
                editable: false,
                formatter: () => (
                  <>
                    <span>{row.result}</span>
                  </>
                ),
              },
              {
                dataField: 'rangeType',
                text: 'Range Type',
              },
              {
                dataField: 'low',
                text: 'Low',
              },
              {
                dataField: 'high',
                text: 'High',
              },
              {
                dataField: 'rangeSetOn',
                text: 'Range Set On',
              },
              {
                dataField: 'rangeId',
                text: 'Range Id',
              },
              {
                dataField: 'version',
                text: 'Range Version',
              },
            ]}
            onSelectedRow={rows => {}}
            onUpdateItem={(value: any, dataField: string, id: string) => {}}
          />
        </div>
      ) : null,
    showExpandColumn: true,
    expandByColumnOnly: true,
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
  const statusData = [
    { code: 'P', value: 'Pending', color: 'blue' },
    { code: 'C', value: 'Recheck', color: 'yellow' },
    { code: 'T', value: 'Retest', color: 'green' },
    { code: 'D', value: 'Done', color: 'purple' },
  ];

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
              <div className='flex items-center flex-wrap'>
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
                <button
                  disabled={isFinishResultDisable}
                  className={
                    'ml-2 mr-2 px-2 focus:outline-none bg-blue-600 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }
                  onClick={onFinishResult}
                >
                  Finish Result
                </button>
                <div className='flex gap-4'>
                  {statusData.map(status => (
                    <button
                      key={status.code}
                      className={`px-4 py-2 bg-${status.color}-600 text-white rounded`}
                      onClick={() => handleStatusClick(status.code)}
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
                  rowStyle={rowStyle}
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
