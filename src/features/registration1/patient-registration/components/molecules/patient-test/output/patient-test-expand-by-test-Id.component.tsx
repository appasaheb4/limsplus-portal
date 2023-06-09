import React, {useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'lodash';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import '@/library/components/organisms/style.css';
import {PatientTestExpandExtraData} from './patient-test-expand-extra-data.component';

import {Form} from '@/library/components';
import {debounce} from '@/core-utils';
const {SearchBar, ClearSearchButton} = Search;
const {ExportCSVButton} = CSVExport;

interface PatientTestExpandByTestIdProps {
  id: string;
  data: any;
  totalSize?: number;
  searchPlaceholder?: string;
  page?: number;
  sizePerPage?: number;
  columns: any;
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
export const PatientTestExpandByTestId = ({
  id,
  data,
  totalSize = 10,
  searchPlaceholder = 'Search...',
  page = 0,
  sizePerPage = 10,
  columns,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  clearAllFilter,
}: PatientTestExpandByTestIdProps) => {
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
            currSizePerPage === `${option.page}`
              ? 'btn-primary'
              : 'btn-secondary'
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
    if (type === 'cellEdit') {
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
        const object = {[key]: values.filterVal};
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
        onFilter && onFilter(type, {srText: searchText}, page, sizePerPage);
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

  const CustomToggleList = ({columns, onColumnToggle, toggles}) => (
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
    renderer: row => (
      <div className='z-0'>
        <PatientTestExpandExtraData
          id='_id'
          data={row.testMasterList || []}
          totalSize={row.testMasterList?.length}
          columns={[
            {
              dataField: 'testCode',
              text: 'Test Code',
            },
            {
              dataField: 'testName',
              text: 'Test Name',
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
              dataField: 'urgent',
              text: 'Urgent',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.urgent} disabled={true} />
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
              dataField: 'sampleCode',
              text: 'Sample Code',
            },
            {
              dataField: 'sampleType',
              text: 'Sample Type',
            },
            {
              dataField: 'collContainerCode',
              text: 'Coll Container Code',
            },
            {
              dataField: 'collContainerName',
              text: 'Coll Container Name',
            },
            {
              dataField: 'rLab',
              text: 'RLab',
            },

            {
              dataField: 'pLab',
              text: 'PLab',
            },
            {
              dataField: 'status',
              text: 'Status',
            },
            {
              dataField: 'department',
              text: 'Department',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.department}</span>
                  </>
                );
              },
            },

            {
              dataField: 'section',
              text: 'Section',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.section.code}</span>
                  </>
                );
              },
            },
            {
              dataField: 'methodCode',
              text: 'Method Code',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.methodCode}</span>
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
              dataField: 'validationLevel',
              text: 'Validation Level',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.validationLevel}</span>
                  </>
                );
              },
            },
            {
              dataField: 'resultOrder',
              text: 'Result Order',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.resultOrder}</span>
                  </>
                );
              },
            },
            {
              dataField: 'prefix',
              text: 'Prefix',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.prefix}</span>
                  </>
                );
              },
            },

            {
              dataField: 'sufix',
              text: 'Sufix',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.sufix}</span>
                  </>
                );
              },
            },
            {
              dataField: 'deleverySchedule',
              text: 'Delevery Schedule',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.deleverySchedule}</span>
                  </>
                );
              },
            },

            {
              dataField: 'holdingDays',
              text: 'Holding Days',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.holdingDays}</span>
                  </>
                );
              },
            },
            {
              dataField: 'tat',
              text: 'Tat',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.tat}</span>
                  </>
                );
              },
            },
            {
              dataField: 'workListCode',
              text: 'Work List Code',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.workListCode}</span>
                  </>
                );
              },
            },
            {
              dataField: 'version',
              text: 'Version',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.version}</span>
                  </>
                );
              },
            },

            {
              dataField: 'environment',
              text: 'Environment',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.environment}</span>
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
        totalSize !== 0 ? options : {page, sizePerPage, totalSize},
      )}
      keyField={id}
      columns={columns}
      data={data}
    >
      {({paginationProps, paginationTableProps}) => (
        <ToolkitProvider
          keyField={id}
          bootstrap4
          data={data}
          columns={columns}
          search
          columnToggle
        >
          {props => (
            <div>
              {/* <div className="flex items-center">
                <SearchBar
                  {...searchProps}
                  {...props.searchProps}
                  onChange={(value) => {
                   
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
                <ExportCSVButton
                  className={`inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white`}
                  {...props.csvProps}
                >
                  Export CSV!!
                </ExportCSVButton>
                {isFilterOpen ? (
                  <Buttons.Button
                    size="medium"
                    type="outline"
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen)
                    }}
                  >
                    <Icons.IconFa.FaChevronUp />
                  </Buttons.Button>
                ) : (
                  <Buttons.Button
                    size="medium"
                    type="outline"
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen)
                    }}
                  >
                    <Icons.IconFa.FaChevronDown />
                  </Buttons.Button>
                )}
              </div> */}
              {/* {isFilterOpen && (
                <div className={"mb-2 overflow-auto h-10"}>
                  <CustomToggleList
                    contextual="primary"
                    className="list-custom-class"
                    btnClassName="list-btn-custom-class"
                    {...props.columnToggleProps}
                  />
                </div>
              )} */}
              <div>
                <BootstrapTable
                  remote
                  {...props.baseProps}
                  noDataIndication='Table is Empty'
                  hover
                  {...paginationTableProps}
                  filter={filterFactory()}
                  headerClasses='bg-gray-500 text-white whitespace-nowrap'
                  onTableChange={handleTableChange}
                  expandRow={expandRow}
                />
              </div>
              {/* <div className="flex items-center gap-2 mt-2">
                <SizePerPageDropdownStandalone
                  {...Object.assign(
                    {},
                    { ...paginationProps, hideSizePerPage: false }
                  )}
                />
                <PaginationListStandalone {...paginationProps} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <PaginationTotalStandalone {...paginationProps} />
              </div> */}
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
