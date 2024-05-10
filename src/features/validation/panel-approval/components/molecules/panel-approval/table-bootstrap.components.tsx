/* eslint-disable */
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
} from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import dayjs from 'dayjs';
import '@/library/components/organisms/style.css';
import { debounce } from '@/core-utils';
import { Buttons, Icons, Tooltip } from '@/library/components';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;
import { Result } from '../result/result.components';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { useStores } from '@/stores';

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
  onUpdateResult?: (fields: any, id: string, patientResultId: string) => void;
  onUpdateFields?: (item: any, id: string) => void;
  onPagination?: (type: string) => void;
}

export const TableBootstrap = ({
  id = '',
  data,
  totalSize = 10,
  searchPlaceholder = 'labId or sampleId',
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
  onUpdateResult,
  onUpdateFields,
  onPagination,
}: TableBootstrapProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState([0, 1]);
  const { loginStore } = useStores();

  useEffect(() => {
    setTimeout(() => {
      var expandButton: any = document.getElementsByClassName('expand-cell')[0];
      expandButton?.click();
    }, 1000);
  }, []);

  const statusData = [
    { code: 'Pending', value: 'Pending', color: 'blue' },
    { code: 'ReCheck', value: 'Recheck', color: 'yellow' },
    { code: 'ReTest', value: 'Retest', color: 'orange' },
    { code: 'Hold', value: 'Hold', color: 'indigo' },
    { code: 'All', value: 'All', color: 'red' },
    // { code: 'ReCall', value: 'Recall', color: 'gray' },
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
        result = data?.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = data?.sort((a, b) => {
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
    <>
      <PaginationProvider
        pagination={paginationFactory(
          totalSize !== 0 ? options : { page, sizePerPage, totalSize },
        )}
        keyField={id}
        columns={columns}
        data={_.without(data, undefined)?.length > 0 ? data : []}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField={id}
            bootstrap4
            data={_.without(data, undefined)?.length > 0 ? data : []}
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
                <div className='flex flex-row items-center flex-wrap justify-between'>
                  <div className='flex flex-row items-center flex-wrap'>
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
                      className={`bg-gray-500 px-3.5 py-1 ml-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                      {...props.searchProps}
                    />
                    <button
                      className={
                        'bg-gray-500 px-3.5 py-2 mr-2 ml-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed'
                      }
                      onClick={clearAllFilter}
                    >
                      Clear all filters
                    </button>
                    {isExport && (
                      <ExportCSVButton
                        className={
                          'bg-gray-500 px-3.5 py-1.5 mr-2 focus:outline-none items-center outline shadow-sm font-medium text-center rounded-md  text-white disabled:opacity-50 disabled:cursor-not-allowed'
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
                    <div className='flex ml-2 flex-wrap gap-1'>
                      {statusData.map(status => (
                        <button
                          key={status.code}
                          className={`px-3.5 py-2 bg-${status.color}-600 text-white rounded`}
                          onClick={() => onFilterRecord?.(status.code)}
                        >
                          {status.value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    className={`px-3.5 py-2 bg-gray-600 text-white rounded`}
                    onClick={() => onFilterRecord?.('ReCall')}
                  >
                    Recall
                  </button>
                  <Tooltip tooltipText={'Filter on Validation Level'}>
                    <UncontrolledDropdown>
                      <DropdownToggle tag='a'>
                        <button
                          className={`px-3.5 py-2 bg-blue-600 text-white rounded`}
                          onClick={() => {}}
                        >
                          Upgrade
                        </button>
                      </DropdownToggle>
                      <DropdownMenu right>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                          .filter(
                            item => item <= loginStore.login.validationLevel,
                          )
                          .map((item: any, index: number) => (
                            <DropdownItem onClick={() => {}}>
                              {item}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Tooltip>
                  <div className='flex bg-blue-700 w-10 h-10 rounded-full justify-center items-center text-xl'>
                    <Tooltip tooltipText='Total Pending Count'>
                      <span className='text-white'>{totalSize}</span>
                    </Tooltip>
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
                <div className='scrollTable mb-2'>
                  <BootstrapTable
                    keyField='_id'
                    remote
                    {...props.baseProps}
                    noDataIndication='Table is Empty'
                    hover
                    {...paginationTableProps}
                    filter={filterFactory()}
                    headerClasses='bg-gray-500 text-white whitespace-nowrap'
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
                  <div className='-mt-2'>
                    <Result
                      data={
                        _.without(data, undefined)?.length > 0 ? data[0][1] : []
                      }
                      totalSize={
                        _.without(data, undefined)?.length > 0
                          ? data[0][1]?.length
                          : []
                      }
                      onUpdateResult={(
                        fields: any,
                        id: string,
                        patientResultId: string,
                      ) => {
                        onUpdateResult &&
                          onUpdateResult(fields, id, patientResultId);
                      }}
                      onUpdateFields={(fields: any, id: string) => {
                        onUpdateFields && onUpdateFields(fields, id);
                      }}
                    />
                  </div>
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
    </>
  );
};
