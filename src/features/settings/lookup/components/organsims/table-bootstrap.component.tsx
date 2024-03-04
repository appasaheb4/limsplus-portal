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
import './style.css';
import { debounce } from '@/core-utils';
import { Buttons, Icons } from '@/library/components';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;
import ExcelJS from 'exceljs';
import { RouterFlow } from '@/flows';
import { useStores } from '@/stores';
interface TableBootstrapProps {
  id: string;
  editorId?: string;
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
  onDelete?: (selectedItem: any) => void;
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
  dynamicStylingFields?: any;
  hideExcelSheet?: any;
  isHideForm?: boolean;
  setHideForm?: Function;
}
export const TableBootstrap = ({
  id,
  editorId,
  data,
  totalSize = 10,
  searchPlaceholder = 'Search...',
  page = 0,
  sizePerPage = 10,
  columns,
  fileName,
  isEditModify,
  isExport = true,
  isSelectRow,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  clearAllFilter,
  dynamicStylingFields,
  hideExcelSheet,
  setHideForm,
  isHideForm = false,
}: TableBootstrapProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { routerStore } = useStores();

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
    <div className='btn-group items-center flex flex-wrap' role='group'>
      <div className='flex flex-wrap gap-4'>
        {isSelectRow && (
          <Buttons.Button
            style={{ height: 10, width: 200 }}
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
            {` Remove Selected`}
          </Buttons.Button>
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
        <div className='flex'>
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
    //console.log({ type, filters })
    if (type === 'cellEdit' && isEditModify) {
      onUpdateItem &&
        onUpdateItem(cellEdit.newValue, cellEdit.dataField, cellEdit.rowId);
    }
    if (type === 'pagination' && _.isEmpty(filters)) {
      // if (sizePerPage > totalSize) return alert("You have not more records.")
      // if (page * sizePerPage > totalSize) return alert("You have not more records.")
      debounce(() => {
        onPageSizeChange && onPageSizeChange(page, sizePerPage);
      });
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
  const exportToExcel = () => {
    const filteredColumns = columns.filter(
      column => !hideExcelSheet.includes(column.dataField),
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = filteredColumns.map(column => {
      const maxLength = Math.max(
        column.text.length,
        ...data.map(
          product => (product[column.dataField]?.toString() || '').length,
        ),
      );
      const columnConfig: any = {
        header: column.text,
        key: column.dataField,
        width: maxLength + 4, // Add a little extra width for padding
        style: {
          alignment: { wrapText: true }, // Set wrapText to true for cell content
        },
      };

      return columnConfig;
    });
    data.forEach((product, index) => {
      const row = {};
      filteredColumns.forEach(column => {
        // Check if the column's value is an array
        if (Array.isArray(product[column.dataField])) {
          // Convert the array of objects to a concatenated string
          row[column.dataField] = product[column.dataField]
            .map(item => `Value :${item.value} - Code:${item.code}`)
            .join(', ');
        } else if (
          typeof product[column.dataField] === 'object' &&
          product[column.dataField] !== null
        ) {
          // Handle case where column value is an object
          // You can customize how you want to display object values here
          row[column.dataField] = JSON.stringify(
            product[column.dataField].children.title,
          ).replace(/^"(.*)"$/, '$1');
        } else {
          row[column.dataField] = product[column.dataField];
        }
      });

      const newRow = worksheet.addRow(row);

      // Check if any of the dynamic styling fields have values that require red background
      dynamicStylingFields.forEach(field => {
        const columnIndex = filteredColumns.findIndex(
          column => column.dataField === field,
        );
        if (columnIndex !== -1) {
          newRow.getCell(columnIndex + 1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'E42217' }, // Red background color
          };
        }
      });
    });

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}_${dayjs(new Date()).format(
        'YYYY-MM-DD HH:mm',
      )}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    });
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
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between items-center flex-wrap'>
                <div className='flex items-center flex-wrap'>
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
                    <button
                      className={`ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white`}
                      onClick={exportToExcel}
                    >
                      Export CSV!!
                    </button>
                  )}

                  {isFilterOpen ? (
                    <div className='ml-2'>
                      <Buttons.Button
                        size='medium'
                        type='outline'
                        onClick={() => {
                          setIsFilterOpen(!isFilterOpen);
                        }}
                      >
                        <Icons.IconFa.FaChevronUp />
                      </Buttons.Button>
                    </div>
                  ) : (
                    <div className='ml-2'>
                      <Buttons.Button
                        size='medium'
                        type='outline'
                        onClick={() => {
                          setIsFilterOpen(!isFilterOpen);
                        }}
                      >
                        <Icons.IconFa.FaChevronDown />
                      </Buttons.Button>
                    </div>
                  )}
                </div>
                {isFilterOpen && (
                  <div className={'flex mb-2 overflow-auto h-10'}>
                    <CustomToggleList
                      contextual='primary'
                      className='list-custom-class'
                      btnClassName='list-btn-custom-class'
                      {...props.columnToggleProps}
                    />
                  </div>
                )}
                <div>
                  {RouterFlow.checkPermission(
                    routerStore.userPermission,
                    'Add',
                  ) && (
                    <Buttons.ButtonCircleAddRemove
                      show={isHideForm}
                      onClick={() => setHideForm?.(!isHideForm)}
                    />
                  )}
                </div>
              </div>
              <div className='scrollTable h-[calc(100vh_-_30vh)] mb-2'>
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
                  headerClasses='bg-gray-500 text-white whitespace-nowrap align-middle mt-2'
                  onTableChange={handleTableChange}
                />
              </div>
              {totalSize && (
                <div className='flex  items-center   p-2 justify-start gap-2 bg-[#6A727F] rounded-md   text-white w-full'>
                  <div className='flex'>
                    <SizePerPageDropdownStandalone
                      {...Object.assign(
                        {},
                        { ...paginationProps, hideSizePerPage: false },
                      )}
                    />
                  </div>

                  <div className='flex items-center gap-2 flex-wrap'>
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                  <div className='flex items-center gap-2 '>
                    <PaginationTotalStandalone {...paginationProps} />
                  </div>
                </div>
              )}
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};
