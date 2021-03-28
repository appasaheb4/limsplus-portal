/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
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
const ConversationMapping = () => {
  console.log({ Stores })

  const columns = [
    {
      dataField: "hexadecimal",
      text: "HEXADECIMAL",
    },
    {
      dataField: "binary",
      text: "BINARY",
    },
    {
      dataField: "ascii",
      text: "ASCII",
    },
  ]

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading title="Conversation Mapping" />
      </LibraryComponents.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Input
                type="text"
                label="HEXADECIMAL"
                id="hexadecimal"
                name="hexadecimal"
                value={
                  Stores.conversationMappingStore.conversationMapping?.hexadecimal
                }
                onChange={(hexadecimal) => {
                  Stores.conversationMappingStore.updateConversationMapping({
                    ...Stores.conversationMappingStore.conversationMapping,
                    hexadecimal,
                  })
                }}
              />

              <LibraryComponents.Form.Input
                type="text"
                label="BINARY"
                id="binary"
                name="binary"
                value={Stores.conversationMappingStore.conversationMapping?.binary}
                onChange={(binary) => {
                  Stores.conversationMappingStore.updateConversationMapping({
                    ...Stores.conversationMappingStore.conversationMapping,
                    binary,
                  })
                }}
              />

              <LibraryComponents.Form.Input
                type="text"
                label="ASCII"
                id="ascii"
                name="ascii"
                value={Stores.conversationMappingStore.conversationMapping?.ascii}
                onChange={(ascii) => {
                  Stores.conversationMappingStore.updateConversationMapping({
                    ...Stores.conversationMappingStore.conversationMapping,
                    ascii,
                  })
                }}
              />
              <div className="clearfix" />
            </LibraryComponents.List>
          </LibraryComponents.Grid>
          <LibraryComponents.List direction="row" space={3} align="center">
            <LibraryComponents.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Icons.Save}
              onClick={() => {
                console.log({
                  value: Stores.conversationMappingStore.conversationMapping,
                })
                if (
                  Stores.conversationMappingStore.conversationMapping !== undefined
                ) {
                  Stores.conversationMappingStore.pushListArray(
                    Stores.conversationMappingStore.conversationMapping
                  )
                } else {
                  alert("Please enter all data.")
                }
              }}
            >
              Save
            </LibraryComponents.Buttons.Button>

            <LibraryComponents.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Icons.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Buttons.Button>
            <div className="clearfix" />
          </LibraryComponents.List>
        </div>
        <div className="p-2 rounded-lg shadow-xl overflow-scroll">
          <BootstrapTable
            keyField="id"
            columns={columns}
            data={Stores.conversationMappingStore.listConversationMapping || []}
          />
        </div>
      </div>
    </>
  )
}

export default ConversationMapping
