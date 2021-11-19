/* eslint-disable */
import React, { useEffect, useState, useRef } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, {
  Search,
  CSVExport,
  ColumnToggle,
} from "react-bootstrap-table2-toolkit"
import cellEditFactory from "react-bootstrap-table2-editor"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator"
import filterFactory from "react-bootstrap-table2-filter"
import dayjs from "dayjs"
import "./style.css"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Config from "@lp/config"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface TableBootstrapProps {
  id: string
  data: any
  totalSize?: number
  page?: number
  sizePerPage?: number
  columns: any
  fileName: string
  isDelete?: boolean
  isEditModify?: boolean
  isSelectRow?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, limit: number) => void
}

const TableBootstrap = ({
  id,
  data,
  totalSize = 10,
  page = 0,
  sizePerPage = 10,
  columns,
  fileName,
  isDelete,
  isEditModify,
  isSelectRow,
  onDelete,
  onSelectedRow,
  onUpdateItem,
  onPageSizeChange,
}: TableBootstrapProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>()
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const customTotal = (from, to, size) => {
    return (
      <>
        <div className="clearfix" />
        <span>
          Showing {from} to {to} of {size} Results
        </span>
      </>
    )
  }

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className="btn-group items-center" role="group">
      {isSelectRow && (
        <LibraryComponents.Atoms.Buttons.Button
          style={{ height: 10, width: 200 }}
          size="small"
          type="solid"
          onClick={() => {
            if (selectedRow) {
              onSelectedRow && onSelectedRow(selectedRow)
            } else {
              alert("Please select any item.")
            }
          }}
        >
          <LibraryComponents.Atoms.Icon.EvaIcon
            icon="trash-outline"
            size="large"
            color={Config.Styles.COLORS.BLACK}
          />
          Remove Selected
        </LibraryComponents.Atoms.Buttons.Button>
      )}
      <input
        type="number"
        min="0"
        placeholder="No"
        onChange={(e) => {
          if (e.target.value) {
            onSizePerPageChange(e.target.value)
          }
        }}
        className="mr-2 ml-2 leading-4 p-2 w-14 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md"
      />
      {options.map((option) => (
        <button
          key={option.text}
          type="button"
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${
            currSizePerPage === `${option.page}` ? "btn-primary" : "btn-secondary"
          }`}
        >
          {option.text}
        </button>
      ))}
    </div>
  )

  const { ToggleList } = ColumnToggle
  const options = {
    cutome: true,
    totalSize: totalSize - 10,
    paginationSize: 5,
    pageStartIndex: 0,
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",
    disablePageTitle: true,
    paginationTotalRenderer: customTotal,

    hideSizePerPage: true,
    showTotal: false,
    alwaysShowAllBtns: true,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "20",
        value: 20,
      },
      {
        text: "30",
        value: 30,
      },
      {
        text: "40",
        value: 40,
      },
      {
        text: "50",
        value: 50,
      },
    ],
    hidePageListOnlyOnePage: true,
    sizePerPageRenderer: sizePerPageRenderer,
  }

  const handleOnSelect = (rows: any, isSelect) => {
    if (isSelect) {
      if (selectedRow) {
        let itemSelected: any[] = selectedRow
        itemSelected.push(rows)
        setSelectedRow(itemSelected)
      } else {
        setSelectedRow([rows])
      }
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      setSelectedRow(rows)
    }
  }

  const handleTableChange = (
    type,
    { cellEdit, page, sizePerPage, filters, sortField, sortOrder }
  ) => {
    console.log({ type })
    if (type === "cellEdit" && isEditModify) {
      onUpdateItem &&
        onUpdateItem(cellEdit.newValue, cellEdit.dataField, cellEdit.rowId)
    }
    if (type === "pagination") {
      onPageSizeChange && onPageSizeChange(page, sizePerPage)
    }

    //console.log({ type, filters, sortField, sortOrder })
    // const currentIndex = (page - 1) * sizePerPage
    // console.log({ currentIndex,page,sizePerPage })
  }

  return (
    <PaginationProvider
      pagination={paginationFactory(
        totalSize !== 0 ? options : { page, sizePerPage, totalSize }
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
              "YYYY-MM-DD HH:mm"
            )}.csv`,
            noAutoBOM: false,
            blobType: "text/csv;charset=ansi",
          }}
          columnToggle
        >
          {(props) => (
            <div>
              <div className="flex items-center">
                <SearchBar {...props.searchProps} />
                <ClearSearchButton
                  className={`inline-flex ml-4 bg-gray-500 items-center small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                  {...props.searchProps}
                />
                <ExportCSVButton
                  className={`inline-flex m-2.5 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center `}
                  {...props.csvProps}
                >
                  Export CSV!!
                </ExportCSVButton>
                {isFilterOpen ? (
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="outline"
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen)
                    }}
                  >
                    <LibraryComponents.Atoms.Icons.IconFa.FaChevronUp />
                  </LibraryComponents.Atoms.Buttons.Button>
                ) : (
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="outline"
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen)
                    }}
                  >
                    <LibraryComponents.Atoms.Icons.IconFa.FaChevronDown />
                  </LibraryComponents.Atoms.Buttons.Button>
                )}
              </div>
              {isFilterOpen && (
                <div className="mb-2 overflow-auto">
                  <ToggleList
                    contextual="primary"
                    className="list-custom-class"
                    btnClassName="list-btn-custom-class"
                    {...props.columnToggleProps}
                  />
                </div>
              )}
              <div className="scrollTable">
                <BootstrapTable
                  remote
                  {...props.baseProps}
                  noDataIndication="Table is Empty"
                  hover
                  {...paginationTableProps}
                  filter={filterFactory()}
                  selectRow={
                    isSelectRow
                      ? {
                          mode: "checkbox",
                          onSelect: handleOnSelect,
                          onSelectAll: handleOnSelectAll,
                        }
                      : undefined
                  }
                  cellEdit={
                    isEditModify
                      ? cellEditFactory({
                          mode: "dbclick",
                          blurToSave: true,
                        })
                      : undefined
                  }
                  headerClasses="bg-gray-500 text-white whitespace-nowrap"
                  onTableChange={handleTableChange}
                  options={{
                    hideSizePerPage: true,
                    showTotal: false,
                  }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
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
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  )
}

export default TableBootstrap
