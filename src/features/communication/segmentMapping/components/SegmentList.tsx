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
import * as Models from "../../models"
import { SegmentMapping } from "../models"
import * as Config from "@lp/config"
import * as Assets from "@lp/features/assets"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

import { useStores } from "@lp/stores"

interface SegmentListProps {
  duplicate: (item: SegmentMapping) => void
}

const SegmentList = observer((props: SegmentListProps) => {
  const [modalConfirm, setModalConfirm] = useState<any>()
  const { segmentMappingStore } = useStores()

  useEffect(() => {
    segmentMappingStore.fetchListSegmentMapping()
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
      <LibraryComponents.Atoms.Buttons.Button
        style={{ height: 10, width: 200 }}
        size="small"
        type="solid"
        onClick={() => {
          if (segmentMappingStore.selectedItems) {
            if (segmentMappingStore.selectedItems.length > 0) {
              setModalConfirm({
                type: "delete",
                show: true,
                title: "Are you sure delete recoard? ",
                body: `Delete selected items!`,
              })
            } else {
              alert("Please select any item.")
            }
          } else {
            alert("Please wait list loading.")
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
    paginationSize: 5,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    totalSize: segmentMappingStore.listSegmentMappingCount,
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
        value: segmentMappingStore.listSegmentMapping?.length,
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
    if (segmentMappingStore.listSegmentMapping) {
      if (isSelect) {
        segmentMappingStore.updateSelectedItem([
          ...(segmentMappingStore.selectedItems || []),
          row,
        ])
      } else {
        if (segmentMappingStore.selectedItems) {
          const position = segmentMappingStore.selectedItems.indexOf(row)
          console.log({ position })

          const newItem = segmentMappingStore.selectedItems.splice(0, position)
          segmentMappingStore.updateSelectedItem(newItem)
        }
      }
    } else {
      alert("Wait list not loaded.")
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    if (segmentMappingStore.listSegmentMapping) {
      if (isSelect) {
        rows.forEach((row) => {
          segmentMappingStore.updateSelectedItem([
            ...(segmentMappingStore.selectedItems || []),
            row,
          ])
        })
      } else {
        rows.forEach((row) => {
          if (segmentMappingStore.selectedItems) {
            const position = segmentMappingStore.selectedItems.indexOf(row)
            const newItem = segmentMappingStore.selectedItems.splice(position, 1)
            segmentMappingStore.updateSelectedItem(newItem)
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
          data={segmentMappingStore.listSegmentMapping || []}
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const equipmentType = e.target.value
                      if (row.equipmentType !== equipmentType) {
                        segmentMappingStore.changeUpdateItem({
                          value: equipmentType,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const dataFlowFrom = e.target.value
                      if (row.dataFlowFrom !== dataFlowFrom) {
                        segmentMappingStore.changeUpdateItem({
                          value: dataFlowFrom,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const data_type = e.target.value
                      if (row.dataFlowFrom !== data_type) {
                        segmentMappingStore.changeUpdateItem({
                          value: data_type,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const segments = e.target.value
                      if (row.segments !== segments) {
                        segmentMappingStore.changeUpdateItem({
                          value: segments,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const segment_usage = e.target.value
                      if (row.segment_usage !== segment_usage) {
                        segmentMappingStore.changeUpdateItem({
                          value: segment_usage,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    name="field_no"
                    placeholder="Field No"
                    onBlur={(field_no) => {
                      if (row.field_no !== field_no && field_no) {
                        segmentMappingStore.changeUpdateItem({
                          value: field_no,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    name="item_no"
                    placeholder="Item No"
                    onBlur={(item_no) => {
                      if (row.item_no !== item_no && item_no) {
                        segmentMappingStore.changeUpdateItem({
                          value: item_no,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Toggle
                    id="field_required"
                    value={row.field_required}
                    onChange={(field_required) => {
                      if (row.field_required !== field_required) {
                        segmentMappingStore.changeUpdateItem({
                          value: field_required,
                          dataField: "field_required",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="element_name"
                    placeholder="Element name"
                    onBlur={(element_name) => {
                      if (row.field_no !== element_name && element_name) {
                        segmentMappingStore.changeUpdateItem({
                          value: element_name,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="transmitted_data"
                    placeholder="Transmitted data"
                    onBlur={(transmitted_data) => {
                      if (row.field_no !== transmitted_data && transmitted_data) {
                        segmentMappingStore.changeUpdateItem({
                          value: transmitted_data,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="field_array"
                    placeholder="Field array"
                    onBlur={(field_array) => {
                      if (row.field_no !== field_array && field_array) {
                        segmentMappingStore.changeUpdateItem({
                          value: field_array,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    name="field_length"
                    placeholder="Field length"
                    onBlur={(field_length) => {
                      if (row.field_no !== field_length && field_length) {
                        segmentMappingStore.changeUpdateItem({
                          value: field_length,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="field_type"
                    placeholder="Field type"
                    onBlur={(field_type) => {
                      if (row.field_no !== field_type && field_type) {
                        segmentMappingStore.changeUpdateItem({
                          value: field_type,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Toggle
                    id="field_required"
                    value={row.repeat_delimiter}
                    onChange={(repeat_delimiter) => {
                      if (row.repeat_delimiter !== repeat_delimiter) {
                        segmentMappingStore.changeUpdateItem({
                          value: repeat_delimiter,
                          dataField: "repeat_delimiter",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Toggle
                    id="mandatory"
                    value={row.mandatory}
                    onChange={(mandatory) => {
                      if (row.mandatory !== mandatory) {
                        segmentMappingStore.changeUpdateItem({
                          value: mandatory,
                          dataField: "mandatory",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="lims_descriptions"
                    placeholder="Lims descriptions"
                    onBlur={(lims_descriptions) => {
                      if (row.lims_descriptions !== lims_descriptions) {
                        segmentMappingStore.changeUpdateItem({
                          value: lims_descriptions,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="lims_tables"
                    placeholder="Lims tables"
                    onBlur={(lims_tables) => {
                      if (row.lims_tables !== lims_tables) {
                        segmentMappingStore.changeUpdateItem({
                          value: lims_tables,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="lims_fields"
                    placeholder="Lims fields"
                    onBlur={(lims_fields) => {
                      if (row.lims_fields !== lims_fields) {
                        segmentMappingStore.changeUpdateItem({
                          value: lims_fields,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Toggle
                    id="required_for_lims"
                    value={row.required_for_lims}
                    onChange={(required_for_lims) => {
                      if (row.required_for_lims !== required_for_lims) {
                        segmentMappingStore.changeUpdateItem({
                          value: required_for_lims,
                          dataField: "required_for_lims",
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  <LibraryComponents.Atoms.Form.Input
                    name="notes"
                    placeholder="Notes"
                    onBlur={(notes) => {
                      if (row.notes !== notes) {
                        segmentMappingStore.changeUpdateItem({
                          value: notes,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
                  {row.attachments ? (
                    <>
                      {"1 file available"}
                      {/* <ul>
                        {JSON.parse(row.attachments).map((item) => (
                          <>
                            <li>
                              <a href={item}>{item}</a>
                            </li>
                          </>
                        ))}
                      </ul> */}
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
                  <LibraryComponents.Atoms.Form.InputFile
                    multiple={true}
                    name="attachments"
                    placeholder="ATTACHMENTS"
                    onChange={async (e) => {
                      if (e) {
                        const files = e.target.files
                        const path: string[] = []
                        if (files) {
                          for (let i = 0; i < files.length; i++) {
                            // TODO: pending image upload
                            // await Assets.assetsStore.AssetsService.uploadFile(
                            //   files[i],
                            //   "communication",
                            //   files[i].name
                            // )
                            // path.push(
                            //   `https://limsplus.blob.core.windows.net/communication/${files[i].name}`
                            // )
                          }
                        }
                        segmentMappingStore.changeUpdateItem({
                          value: JSON.stringify(path),
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "Update",
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
              dataField: "environment",
              text: "Environment",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  {/* <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={row.environment}
                      className="leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md"
                      onChange={(e) => {
                        const environment = e.target.value
                        props.onUpdateItem && props.onUpdateItem(environment,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper> */}
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
                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    onClick={() => {
                      segmentMappingStore.updateSelectedItem([])
                      segmentMappingStore.updateSelectedItem([row])
                      if (segmentMappingStore.selectedItems) {
                        if (segmentMappingStore.selectedItems.length > 0) {
                          setModalConfirm({
                            type: "Duplicate",
                            show: true,
                            title: "Are you sure duplicate recoard? ",
                          })
                        }
                      } else {
                        alert("Please select any item.")
                      }
                    }}
                  >
                    <LibraryComponents.Atoms.Icon.EvaIcon
                      icon="copy-outline"
                      size="medium"
                      color={Config.Styles.COLORS.BLACK}
                    />
                    Duplicate
                  </LibraryComponents.Atoms.Buttons.Button>
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
                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Atoms.Icon.Remove}
                    onClick={() => {
                      segmentMappingStore.updateSelectedItem([])
                      segmentMappingStore.updateSelectedItem([row])
                      if (segmentMappingStore.selectedItems) {
                        if (segmentMappingStore.selectedItems.length > 0) {
                          setModalConfirm({
                            type: "delete",
                            show: true,
                            title: "Are you sure delete recoard? ",
                            body: `Delete selected items!`,
                          })
                        }
                      } else {
                        alert("Please select any item.")
                      }
                    }}
                  >
                    Delete
                  </LibraryComponents.Atoms.Buttons.Button>
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

        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type) => {
            setModalConfirm({ show: false })
            if (segmentMappingStore.selectedItems) {
              console.log({type});
              
              if (type === "delete") {
                segmentMappingStore.segmentMappingService
                  .deleteSegmentMapping({
                    input: {
                      id: segmentMappingStore.selectedItems.map(
                        (item: any) => item._id
                      ),
                    },
                  })
                  .then((res) => {
                    if (res.removeSegmentMapping.success) {
                      segmentMappingStore.fetchListSegmentMapping()
                      segmentMappingStore.updateSelectedItem([])
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 ${res.removeSegmentMapping.message}`,
                      })
                    }
                  })
              } else if (type == "Update") {
                segmentMappingStore.segmentMappingService
                  .updateSingleFiled({
                    input: {
                      _id: segmentMappingStore.updateItem.id,
                      [segmentMappingStore.updateItem.dataField]:
                        segmentMappingStore.updateItem.value,
                    },
                  })
                  .then((res) => {
                    if (res.updateSegmentMapping.success) {
                      segmentMappingStore.fetchListSegmentMapping()
                      LibraryComponents.Atoms.Toast.success({
                        message: ` ${res.updateSegmentMapping.message}`,
                      })
                    }
                  })
              } else if (type == "Duplicate") {
                props.duplicate(segmentMappingStore.selectedItems[0])
              }
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default SegmentList
