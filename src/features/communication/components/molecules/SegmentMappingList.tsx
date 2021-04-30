/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as Models from "../../models"

import * as Assets from "@lp/features/assets"
import * as Config from "@lp/config"

import { Stores } from "../../stores"

interface SegmentMappingListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onDuplicate?: (selectedItem: any) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const SegmentMappingList = observer((props: SegmentMappingListProps) => {
  return (
    <LibraryComponents.Organisms.TableBootstrap
      id="_id"
      data={props.data}
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(equipmentType, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(dataFlowFrom, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(data_type, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(segments, column.dataField, row._id)
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
                    props.onUpdateItem &&
                      props.onUpdateItem(segment_usage, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(field_no, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(item_no, column.dataField, row._id)
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
                    props.onUpdateItem &&
                      props.onUpdateItem(field_required, "field_required", row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(element_name, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(transmitted_data, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(field_array, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(field_length, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(field_type, column.dataField, row._id)
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
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        repeat_delimiter,
                        "repeat_delimiter",
                        row._id
                      )
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
            `${row.mandatory !== undefined ? (row.mandatory ? "Yes" : "No") : "No"}`,
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.Form.Toggle
                id="mandatory"
                value={row.mandatory}
                onChange={(mandatory) => {
                  if (row.mandatory !== mandatory) {
                    props.onUpdateItem &&
                      props.onUpdateItem(mandatory, "mandatory", row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          headerStyle: { minWidth: "230px" },
          csvFormatter: (cell, row, rowIndex) =>
            `${row.lims_descriptions !== undefined ? row.lims_descriptions : ""}`,
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
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        lims_descriptions,
                        column.dataField,
                        row._id
                      )
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(lims_tables, column.dataField, row._id)
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(lims_fields, column.dataField, row._id)
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
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        required_for_lims,
                        "required_for_lims",
                        row._id
                      )
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
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    props.onUpdateItem &&
                      props.onUpdateItem(notes, column.dataField, row._id)
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
                        await Assets.Stores.Stores.assetsStore.AssetsService.uploadFile(
                          files[i],
                          "communication",
                          files[i].name
                        )
                        path.push(
                          `https://limsplus.blob.core.windows.net/communication/${files[i].name}`
                        )
                      }
                    }
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        JSON.stringify(path),
                        column.dataField,
                        row._id
                      )
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
              <LibraryComponents.Atoms.Buttons.Button
                size="small"
                type="outline"
                onClick={() => {
                  Stores.segmentMappingStore.updateSelectedItem([])
                  Stores.segmentMappingStore.updateSelectedItem([row])
                  if (Stores.segmentMappingStore.selectedItems) {
                    if (Stores.segmentMappingStore.selectedItems.length > 0) {
                      props.onDuplicate &&
                        props.onDuplicate({
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
          hidden: !props.isDelete,
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.Buttons.Button
                size="small"
                type="outline"
                icon={LibraryComponents.Atoms.Icon.Remove}
                onClick={() => {
                  Stores.segmentMappingStore.updateSelectedItem([])
                  Stores.segmentMappingStore.updateSelectedItem([row])
                  if (Stores.segmentMappingStore.selectedItems) {
                    if (Stores.segmentMappingStore.selectedItems.length > 0) {
                      props.onDelete &&
                        props.onDelete({
                          type: "Delete",
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
              </LibraryComponents.Atoms.Buttons.Button>
            </>
          ),
        },
      ]}
      isEditModify={props.isEditModify}
      isSelectRow={true}
      fileName="Segment Mapping"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
    />
  )
})
export default SegmentMappingList
