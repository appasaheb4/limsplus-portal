/* eslint-disable */
import React, { useEffect, useState } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import cellEditFactory from "react-bootstrap-table2-editor"
import paginationFactory from "react-bootstrap-table2-paginator"
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
  columns: any
  fileName: string
  isDelete?: boolean
  isEditModify?: boolean
  isSelectRow?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const TableBootstrap = (props: TableBootstrapProps) => {
  const [selectedRow, setSelectedRow] = useState<any[]>()
  const [isEditModify, setIsEditModify] = useState<boolean>(
    props.isEditModify || false
  )
  const [isSelectRow, setIsSelectRow] = useState<boolean>(props.isSelectRow || false)

  useEffect(() => {
    if (props.isEditModify) {
      setIsEditModify(props.isEditModify)
    } else if (props.isSelectRow) {
      setIsSelectRow(props.isSelectRow)
    }
  }, [props])

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
              props.onSelectedRow && props.onSelectedRow(selectedRow)
            } else {
              alert("Please select any item.")
            }
          }}
        >
          <LibraryComponents.Atoms.Icons.EvaIcon
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
        placeholder="Number"
        onChange={(e) => {
          if (e.target.value) {
            onSizePerPageChange(e.target.value)
          }
        }}
        className="mr-2 ml-2 leading-4 p-2 w-24 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border border-gray-300 rounded-md"
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

  const options = {
    paginationSize: 5,
    pageStartIndex: 0,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
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
      {
        text: "All",
        value: props.data.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
    onPageChange: (page, sizePerPage) => {
      // console.log(page, sizePerPage)
    },
    sizePerPageRenderer: sizePerPageRenderer,
    onSizePerPageChange: (page, sizePerPage) => {
      //console.log(page, sizePerPage)
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
      props.onUpdateItem && props.onUpdateItem(newValue, column.dataField, row._id)
    }
  }

  return (
    <ToolkitProvider
      keyField={props.id}
      bootstrap4
      data={props.data}
      columns={props.columns}
      search
      exportCSV={{
        fileName: `${props.fileName}_${moment(new Date()).format(
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
            className={`inline-flex ml-4 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
            {...props.searchProps}
          />
          <ExportCSVButton
            className={`inline-flex ml-2 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
            {...props.csvProps}
          >
            Export CSV!!
          </ExportCSVButton>
          <hr />
          <BootstrapTable
            {...props.baseProps}
            noDataIndication="Table is Empty"
            hover
            pagination={paginationFactory(options)}
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
  )
}

export default TableBootstrap
