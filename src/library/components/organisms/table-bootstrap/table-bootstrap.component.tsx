/* eslint-disable */
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
import '../style.css';
import {debounce} from '@/core-utils';

import {Buttons, Icons} from '../..';

const {SearchBar, ClearSearchButton} = Search;
const {ExportCSVButton} = CSVExport;
import ExcelJS from 'exceljs';
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
  isSelectRow?: boolean;
  isPagination?: boolean;
  onDelete?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
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
  registrationExtraData?: boolean;
}

export const sortCaret = (order, column) => {
  if (!order)
    return (
      <div className='flex flex-row absolute right-2 bottom-1/3'>
        <Icons.IconContext color='#fff' size='20'>
          {Icons.getIconTag(Icons.IconBs.BsArrowUp)}
        </Icons.IconContext>
        <Icons.IconContext color='#fff' size='20'>
          {Icons.getIconTag(Icons.IconBs.BsArrowDown)}
        </Icons.IconContext>
      </div>
    );
  else if (order === 'asc')
    return (
      <div className='flex flex-row absolute right-2 bottom-1/3'>
        <Icons.IconContext color='#fff' size='20'>
          {Icons.getIconTag(Icons.IconBs.BsArrowUp)}
        </Icons.IconContext>
        <Icons.IconContext color='#fff' size='10'>
          {Icons.getIconTag(Icons.IconBs.BsArrowDown)}
        </Icons.IconContext>
      </div>
    );
  else if (order === 'desc')
    return (
      <div className='flex flex-row absolute right-2 bottom-1/3'>
        <Icons.IconContext color='#fff' size='10'>
          {Icons.getIconTag(Icons.IconBs.BsArrowUp)}
        </Icons.IconContext>
        <Icons.IconContext color='#fff' size='20'>
          {Icons.getIconTag(Icons.IconBs.BsArrowDown)}
        </Icons.IconContext>
      </div>
    );
  return null;
};

export const TableBootstrap = ({
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
  isPagination = true,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
  onFilter,
  clearAllFilter,
  dynamicStylingFields,
  hideExcelSheet,
  registrationExtraData = false,
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

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className='btn-group items-center flex flex-wrap' role='group'>
      <div className='flex flex-wrap gap-4'>
        {isSelectRow && (
          <Buttons.Button
            style={{height: 40, width: 200}}
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
            {`Remove Selected`}
          </Buttons.Button>
        )}
        {isPagination && (
          <>
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
          alignment: {wrapText: true}, // Set wrapText to true for cell content
        },
      };

      // Calculate the maximum width needed for the content in the column

      return columnConfig;
    });
    data.forEach((product, index) => {
      const row = {};
      filteredColumns.forEach((column, columnIndex) => {
        const dataField = column.dataField;
        const columnValue = product[dataField];
        const userObj = product['user'];
        const ipObj = product['systemInfo']?.ipInfo;
        const roleMapping = product['role']?.description;
        if (Array.isArray(columnValue)) {
          const extractedValues = columnValue.map(item => {
            const properties = [
              item.locationCode && `Registration Code:${item.locationCode}`,
              item.corporateCode && `Corporate Client:${item.corporateCode}`,
              item.field_no && `FieldNo:${item.field_no}`,
              item.filed && `Filed:${item.filed}`,
              item.name && `Name:${item.name}`,
              item.prefrence && `Preference:${item.prefrence}`,
              item.tatInMin && `TatInMin:${item.tatInMin}`,
              item.code && `Code:${item.code}`,
              item.value && `Value:${item.value}`,
              item.panelCode && `Panel Code:${item.panelCode}`,
              item.panelName && `PanelName:${item.panelName}`,
              item.fyYear && `FyYear:${item.fyYear}`,
              item.month && `Month:${item.month}`,
              item.empCode && `Employee:${item.empCode}`,
              item.designation && `Designation:${item.designation}`,
              item.level && `Level:${item.level}`,
              item.result && `Result:${item.result}`,
              item.possibleValue && `Possible Value: ${item.possibleValue}`,
              item.abNormal && `Ab Normal:${item.abNormal ? 'Yes' : 'No'}`,
              item.critical && `Critical:${item.critical ? 'Yes' : 'No'}`,
            ];
            return properties.filter(Boolean).join(' - ');
          });
          row[dataField] = extractedValues.join(', ');
        } else if (typeof columnValue === 'object' && columnValue !== null) {
          switch (dataField) {
            case 'systemInfo':
              {
                if (columnValue.workstation) {
                  // Handle systemInfo for LoginActivity
                  const extractedValues = [
                    `Device: ${columnValue.device}`,
                    `OS Name: ${columnValue.workstation.os.name}`,
                    `OS Version: ${columnValue.workstation.os.version}`,
                    `Browser Name: ${columnValue.workstation.browser.name}`,
                    `Browser Version: ${columnValue.workstation.browser.version}`,
                  ];

                  // ... extract other properties from 'workstation' and 'device' if needed ...
                  row[dataField] = extractedValues.join(' - ');
                  row[
                    'userId'
                  ] = `UserId: ${userObj.userId} - UserName:${userObj.fullName} - lab:${userObj.lab} - Role:${userObj.role}`;
                } else if (columnValue.accessInfo) {
                  // Handle systemInfo for User
                  const extractedValues = [
                    `Mobile Access: ${
                      columnValue.accessInfo.mobile ? 'Yes' : 'No'
                    }`,
                    `Desktop Access: ${
                      columnValue.accessInfo.desktop ? 'Yes' : 'No'
                    }`,
                  ];
                  row[dataField] = extractedValues.join(' - ');
                }
              }
              break;
            default:
              const objectProperties = [
                columnValue.header && columnValue.header.title,
                columnValue.result && `Result:${columnValue.result}`,
                columnValue.possibleValue &&
                  `Possible Value: ${columnValue.possibleValue}`,
                columnValue.abNormal &&
                  `Ab Normal:${columnValue.abNormal ? 'Yes' : 'No'}`,
                columnValue.critical &&
                  `Critical:${columnValue.critical ? 'Yes' : 'No'}`,
              ];

              row[dataField] = objectProperties.filter(Boolean).join(' - ');
              row['role'] = roleMapping;

              break;
          }
        } else if (typeof columnValue === 'boolean') {
          row[dataField] = columnValue ? 'Yes' : 'No';
          row['masterFlags'] = `MethodFlag PM:${
            product['panelMethod'] ? 'Yes' : 'No'
          } - MethodFlag TM:${
            product['testMethod'] ? 'Yes' : 'No'
          } - MethodFlag AM:${product['analyteMethod'] ? 'Yes' : 'No'}`;
        } else {
          row[dataField] =
            typeof product?.extraData === 'object' && registrationExtraData
              ? product?.extraData[dataField]
              : columnValue;
          row['ipInfo'] = `IP:${ipObj?.ip}`;
          row['permission'] = `AllLabs:${
            product['allLabs'] ? 'Yes' : 'No'
          } - AllUsers:${product['allUsers'] ? 'Yes' : 'No'} - AllDepartment:${
            product['allDepartment'] ? 'Yes' : 'No'
          }`;
          row['header.title'] = product['header']?.title;
          row['header.titleCSS'] = product['header']?.titleCSS;
          row['header.logoCSS'] = product['header']?.logoCSS;
          row['header.mainBoxCss'] = product['header']?.mainBoxCSS;

          row['subHeader.title'] = product['subHeader']?.title;
          row['subHeader.titleCSS'] = product['subHeader']?.titleCSS;
          row['subHeader.subTitle'] = product['subHeader']?.subTitle;
          row['subHeader.subTitleCSS'] = product['subHeader']?.subTitleCSS;
          row['subHeader.mainBoxCss'] = product['subHeader']?.mainBoxCSS;

          row['footer.title'] = product['footer']?.title;
          row['footer.titleCSS'] = product['footer']?.titleCSS;
          row['footer.subTitle'] = product['footer']?.subTitle;
          row['footer.subTitleCSS'] = product['footer']?.subTitleCSS;
          row['footer.mainBoxCss'] = product['footer']?.mainBoxCSS;

          row['pageNumber.pageNumberCSS'] =
            product['pageNumber']?.pageNumberCSS;
          row['dateActive'] = dayjs(product['dateActive']).format('YYYY-MM-DD');
          row['dateCreation'] = dayjs(product['dateCreation']).format(
            'YYYY-MM-DD',
          );
          row['lastUpdated'] = product['lastUpdated']
            ? dayjs(
                dayjs(product['lastUpdated']).format('YYYY-MM-DD h:mm:ss a'),
              ).fromNow()
            : 'Active User';
          row['dateOfEntry'] = dayjs(
            dayjs(product['dateOfEntry']).format('YYYY-MM-DD h:mm:ss a'),
          ).fromNow();
          row['dateExpire'] = dayjs(product['dateExpire ']).format(
            'YYYY-MM-DD',
          );
          row['dateOfBirth'] = dayjs(product['dateOfBirth ']).format(
            'YYYY-MM-DD',
          );
          row['marriageAnniversary'] = dayjs(
            product['marriageAnniversary '],
          ).format('YYYY-MM-DD');
          row['exipreDate'] = dayjs(product['exipreDate ']).format(
            'YYYY-MM-DD',
          );
          row['authorizedSignatory'] = product['authorizedSignatory']
            ?.map(item => item)
            ?.join(',');

          row['postalCode'] = Array.isArray(product['postalCode'])
            ? product['postalCode']?.map(item => item)?.join(',')
            : product['postalCode'];

          row['priceList'] = Array.isArray(product['priceList'])
            ? product['priceList']
                ?.map((item: any) => {
                  const dataValue = [
                    item.priceGroup && `Price Group:${item.priceGroup}`,
                    item.maxDis && `Max Dis:${item.maxDis}`,
                    item.priceList && `Price List:${item.priceList}`,
                    item.priority && `Priority:${item.priority}`,
                    item.description && `Description:${item.description}`,
                  ];
                  return dataValue.filter(Boolean)?.join(' - ');
                })
                .join(', ')
            : product['priceList'];

          row[
            'block'
          ] = `Start:${product['blockStart']} - End:${product['blockEnd']}`;
          row[
            'testCodeName'
          ] = `${product['testCode']} - ${product['testName']}`;
          row[
            'analyteCodeName'
          ] = `${product['analyteCode']} - ${product['analyteName']}`;
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
            fgColor: {argb: 'E42217'},
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
    //console.log({type, cellEdit, isEditModify, data});
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
              <div className='flex items-center flex-wrap'>
                <SearchBar
                  {...searchProps}
                  {...props.searchProps}
                  onChange={value => {
                    console.log({value});
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
                <button
                  className={`ml-2 px-2 focus:outline-none bg-gray-500 items-center  outline shadow-sm  font-medium  text-center rounded-md h-9 text-white`}
                  onClick={exportToExcel}
                >
                  Export CSV!!
                </button>
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
                <div className={'mb-2 overflow-auto h-10 '}>
                  <CustomToggleList
                    contextual='primary'
                    className='list-custom-class'
                    btnClassName='list-btn-custom-class'
                    {...props.columnToggleProps}
                  />
                </div>
              )}
              <div className='scrollTable '>
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
                  headerClasses='bg-gray-500 text-white whitespace-nowrap'
                  onTableChange={handleTableChange}
                />
              </div>
              <div>
                <SizePerPageDropdownStandalone
                  {...Object.assign(
                    {},
                    {...paginationProps, hideSizePerPage: false},
                  )}
                />
              </div>
              {isPagination && (
                <>
                  <div className='flex items-center gap-2 mt-2 flex-wrap'>
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
