/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"

import { Stores } from "../../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RootStore } from "@lp/library/stores"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface LabListProps {
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
}

const LabList = observer((props: LabListProps) => {
  return (
    <>
      <ToolkitProvider
        keyField="id"
        data={Stores.labStore.listLabs || []}
        columns={[
          {
            dataField: "code",
            text: "Code",
            sort: true,
          },
          {
            dataField: "name",
            text: "Name",
          },
          {  
            dataField: "opration",
            text: "Delete",
            editable: false,
            csvExport: false,
            hidden: props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.Buttons.Button
                  size="small"
                  type="outline"
                  icon={LibraryComponents.Atoms.Icons.Remove}
                  onClick={() => {
                    props.onDelete &&
                      props.onDelete({
                        show: true,
                        id: row._id,
                        title: "Are you sure?",
                        body: `Delete ${row.name} lab!`,
                      })
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
          fileName: `Labs_${moment(new Date()).format("YYYY-MM-DD HH:mm")}.csv`,
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
              pagination={paginationFactory()}
            />
          </div>
        )}
      </ToolkitProvider>
    </>
  )
})  
export default LabList
