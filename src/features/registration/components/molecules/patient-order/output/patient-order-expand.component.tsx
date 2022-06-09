import React, {useState} from 'react';
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

import {Buttons, Icons, Form} from '@/library/components';
import {Confirm} from '@/library/models';

import * as Config from '@/config';
import {PatientOrderExpandPackageList} from './patient-order-expand-package-list.component';

const {SearchBar, ClearSearchButton} = Search;
const {ExportCSVButton} = CSVExport;

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
  isSelectRow?: boolean;
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
  isSelectRow,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  clearAllFilter,
}: PatientOrderExpandProps) => {
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
      {isSelectRow && (
        <Buttons.Button
          style={{height: 10, width: 200}}
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
            color={Config.Styles.COLORS.BLACK}
          />
          Remove Selected
        </Buttons.Button>
      )}
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
        const object = {[key]: values.filterVal};
        filter = Object.assign(filter, object);
      }
      onFilter &&
        onFilter(
          type,
          filter,
          type === 'filter' && page === 1 ? 0 : page,
          sizePerPage,
        );
    }
    if (type === 'search') {
      setTimeout(() => {
        onFilter && onFilter(type, {srText: searchText}, page, sizePerPage);
      }, 2000);
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

  const getPackageCode = (
    service: string,
    serviceType: string,
    packageCode: string,
  ) => {
    switch (service) {
      case 'S':
        return serviceType !== 'M' ? packageCode : '';
      case 'M':
        return serviceType !== 'M' ? serviceType : '';
      default:
        return serviceType;
    }
  };

  const handleOnExpand = (row, isExpand, rowIndex, e) => {
    if (isExpand) {
      // this.setState(() => ({
      //   expanded: [...this.state.expanded, row.id]
      // }));
    } else {
      // this.setState(() => ({
      //   expanded: this.state.expanded.filter(x => x !== row.id)
      // }));
    }
  };

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
              dataField: 'grossAmt',
              text: 'Gross Amt',
            },
            {
              dataField: 'netAmt',
              text: 'Net Amt',
            },
            {
              dataField: 'discount',
              text: 'Discount',
            },
            {
              dataField: 'dueDate',
              text: 'Due Date',
            },
            {
              dataField: 'resultDate',
              text: 'Result Date',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.resultDate
                      ? dayjs(row.resultDate).format('YYYY-MM-DD')
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
              dataField: 'analysisDoneDate',
              text: 'Analysis Done Date',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.analysisDoneDate}</span>
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
              dataField: 'abNormal',
              text: 'ABNormal',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.abNormal}</span>
                  </>
                );
              },
            },
            {
              dataField: 'critical',
              text: 'Critical',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.critical}</span>
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
              dataField: 'eqid',
              text: 'Eqid',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.eqid}</span>
                  </>
                );
              },
            },
            {
              dataField: 'eqtype',
              text: 'Eqtype',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.eqtype}</span>
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
              dataField: 'porder',
              text: 'Porder',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.porder}</span>
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
              <div className='flex items-center'>
                <SearchBar
                  {...searchProps}
                  {...props.searchProps}
                  onChange={value => {}}
                />
                <ClearSearchButton
                  className={
                    'inline-flex ml-4 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center h-9 text-white'
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
              </div>
              <div className='flex items-center gap-2 mt-2'>
                <SizePerPageDropdownStandalone
                  {...Object.assign(
                    {},
                    {...paginationProps, hideSizePerPage: false},
                  )}
                />
                <PaginationListStandalone {...paginationProps} />
              </div>
              <div className='flex items-center gap-2 mt-2'>
                <PaginationTotalStandalone {...paginationProps} />
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
