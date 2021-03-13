/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import moment from "moment"
import * as Models from "../../../models"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../../../services"
import * as XLSX from "xlsx"
import * as Config from "@lp/config"
import * as FeatureComponents from "../../../components"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

import { Stores } from "../../../stores"

const SegmentList = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [deleteItem, setDeleteItem] = useState<any>({})
  const [modalConfirm, setModalConfirm] = useState<any>()

  useEffect(() => {
    Stores.segmentMappingStore.fetchListSegmentMapping()
  }, [])

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
      <LibraryComponents.Buttons.Button
        style={{ height: 10, width: 200 }}
        size="small"
        type="solid"
        onClick={() => {
          if (Stores.segmentMappingStore.selectedItems) {
            if (Stores.segmentMappingStore.selectedItems.length > 0) {
              setModalConfirm({
                type: "delete",
                show: true,
                title: "Are you sure delete recoard? ",
                body: "Multiple recoard delete. 🙂",
              })
            } else {
              alert("Please select any item.")
            }
          } else {
            alert("Please wait list loading.")
          }
        }}
      >
        <LibraryComponents.Icons.EvaIcon
          icon="trash-outline"
          size="large"
          color={Config.Styles.COLORS.BLACK}
        />
        Remove Selected
      </LibraryComponents.Buttons.Button>
      <input
        type="number"
        min="0"
        placeholder="Number"
        onChange={(e) => {
          if (e.target.value) {
            onSizePerPageChange(e.target.value)
          }
        }}
        className="mr-2 ml-2 leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
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
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
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
        value: Stores.segmentMappingStore.listSegmentMapping?.length,
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

  const handleOnSelect = (row: any, isSelect) => {
    if (Stores.segmentMappingStore.listSegmentMapping) {
      if (isSelect) {
        Stores.segmentMappingStore.updateSelectedItem([
          ...(Stores.segmentMappingStore.selectedItems || []),
          row,
        ])
      } else {
        if (Stores.segmentMappingStore.selectedItems) {
          const position = Stores.segmentMappingStore.selectedItems.indexOf(row)
          const newItem = Stores.segmentMappingStore.selectedItems.splice(
            position,
            1
          )
          Stores.segmentMappingStore.updateSelectedItem(newItem)
        }
      }
    } else {
      alert("Wait list not loaded.")
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    if (Stores.segmentMappingStore.listSegmentMapping) {
      if (isSelect) {
        rows.forEach((row) => {
          Stores.segmentMappingStore.updateSelectedItem([
            ...(Stores.segmentMappingStore.selectedItems || []),
            row,
          ])
        })
      } else {
        rows.forEach((row) => {
          if (Stores.segmentMappingStore.selectedItems) {
            const position = Stores.segmentMappingStore.selectedItems.indexOf(row)
            const newItem = Stores.segmentMappingStore.selectedItems.splice(
              position,
              1
            )
            Stores.segmentMappingStore.updateSelectedItem(newItem)
          }
        })
      }
    } else {
      alert("Wait list not loaded.")
    }
  }

  return (
    <>
      <div className="p-2 rounded-lg shadow-xl overflow-auto">
        <ToolkitProvider
          keyField="_id"
          bootstrap4
          data={Stores.segmentMappingStore.listSegmentMapping || []}
          columns={[
            {
              dataField: "_id",
              text: "Id",
              hidden: true,
              csvExport: false,
            },
            {
              dataField: "equipmentType",
              text: "EQUIPMENT TYPE",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "submitter_submitter",
              text: "SUBMITTER SUBMITTER",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              formatter: (cellContent, row) => (
                <>
                  <label>
                    {row.submitter_submitter !== undefined
                      ? row.submitter_submitter.split("&gt;").join(">")
                      : ""}
                  </label>
                </>
              ),
            },
            {
              dataField: "data_type",
              text: "DATA TYPE",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },

            {
              dataField: "segments",
              text: "SEGMENTS",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "segment_usage",
              text: "SEGMENT USAGE",
            },
            {
              dataField: "field_no",
              text: "FIELD NO",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "item_no",
              text: "ITEM NO",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "field_required",
              text: "FIELD REQUIRED",
            },
            {
              dataField: "element_name",
              text: "ELEMENT NAME",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "transmitted_data",
              text: "TRANSMITTED DATA",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },

            {
              dataField: "field_array",
              text: "FIELD ARRAY",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "field_length",
              text: "FIELD LENGTH",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "field_type",
              text: "FIELD TYPE",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "repeat_delimiter",
              text: "REPEAT DELIMITER",
            },
            {
              dataField: "mandatory",
              text: "MANDATORY",
            },
            {
              dataField: "lims_descriptions",
              text: "LIMS DESCRIPTIONS",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },
            {
              dataField: "lims_tables",
              text: "LIMS TABLES",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },

            {
              dataField: "lims_fields",
              text: "LIMS FIELDS",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },

            {
              dataField: "required_for_lims",
              text: "REQUIRED FOR LIMS",
            },
            {
              dataField: "notes",
              text: "NOTES",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
            },

            {
              dataField: "attachments",
              text: "ATTACHMENTS",
            },

            {
              dataField: "opration",
              text: "Delete",
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Icons.Remove}
                    onClick={() => {
                      Stores.segmentMappingStore.updateSelectedItem([])
                      Stores.segmentMappingStore.updateSelectedItem([row])
                      if (Stores.segmentMappingStore.selectedItems) {
                        if (Stores.segmentMappingStore.selectedItems.length > 0) {
                          setModalConfirm({
                            type: "delete",
                            show: true,
                            title: "Are you sure delete recoard? ",
                            body: `Item id= ${row._id}`,
                          })
                        }
                      } else {
                        alert("Please select any item.")
                      }
                    }}
                  >
                    Delete
                  </LibraryComponents.Buttons.Button>
                </>
              ),
            },
          ]}
          search
          exportCSV={{
            fileName: `segmentMapping_${moment(new Date()).format(
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
              <br />
              <BootstrapTable
                {...props.baseProps}
                noDataIndication="Table is Empty"
                hover
                pagination={paginationFactory(options)}
                filter={filterFactory()}
                selectRow={{
                  mode: "checkbox",
                  clickToSelect: true,
                  onSelect: handleOnSelect,
                  onSelectAll: handleOnSelectAll,
                }}
                // cellEdit={cellEditFactory({
                //   mode: "dbclick",
                //   blurToSave: true,
                //   // afterSaveCell,
                // })}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
      <LibraryComponents.Modal.ModalConfirm
        {...modalConfirm}
        click={(type) => {
          setModalConfirm({ show: false })
          if (Stores.segmentMappingStore.selectedItems) {
            console.log({
              selected: Stores.segmentMappingStore.selectedItems.map(
                (item: any) => item._id
              ),
            })
            rootStore.setProcessLoading(true)
            if (type === "delete") {
              Stores.segmentMappingStore.segmentMappingService
                .deleteSegmentMapping(
                  Stores.segmentMappingStore.selectedItems.map(
                    (item: any) => item._id
                  )
                )
                .then((res) => {
                  rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    Stores.segmentMappingStore.fetchListSegmentMapping()
                    Stores.segmentMappingStore.updateSelectedItem([])
                    LibraryComponents.ToastsStore.success(`Items deleted.`)
                  }
                })
            }
          }
        }}
        close={() => setModalConfirm({ show: false })}
      />
    </>
  )
})

export default SegmentList
