/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

import { Stores } from "../../../stores"
import { Stores as RootStore } from "@lp/library/stores"

const ConversationMapping = observer(() => {
  const [modalConfirm, setModalConfirm] = useState<any>()
  useEffect(() => {
    Stores.conversationMappingStore.fetchConversationMapping()
  }, [])

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
                label="Hexa Decimal"
                id="hexadecimal"
                name="hexadecimal"
                placeholder="Hexa Decimal"
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
                label="Binary"
                id="binary"
                name="binary"
                placeholder="Binary"
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
                placeholder="ASCII"
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
                if (
                  Stores.conversationMappingStore.conversationMapping !== undefined
                ) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.conversationMappingStore.conversationMappingService
                    .addConversationMapping(
                      Stores.conversationMappingStore.conversationMapping
                    )
                    .then((res) => {
                      RootStore.rootStore.setProcessLoading(false)
                      if (res.status === 200) {
                        LibraryComponents.ToastsStore.success(
                          `Conversation Mapping created.`
                        )
                        window.location.reload()
                        //Stores.conversationMappingStore.()
                      }
                    })
                } else {
                  LibraryComponents.ToastsStore.warning(
                    "Please enter all information!"
                  )
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
          <ToolkitProvider
            keyField="conversationMapping"
            data={Stores.conversationMappingStore.listConversationMapping || []}
            columns={[
              {
                dataField: "hexadecimal",
                text: "Hexa Decimal",
                formatter: (cellContent, row) => (
                  <>
                    {row.hexadecimal !== undefined
                      ? row.hexadecimal
                          .toString()
                          .replaceAll(/&amp;/g, "&")
                          .replaceAll(/&gt;/g, ">")
                          .replaceAll(/&lt;/g, "<")
                          .replaceAll(/&quot;/g, '"')
                          .replaceAll(/â/g, "’")
                          .replaceAll(/â¦/g, "…")
                          .toString()
                      : undefined}
                  </>
                ),
              },
              {
                dataField: "binary",
                text: "Binary",
                formatter: (cellContent, row) => (
                  <>
                    {row.binary !== undefined
                      ? row.binary
                          .toString()
                          .replaceAll(/&amp;/g, "&")
                          .replaceAll(/&gt;/g, ">")
                          .replaceAll(/&lt;/g, "<")
                          .replaceAll(/&quot;/g, '"')
                          .replaceAll(/â/g, "’")
                          .replaceAll(/â¦/g, "…")
                          .toString()
                      : undefined}
                  </>
                ),
              },
              {
                dataField: "ascii",
                text: "ASCII",
                formatter: (cellContent, row) => (
                  <>
                    {row.ascii !== undefined
                      ? row.ascii
                          .toString()
                          .replaceAll(/&amp;/g, "&")
                          .replaceAll(/&gt;/g, ">")
                          .replaceAll(/&lt;/g, "<")
                          .replaceAll(/&quot;/g, '"')
                          .replaceAll(/â/g, "’")
                          .replaceAll(/â¦/g, "…")
                          .toString()
                      : undefined}
                  </>
                ),
              },
              {
                dataField: "operation",
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
                        setModalConfirm({
                          type: "delete",
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete ${row.hexadecimal} hexadecimal!`,
                        })
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
              fileName: `ConversationMapping_${moment(new Date()).format(
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
                  pagination={paginationFactory()}
                  cellEdit={cellEditFactory({
                    mode: "dbclick",
                    blurToSave: true,
                    afterSaveCell: (oldValue, newValue, row, column) => {
                      if (oldValue !== newValue) {
                        Stores.conversationMappingStore.changeUpdateItem({
                          value: newValue,
                          dataField: column.dataField,
                          id: row._id,
                        })
                        setModalConfirm({
                          type: "update",
                          show: true,
                          title: "Are you sure update recoard?",
                        })
                        // RootStore.rootStore.setProcessLoading(true)
                        // Services.updateUserSingleFiled({
                        //   newValue,
                        //   dataField: column.dataField,
                        //   id: row._id,
                        // }).then((res) => {
                        //   RootStore.rootStore.setProcessLoading(false)
                        //   if (res.data) {
                        //     Stores.userStore.loadUser()
                        //     LibraryComponents.ToastsStore.success(`User update.`)
                        //   }
                        // })
                      }
                    },
                  })}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...modalConfirm}
          click={(type) => {
            setModalConfirm({ show: false })
            if (type === "delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.conversationMappingStore.conversationMappingService
                .deleteConversationMapping(modalConfirm.id)
                .then((res) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    Stores.conversationMappingStore.fetchConversationMapping()
                    LibraryComponents.ToastsStore.success(`Items deleted.`)
                  }
                })
            } else if (type == "update") {
              Stores.conversationMappingStore.conversationMappingService
                .updateConversationMappingUpdateSingleFiled(
                  Stores.conversationMappingStore.updateItem
                )
                .then((res) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    Stores.conversationMappingStore.fetchConversationMapping()
                    LibraryComponents.ToastsStore.success(`Updated.`)
                  }
                })
            }
          }}
          close={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default ConversationMapping
