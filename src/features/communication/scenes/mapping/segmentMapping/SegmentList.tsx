/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import moment from "moment"
import * as Models from "../../../models"
import RootStoreContext from "@lp/library/stores"
import * as Config from "@lp/config"
import * as Assets from "@lp/features/assets"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

import { Stores } from "../../../stores"

interface SegmentListProps {
  duplicate: (item: Models.SegmentMapping) => void
}

const SegmentList = observer((props: SegmentListProps) => {
  const rootStore = useContext(RootStoreContext.rootStore)
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
          console.log({ position })

          const newItem = Stores.segmentMappingStore.selectedItems.splice(
            0,
            position
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
      <div style={{ position: "relative" }}>
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    name="equipmentType"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const equipmentType = e.target.value
                      if (row.equipmentType !== equipmentType) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: equipmentType,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${equipmentType}`,
                        })
                      }
                    }}
                  >
                    <option selected>{row.equipmentType}</option>
                    {Models.options.equipmentType.map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "dataFlowFrom",
              text: "DATA FLOW FROM",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.dataFlowFrom !== undefined
                    ? row.dataFlowFrom.split("&gt;").join(">")
                    : ""
                }`,
              formatter: (cellContent, row) => (
                <>
                  <label>
                    {row.dataFlowFrom !== undefined
                      ? row.dataFlowFrom.split("&gt;").join(">")
                      : ""}
                  </label>
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    name="dataFlowFrom"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const dataFlowFrom = e.target.value
                      if (row.dataFlowFrom !== dataFlowFrom) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: dataFlowFrom,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${dataFlowFrom}`,
                        })
                      }
                    }}
                  >
                    <option selected>
                      {row.dataFlowFrom !== undefined
                        ? row.dataFlowFrom.split("&gt;").join(">")
                        : ""}
                    </option>
                    {Models.options.dataFlowFrom.map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "data_type",
              text: "DATA TYPE",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    name="data_type"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const data_type = e.target.value
                      if (row.dataFlowFrom !== data_type) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: data_type,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${data_type}`,
                        })
                      }
                    }}
                  >
                    <option selected>{row.data_type}</option>
                    {Models.options.data_type.map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },

            {
              dataField: "segments",
              text: "SEGMENTS",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    name="segments"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const segments = e.target.value
                      if (row.segments !== segments) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: segments,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${segments}`,
                        })
                      }
                    }}
                  >
                    <option selected>{row.segments}</option>
                    {Models.options.segments.map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "segment_usage",
              text: "SEGMENT USAGE",
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    name="segments"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const segment_usage = e.target.value
                      if (row.segment_usage !== segment_usage) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: segment_usage,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${segment_usage}`,
                        })
                      }
                    }}
                  >
                    <option selected>{row.segment_usage}</option>
                    {Models.options.segment_usage.map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "field_no",
              text: "FIELD NO",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    type="number"
                    name="field_no"
                    placeholder="Field No"
                    onBlur={(field_no) => {
                      if (row.field_no !== field_no && field_no) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: field_no,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${field_no}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "item_no",
              text: "ITEM NO",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    type="number"
                    name="item_no"
                    placeholder="Item No"
                    onBlur={(item_no) => {
                      if (row.item_no !== item_no && item_no) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: item_no,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${item_no}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "field_required",
              text: "FIELD REQUIRED",
              editable: false,
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.field_required !== undefined
                    ? row.field_required
                      ? "Yes"
                      : "No"
                    : "No"
                }`,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Form.Toggle
                    id="field_required"
                    value={row.field_required}
                    onChange={(field_required) => {
                      if (row.field_required !== field_required) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: field_required,
                          dataField: "field_required",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${
                            field_required === true ? "Yes" : "No"
                          }`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "element_name",
              text: "ELEMENT NAME",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.element_name !== undefined ? row.element_name : ""}`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="element_name"
                    placeholder="Element name"
                    onBlur={(element_name) => {
                      if (row.field_no !== element_name && element_name) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: element_name,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${element_name}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "transmitted_data",
              text: "TRANSMITTED DATA",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.transmitted_data !== undefined ? row.transmitted_data : ""}`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="transmitted_data"
                    placeholder="Transmitted data"
                    onBlur={(transmitted_data) => {
                      if (row.field_no !== transmitted_data && transmitted_data) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: transmitted_data,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${transmitted_data}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },

            {
              dataField: "field_array",
              text: "FIELD ARRAY",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.field_array !== undefined ? row.field_array : ""}`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="field_array"
                    placeholder="Field array"
                    onBlur={(field_array) => {
                      if (row.field_no !== field_array && field_array) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: field_array,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${field_array}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "field_length",
              text: "FIELD LENGTH",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.field_length !== undefined ? row.field_length : ""}`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    type="number"
                    name="field_length"
                    placeholder="Field length"
                    onBlur={(field_length) => {
                      if (row.field_no !== field_length && field_length) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: field_length,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${field_length}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "field_type",
              text: "FIELD TYPE",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.field_type !== undefined ? row.field_type : ""}`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="field_type"
                    placeholder="Field type"
                    onBlur={(field_type) => {
                      if (row.field_no !== field_type && field_type) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: field_type,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${field_type}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "repeat_delimiter",
              text: "REPEAT DELIMITER",
              editable: false,
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.repeat_delimiter !== undefined
                    ? row.repeat_delimiter
                      ? "Yes"
                      : "No"
                    : "No"
                }`,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Form.Toggle
                    id="field_required"
                    value={row.repeat_delimiter}
                    onChange={(repeat_delimiter) => {
                      if (row.repeat_delimiter !== repeat_delimiter) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: repeat_delimiter,
                          dataField: "repeat_delimiter",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${
                            repeat_delimiter === true ? "Yes" : "No"
                          }`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "mandatory",
              text: "MANDATORY",
              editable: false,
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.mandatory !== undefined ? (row.mandatory ? "Yes" : "No") : "No"
                }`,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Form.Toggle
                    id="mandatory"
                    value={row.mandatory}
                    onChange={(mandatory) => {
                      if (row.mandatory !== mandatory) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: mandatory,
                          dataField: "mandatory",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${mandatory === true ? "Yes" : "No"}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "lims_descriptions",
              text: "LIMS DESCRIPTIONS",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.lims_descriptions !== undefined ? row.lims_descriptions : ""
                }`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="lims_descriptions"
                    placeholder="Lims descriptions"
                    onBlur={(lims_descriptions) => {
                      if (row.lims_descriptions !== lims_descriptions) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: lims_descriptions,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${lims_descriptions}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "lims_tables",
              text: "LIMS TABLES",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.lims_tables !== undefined ? row.lims_tables : ""}`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="lims_tables"
                    placeholder="Lims tables"
                    onBlur={(lims_tables) => {
                      if (row.lims_tables !== lims_tables) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: lims_tables,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${lims_tables}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },

            {
              dataField: "lims_fields",
              text: "LIMS FIELDS",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.lims_fields !== undefined ? row.lims_fields : ""}`,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="lims_fields"
                    placeholder="Lims fields"
                    onBlur={(lims_fields) => {
                      if (row.lims_fields !== lims_fields) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: lims_fields,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${lims_fields}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },

            {
              dataField: "required_for_lims",
              text: "REQUIRED FOR LIMS",
              editable: false,
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.required_for_lims !== undefined
                    ? row.required_for_lims
                      ? "Yes"
                      : "No"
                    : "No"
                }`,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Form.Toggle
                    id="required_for_lims"
                    value={row.required_for_lims}
                    onChange={(required_for_lims) => {
                      if (row.required_for_lims !== required_for_lims) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: required_for_lims,
                          dataField: "required_for_lims",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${
                            required_for_lims === true ? "Yes" : "No"
                          }`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "notes",
              text: "NOTES",
              sort: true,
              filter: textFilter(),
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.notes !== undefined ? row.notes : ""}`,
              formatter: (cellContent, row) => (
                <>
                  {row.notes !== undefined ? (
                    <>
                      <label>{row.notes}</label>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.Input
                    name="notes"
                    placeholder="Notes"
                    onBlur={(notes) => {
                      if (row.notes !== notes) {
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: notes,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                          body: `New value = ${notes}`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "attachments",
              text: "ATTACHMENTS",
              headerStyle: { minWidth: "230px" },
              csvFormatter: (cell, row, rowIndex) =>
                `${row.attachments !== undefined ? row.attachments : ""}`,
              formatter: (cellContent, row) => (
                <>
                  {row.attachments !== undefined ? (
                    <>
                      <ul>
                        {JSON.parse(row.attachments).map((item) => (
                          <>
                            <li>
                              <a href={item}>{item}</a>
                            </li>
                          </>
                        ))}
                      </ul>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Form.InputFile
                    multiple={true}
                    name="attachments"
                    placeholder="ATTACHMENTS"
                    onChange={async (e) => {
                      if (e) {
                        const files = e.target.files
                        const path: string[] = []
                        if (files) {
                          for (let i = 0; i < files.length; i++) {
                            await Assets.Stores.Stores.assetsStore.assetsService.uploadFile(
                              files[i],
                              "communication",
                              files[i].name
                            )
                            path.push(
                              `https://limsplus.blob.core.windows.net/communication/${files[i].name}`
                            )
                          }
                        }
                        Stores.segmentMappingStore.changeUpdateItem({
                          value: JSON.stringify(path),
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "opration",
              text: "Duplicate",
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Buttons.Button
                    size="small"
                    type="outline"
                    onClick={() => {
                      Stores.segmentMappingStore.updateSelectedItem([])
                      Stores.segmentMappingStore.updateSelectedItem([row])
                      if (Stores.segmentMappingStore.selectedItems) {
                        if (Stores.segmentMappingStore.selectedItems.length > 0) {
                          setModalConfirm({
                            type: "duplicate",
                            show: true,
                            title: "Are you sure duplicate recoard? ",
                          })
                        }
                      } else {
                        alert("Please select any item.")
                      }
                    }}
                  >
                    <LibraryComponents.Icons.EvaIcon
                      icon="copy-outline"
                      size="medium"
                      color={Config.Styles.COLORS.BLACK}
                    />
                    Duplicate
                  </LibraryComponents.Buttons.Button>
                </>
              ),
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
                  // clickToSelect: true,
                  onSelect: handleOnSelect,
                  onSelectAll: handleOnSelectAll,
                }}
                cellEdit={cellEditFactory({
                  mode: "dbclick",
                  blurToSave: true,
                  // afterSaveCell,
                })}
              />
            </div>
          )}
        </ToolkitProvider>

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
              //rootStore.setProcessLoading(true)
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
              } else if (type == "update") {
                Stores.segmentMappingStore.segmentMappingService
                  .updateSingleFiled(Stores.segmentMappingStore.updateItem)
                  .then((res) => {
                    rootStore.setProcessLoading(false)
                    if (res.status === 200) {
                      Stores.segmentMappingStore.fetchListSegmentMapping()
                      LibraryComponents.ToastsStore.success(`Updated.`)
                    }
                  })
              } else if (type == "duplicate") {
                rootStore.setProcessLoading(false)
                props.duplicate(Stores.segmentMappingStore.selectedItems[0])
              }
            }
          }}
          close={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default SegmentList
