/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import { Stores } from "../../stores"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface DeginisationListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const DeginisationList = observer((props: DeginisationListProps) => {
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
          dataField: "code",
          text: "Code",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "description",
          text: "Description",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                icon={LibraryComponents.Atoms.Icons.Remove}
                onClick={() => {
                  props.onDelete &&
                    props.onDelete({
                      type: "Delete",
                      show: true,
                      id: [row._id],
                      title: "Are you sure?",
                      body: `Delete ${row.description} deginisation!`,
                    })
                }}
              >
                Delete
              </LibraryComponents.Atoms.Buttons.Button>
            </>
          ),
        },
      ]}
      isEditModify={props.isEditModify}
      fileName="Deginisation"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
    />
  )
})
export default DeginisationList
