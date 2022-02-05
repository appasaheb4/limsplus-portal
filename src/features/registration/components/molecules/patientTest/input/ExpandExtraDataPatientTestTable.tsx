/* eslint-disable */
import React, { useState } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import _ from "lodash"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
// import cellEditFactory from "react-bootstrap-table2-editor"
import paginationFactory, {
  PaginationProvider,
  
} from "react-bootstrap-table2-paginator"
import filterFactory from "react-bootstrap-table2-filter"
import dayjs from "dayjs"
import "@lp/library/components/Organisms/style.css"

import {Buttons, Icons} from "@lp/library/components"
// import * as LibraryModels from "@lp/library/models"

import * as Config from "@lp/config"
import { ExpandPatientTestTestCode } from "./ExpandPatientTestTestCode"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface ExpandExtraDataPatientTestTableProps {
  id: string
  data: any
  totalSize?: number
  searchPlaceholder?: string
  page?: number
  sizePerPage?: number
  columns: any
  fileName: string
  isDelete?: boolean
  isEditModify?: boolean
  isSelectRow?: boolean
  //onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, limit: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
  clearAllFilter?: () => void
}
export const ExpandExtraDataPatientTestTable = ({
  id,
  data,
  totalSize = 10,
  searchPlaceholder = "Search...",
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
}: ExpandExtraDataPatientTestTableProps) => {
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
        <Buttons.Button
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
          <Icons.EvaIcon
            icon="trash-outline"
            size="large"
            color={Config.Styles.COLORS.BLACK}
          />
          Remove Selected
        </Buttons.Button>
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
  const options = {
    cutome: true,
    totalSize: totalSize,
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
 

  const handleTableChange = (
    type,
    { data, cellEdit, page, sizePerPage, filters, sortField, sortOrder, searchText }
  ) => {
    //console.log({ type, filters })
    if (type === "cellEdit" && isEditModify) {
      onUpdateItem &&
        onUpdateItem(cellEdit.newValue, cellEdit.dataField, cellEdit.rowId)
    }
    if (type === "pagination" && _.isEmpty(filters)) {
      // if (sizePerPage > totalSize) return alert("You have not more records.")
      // if (page * sizePerPage > totalSize) return alert("You have not more records.")
      onPageSizeChange && onPageSizeChange(page, sizePerPage)
    }
    if (type === "filter" || (type === "pagination" && !_.isEmpty(filters))) {
      if (type === "pagination") {
        if (sizePerPage > totalSize) return alert("You have not more records.")
        if (page * sizePerPage > totalSize)
          return alert("You have not more records.")
      }
      let filter: any = {}
      for (const [key, value] of Object.entries(filters)) {
        const values: any = value
        const object = { [key]: values.filterVal }
        filter = Object.assign(filter, object)
      }
      onFilter &&
        onFilter(
          type,
          filter,
          type === "filter" && page === 1 ? 0 : page,
          sizePerPage
        )
    }
    if (type === "search") {
      setTimeout(() => {
        onFilter && onFilter(type, { srText: searchText }, page, sizePerPage)
      }, 2000)
    }
    if (type === "sort") {
      let result
      if (sortOrder === "asc") {
        result = data.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1
          } else if (b[sortField] > a[sortField]) {
            return -1
          }
          return 0
        })
      } else {
        result = data.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1
          } else if (b[sortField] > a[sortField]) {
            return 1
          }
          return 0
        })
      }
    }
  }

  const expandRow = {
    renderer: (row) => (
      <div className="z-0">
        <ExpandPatientTestTestCode
          id="_id"
          data={row.testMasterList}
          totalSize={row.testMasterList.length}
          columns={[
            {
              dataField: "department",
              text: "Department",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.department}</span>
                  </>
                )
              },
            },

            {
              dataField: "section",
              text: "Section",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.section.code}</span>
                  </>
                )
              },
            },
            {
              dataField: "methodCode",
              text: "Method Code",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.methodCode}</span>
                  </>
                )
              },
            },
            {
              dataField: "methodName",
              text: "Method Name",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.methodName}</span>
                  </>
                )
              },
            },
            {
              dataField: "validationLevel",
              text: "Validation Level",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.validationLevel}</span>
                  </>
                )
              },
            },
            {
              dataField: "resultOrder",
              text: "Result Order",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.resultOrder}</span>
                  </>
                )
              },
            },
            {
              dataField: "prefix",
              text: "Prefix",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.prefix}</span>
                  </>
                )
              },
            },

            {
              dataField: "sufix",
              text: "Sufix",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.sufix}</span>
                  </>
                )
              },
            },
            {
              dataField: "deleverySchedule",
              text: "Delevery Schedule",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.deleverySchedule}</span>
                  </>
                )
              },
            },

            {
              dataField: "holdingDays",
              text: "Holding Days",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.holdingDays}</span>
                  </>
                )
              },
            },
            {
              dataField: "tat",
              text: "Tat",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.tat}</span>
                  </>
                )
              },
            },
            {
              dataField: "workListCode",
              text: "Work List Code",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.workListCode}</span>
                  </>
                )
              },
            },
            {
              dataField: "version",
              text: "Version",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.version}</span>
                  </>
                )
              },
            },

            {
              dataField: "environment",
              text: "Environment",
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.environment}</span>
                  </>
                )
              },
            },
          ]}
          onSelectedRow={(rows) => {
            console.log({ row })
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            console.log({ value })
          }}
        />
      </div>
    ),
    showExpandColumn: true,
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
            exportAll: false,
            onlyExportFiltered: true,
          }}
          columnToggle
        >
          {(props) => (
            <div>
             
              <div>
                <BootstrapTable
                  remote
                  {...props.baseProps}
                  noDataIndication="Table is Empty"
                  hover
                  {...paginationTableProps}
                  filter={filterFactory()}
                  headerClasses="bg-gray-500 text-white whitespace-nowrap z-0"
                  onTableChange={handleTableChange}
                  expandRow={expandRow}
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  )
}
