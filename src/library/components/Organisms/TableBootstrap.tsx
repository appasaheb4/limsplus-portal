/* eslint-disable */
import React, { useEffect, useState, useRef } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import cellEditFactory from "react-bootstrap-table2-editor"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import filterFactory from "react-bootstrap-table2-filter"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Config from "@lp/config"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface TableBootstrapProps {
  id: string
  data: any
  totalSize?: number
  columns: any
  fileName: string
  isDelete?: boolean
  isEditModify?: boolean
  isSelectRow?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
}

const TableBootstrap = ({
  id,
  data,
  totalSize,
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
  // const [isEditModify, setIsEditModify] = useState<boolean>(
  //   isEditModify || false
  // )
  // const [isSelectRow, setIsSelectRow] = useState<boolean>(isSelectRow || false)

  // useEffect(() => {
  //   if (isEditModify) {
  //     setIsEditModify(isEditModify)
  //   } else if (isSelectRow) {
  //     setIsSelectRow(isSelectRow)
  //   }
  // }, [props])

  const sizePerPageRef = useRef(10)

  const customTotal = (from, to, size) => {
    return (
      <>
        <div className="clearfix" />
        <span className="ml-2 react-bootstrap-table-pagination-total">
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

  const pageButtonRenderer = ({ page, active, disable, title, onPageChange }) => {
    const handleClick = (e) => {
      e.preventDefault()
      onPageChange(page)
    }
    const activeStyle: any = {}
    if (active) {
      activeStyle.backgroundColor = "black"
      activeStyle.color = "white"
    } else {
      activeStyle.backgroundColor = "gray"
      activeStyle.color = "black"
    }
    if (typeof page === "string") {
      activeStyle.backgroundColor = "white"
      activeStyle.color = "black"
    }
    return (
      <li className="page-item">
        <a href="#" onClick={handleClick} style={activeStyle}>
          {page}
        </a>
      </li>
    )
  }

  const onPageChangeHandler = (page, sizePerPage) => {
    if (page !== 0) onPageSizeChange && onPageSizeChange(page, sizePerPage)
  }

  const options = {
    cutome: true,
    //pageButtonRenderer,
    totalSize: totalSize,
    paginationSize: 5,
    pageStartIndex: 0,
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",
    showTotal: true,
    disablePageTitle: true,
    paginationTotalRenderer: customTotal,
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
    // onPageChange: (page, sizePerPage) => {
    //   console.log({ old: page, sizePerPage })
    //   onPageSizeChange && onPageSizeChange(page, sizePerPage)
    // },
    onPageChange: onPageChangeHandler,
    hidePageListOnlyOnePage: true,
    sizePerPageRenderer: sizePerPageRenderer,
    onSizePerPageChange: (page, sizePerPage) => {
      onPageSizeChange && onPageSizeChange(0, page)
      sizePerPageRef.current = page
    },
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

  const afterSaveCell = (oldValue, newValue, row, column) => {
    if (oldValue !== newValue) {
      onUpdateItem && onUpdateItem(newValue, column.dataField, row._id)
    }
  }

  return (
    <PaginationProvider
      pagination={paginationFactory(totalSize !== 0 ? options : options)}
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
            fileName: `${fileName}_${moment(new Date()).format(
              "YYYY-MM-DD HH:mm"
            )}.csv`,
            noAutoBOM: false,
            blobType: "text/csv;charset=ansi",
          }}
        >
          {(props) => (
            <div>
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
              <hr />
              <BootstrapTable
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
                        afterSaveCell,
                      })
                    : undefined
                }
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  )
}

export default TableBootstrap
