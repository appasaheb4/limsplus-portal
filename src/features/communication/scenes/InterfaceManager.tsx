/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import * as Models from "../../../models"
import * as Config from "@lp/config"
const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport
import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"
import { toJS } from "mobx"
const InterfaceManager = observer(() => {
  const [deleteItem, setDeleteItem] = useState<any>({})
  const [modalConfirm, setModalConfirm] = useState<any>()

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading title="Interface Manager" />
      </LibraryComponents.Atoms.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Atoms.Form.Input
                label="Interface Type"
                name="interfaceType"
                placeholder="Interface Type"
                value={Stores.interfaceManagerStore.encodeCharacter?.interfaceType}
                onChange={(interfaceType) => {
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    interfaceType,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.Input
                label="Instrument Type"
                name="instrumentType"
                placeholder="Instrument Type"
                value={Stores.interfaceManagerStore.encodeCharacter?.instrumentType}
                onChange={(instrumentType) => {
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    instrumentType,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.Input
                label="Instrument Name"
                name="instrumentName"
                placeholder="Instrument Name"
                value={Stores.interfaceManagerStore.encodeCharacter?.instrumentName}
                onChange={(instrumentName) => {
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    instrumentName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Data Flow From"
                name="dataFlowFrom"
                placeholder="Data Flow From"
                value={Stores.interfaceManagerStore.encodeCharacter?.dataFlowFrom}
                onChange={(dataFlowFrom) => {
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    dataFlowFrom,
                  })
                }}
              />

              <div className="clearfix" />
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Atoms.Form.Input
                label="Communication Protocol"
                name="communicationProtocal"
                placeholder="Communication Protocal"
                value={
                  Stores.interfaceManagerStore.encodeCharacter?.communicationProtocol
                }
                onChange={(communicationProtocol) => {
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    communicationProtocol,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Block" id="block">
                <LibraryComponents.Atoms.Grid cols={2}>
                  <LibraryComponents.Atoms.Form.Input
                    name="startBlock"
                    placeholder="Start Block"
                    value={Stores.interfaceManagerStore.encodeCharacter?.blockStart}
                    onChange={(blockStart) => {
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        blockStart,
                      })
                    }}
                  />
                  <LibraryComponents.Atoms.Form.Input
                    name="endBlock"
                    placeholder="End Block"
                    value={Stores.interfaceManagerStore.encodeCharacter?.blockEnd}
                    onChange={(blockEnd) => {
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        blockEnd,
                      })
                    }}
                  />
                </LibraryComponents.Atoms.Grid>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Filed" id="filed">
                <LibraryComponents.Atoms.Grid cols={3}>
                  <LibraryComponents.Atoms.Form.Input
                    name="filed"
                    placeholder="Filed"
                    value={Stores.interfaceManagerStore.encodeCharacter?.filed}
                    onChange={(filed) => {
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        filed,
                      })
                    }}
                  />
                  <LibraryComponents.Atoms.Form.Input
                    name="value"
                    placeholder="Value"
                    value={Stores.interfaceManagerStore.encodeCharacter?.value}
                    onChange={(value) => {
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        value,
                      })
                    }}
                  />
                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const filed =
                          Stores.interfaceManagerStore.encodeCharacter?.filed
                        const value =
                          Stores.interfaceManagerStore.encodeCharacter?.value
                        const fileds =
                          Stores.interfaceManagerStore.encodeCharacter?.fileds || []
                        if (filed === undefined)
                          return alert("Please enter filed and value.")
                        if (filed !== undefined) {
                          fileds !== undefined
                            ? fileds.push({
                                filed,
                                value,
                              })
                            : [
                                {
                                  filed,
                                  value,
                                },
                              ]
                          Stores.interfaceManagerStore.updateEncodeCharacter({
                            ...Stores.interfaceManagerStore.encodeCharacter,
                            fileds,
                          })
                          Stores.interfaceManagerStore.updateEncodeCharacter({
                            ...Stores.interfaceManagerStore.encodeCharacter,
                            filed: "",
                            value: "",
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icons.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                  <div className="clearfix"></div>
                </LibraryComponents.Atoms.Grid>
                <LibraryComponents.Atoms.List space={2} direction="row" justify="center">
                  <div>
                    {Stores.interfaceManagerStore.encodeCharacter?.fileds?.map(
                      (item, index) => (
                        <div className="mb-2">
                          <LibraryComponents.Atoms.Buttons.Button
                            key={index}
                            size="medium"
                            type="solid"
                            icon={LibraryComponents.Atoms.Icons.Remove}
                            onClick={() => {
                              const firstArr =
                                Stores.interfaceManagerStore.encodeCharacter?.fileds?.slice(
                                  0,
                                  index
                                ) || []
                              const secondArr =
                                Stores.interfaceManagerStore.encodeCharacter?.fileds?.slice(
                                  index + 1
                                ) || []
                              const newArrSubCategory = [...firstArr, ...secondArr]
                              Stores.interfaceManagerStore.updateEncodeCharacter({
                                ...Stores.interfaceManagerStore.encodeCharacter,
                                fileds: newArrSubCategory,
                              })
                            }}
                          >
                            {`${item.filed} - ${item.value}`}
                          </LibraryComponents.Atoms.Buttons.Button>
                        </div>
                      )
                    )}
                  </div>
                </LibraryComponents.Atoms.List>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icons.Save}
              onClick={() => {
                if (Stores.interfaceManagerStore.encodeCharacter !== undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.interfaceManagerStore.encodeCharacterService
                    .addInterfaceManager(Stores.interfaceManagerStore.encodeCharacter)
                    .then((res) => {
                      RootStore.rootStore.setProcessLoading(false)
                      if (res.status === 200) {
                        LibraryComponents.Atoms.ToastsStore.success(
                          `Encode Character created.`
                        )
                        setTimeout(() => {
                          window.location.reload()
                        }, 1000)
                      }
                    })
                } else {
                  LibraryComponents.Atoms.ToastsStore.warning(
                    "Please enter all information!"
                  )
                }
              }}
            >
              Save
            </LibraryComponents.Atoms.Buttons.Button>

            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icons.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
            <div className="clearfix" />
          </LibraryComponents.Atoms.List>
        </div>
        <div className="p-2 rounded-lg shadow-xl overflow-scroll">
          <ToolkitProvider
            keyField="id"
            data={Stores.interfaceManagerStore.listEncodeCharacter || []}
            columns={[
              {
                dataField: "interfaceType",
                text: "Interface Type",
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
                      name="interfaceType"
                      placeholder="Interface Type"
                      onBlur={(interfaceType) => {
                        if (row.interfaceType !== interfaceType && interfaceType) {
                          Stores.interfaceManagerStore.changeUpdateItem({
                            value: interfaceType,
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
                dataField: "instrumentType",
                text: "Instrument Type",
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
                      name="instrumentType"
                      placeholder="Instrument Type"
                      onBlur={(instrumentType) => {
                        if (
                          row.instrumentType !== instrumentType &&
                          instrumentType
                        ) {
                          Stores.interfaceManagerStore.changeUpdateItem({
                            value: instrumentType,
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
                dataField: "instrumentName",
                text: "Instrument Name",
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
                      name="instrumentType"
                      placeholder="Instrument Type"
                      onBlur={(instrumentType) => {
                        if (
                          row.instrumentType !== instrumentType &&
                          instrumentType
                        ) {
                          Stores.interfaceManagerStore.changeUpdateItem({
                            value: instrumentType,
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
                dataField: "dataFlowFrom",
                text: "Data Flow From",
                headerStyle: { minWidth: "200px" },
                formatter: (cellContent, row) => (
                  <>
                    {row.dataFlowFrom !== undefined
                      ? row.dataFlowFrom
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
                      name="dataFlowFrom"
                      placeholder="Data Flow From"
                      onBlur={(dataFlowFrom) => {
                        if (row.dataFlowFrom !== dataFlowFrom && dataFlowFrom) {
                          dataFlowFrom =
                            dataFlowFrom !== undefined
                              ? dataFlowFrom
                                  .replaceAll("&", "&amp;")
                                  .replaceAll(">", "&gt;")
                                  .replaceAll("<", "&lt;")
                                  .replaceAll('"', "&quot;")
                                  .replaceAll("’", "â")
                                  .replaceAll("…", "â¦")
                                  .toString()
                              : undefined
                          Stores.interfaceManagerStore.changeUpdateItem({
                            value: dataFlowFrom,
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
                dataField: "communicationProtocol",
                text: "Communication Protocol",
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
                      name="communicationProtocol"
                      placeholder="Communication Protocol"
                      onBlur={(communicationProtocol) => {
                        if (
                          row.communicationProtocol !== communicationProtocol &&
                          communicationProtocol
                        ) {
                          Stores.interfaceManagerStore.changeUpdateItem({
                            value: communicationProtocol,
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
                dataField: "block",
                text: "Block",
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.Atoms.List
                      space={2}
                      direction="row"
                      justify="center"
                    >
                      <div>
                        <div className="mb-2">
                          <LibraryComponents.Atoms.Buttons.Button
                            size="medium"
                            type="solid"
                            onClick={() => {}}
                          >
                            {`Start:${
                              row.blockStart !== undefined
                                ? row.blockStart
                                    .toString()
                                    .replaceAll(/&amp;/g, "&")
                                    .replaceAll(/&gt;/g, ">")
                                    .replaceAll(/&lt;/g, "<")
                                    .replaceAll(/&quot;/g, '"')
                                    .replaceAll(/â/g, "’")
                                    .replaceAll(/â¦/g, "…")
                                    .toString()
                                : undefined
                            } - End:${
                              row.blockEnd !== undefined
                                ? row.blockEnd
                                    .toString()
                                    .replaceAll(/&amp;/g, "&")
                                    .replaceAll(/&gt;/g, ">")
                                    .replaceAll(/&lt;/g, "<")
                                    .replaceAll(/&quot;/g, '"')
                                    .replaceAll(/â/g, "’")
                                    .replaceAll(/â¦/g, "…")
                                    .toString()
                                : undefined
                            }`}
                          </LibraryComponents.Atoms.Buttons.Button>
                        </div>
                      </div>
                    </LibraryComponents.Atoms.List>
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
                    <LibraryComponents.Atoms.Grid cols={2}>
                      <LibraryComponents.Atoms.Form.Input
                        name="startBlock"
                        placeholder="Start Block"
                        onBlur={(blockStart: string | undefined) => {
                          if (row.blockStart !== blockStart && blockStart) {
                            console.log({ blockStart })
                            blockStart =
                              blockStart !== undefined
                                ? blockStart
                                    .replaceAll("&", "&amp;")
                                    .replaceAll(">", "&gt;")
                                    .replaceAll("<", "&lt;")
                                    .replaceAll('"', "&quot;")
                                    .replaceAll("’", "â")
                                    .replaceAll("…", "â¦")
                                    .toString()
                                : undefined
                            Stores.interfaceManagerStore.changeUpdateItem({
                              value: blockStart,
                              dataField: "blockStart",
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
                      <LibraryComponents.Atoms.Form.Input
                        name="endBlock"
                        placeholder="End Block"
                        onBlur={(blockEnd: string | undefined) => {
                          if (row.blockEnd !== blockEnd && blockEnd) {
                            blockEnd =
                              blockEnd !== undefined
                                ? blockEnd
                                    .replaceAll("&", "&amp;")
                                    .replaceAll(">", "&gt;")
                                    .replaceAll("<", "&lt;")
                                    .replaceAll('"', "&quot;")
                                    .replaceAll("’", "â")
                                    .replaceAll("…", "â¦")
                                    .toString()
                                : undefined
                            Stores.interfaceManagerStore.changeUpdateItem({
                              value: blockEnd,
                              dataField: "blockEnd",
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
                    </LibraryComponents.Atoms.Grid>
                  </>
                ),
              },
              {
                dataField: "fileds",
                text: "Fileds",
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.Atoms.List
                      space={2}
                      direction="row"
                      justify="center"
                    >
                      <div>
                        {row.fileds?.map((item, index) => (
                          <div className="mb-2">
                            <LibraryComponents.Atoms.Buttons.Button
                              key={index}
                              size="medium"
                              type="solid"
                              onClick={() => {}}
                            >
                              {`Filed:${item.filed} - Value:${
                                item.value !== undefined
                                  ? item.value
                                      .toString()
                                      .replaceAll(/&amp;/g, "&")
                                      .replaceAll(/&gt;/g, ">")
                                      .replaceAll(/&lt;/g, "<")
                                      .replaceAll(/&quot;/g, '"')
                                      .replaceAll(/â/g, "’")
                                      .replaceAll(/â¦/g, "…")
                                      .toString()
                                  : undefined
                              }`}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        ))}
                      </div>
                    </LibraryComponents.Atoms.List>
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
                    <LibraryComponents.Atoms.Grid cols={3}>
                      <LibraryComponents.Atoms.Form.Input
                        name="filed"
                        placeholder="Filed"
                        value={Stores.interfaceManagerStore.encodeCharacter?.filed}
                        onChange={(filed) => {
                          Stores.interfaceManagerStore.updateEncodeCharacter({
                            ...Stores.interfaceManagerStore.encodeCharacter,
                            filed,
                          })
                        }}
                      />
                      <LibraryComponents.Atoms.Form.Input
                        name="value"
                        placeholder="Value"
                        value={Stores.interfaceManagerStore.encodeCharacter?.value}
                        onChange={(value) => {
                          Stores.interfaceManagerStore.updateEncodeCharacter({
                            ...Stores.interfaceManagerStore.encodeCharacter,
                            value,
                          })
                        }}
                      />
                      <div className="mt-2">
                        <LibraryComponents.Atoms.Buttons.Button
                          size="medium"
                          type="solid"
                          onClick={() => {
                            let filed =
                              Stores.interfaceManagerStore.encodeCharacter?.filed
                            let value =
                              Stores.interfaceManagerStore.encodeCharacter?.value
                            const fileds = row.fileds || []
                            if (filed === undefined || value === undefined)
                              return alert("Please enter filed and value.")
                            if (filed !== undefined && value !== undefined) {
                              filed = filed
                                .replaceAll("&", "&amp;")
                                .replaceAll(">", "&gt;")
                                .replaceAll("<", "&lt;")
                                .replaceAll('"', "&quot;")
                                .replaceAll("’", "â")
                                .replaceAll("…", "â¦")
                              value = value
                                .replaceAll("&", "&amp;")
                                .replaceAll(">", "&gt;")
                                .replaceAll("<", "&lt;")
                                .replaceAll('"', "&quot;")
                                .replaceAll("’", "â")
                                .replaceAll("…", "â¦")
                              fileds !== undefined
                                ? fileds.push({
                                    filed,
                                    value,
                                  })
                                : [
                                    {
                                      filed,
                                      value,
                                    },
                                  ]
                              Stores.interfaceManagerStore.changeUpdateItem({
                                value: fileds,
                                dataField: "fileds",
                                id: row._id,
                              })
                              setModalConfirm({
                                type: "update",
                                show: true,
                                title: "Are you sure update recoard?",
                              })
                              Stores.interfaceManagerStore.updateEncodeCharacter({
                                ...Stores.interfaceManagerStore.encodeCharacter,
                                filed: "",
                                value: "",
                              })
                            }
                          }}
                        >
                          <LibraryComponents.Atoms.Icons.EvaIcon icon="plus-circle-outline" />
                          {`Add`}
                        </LibraryComponents.Atoms.Buttons.Button>
                      </div>
                      <div className="clearfix"></div>
                    </LibraryComponents.Atoms.Grid>
                    <LibraryComponents.Atoms.List
                      space={2}
                      direction="row"
                      justify="center"
                    >
                      <div>
                        {row.fileds?.map((item, index) => (
                          <div className="mb-2">
                            <LibraryComponents.Atoms.Buttons.Button
                              key={index}
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icons.Remove}
                              onClick={() => {
                                const firstArr = row.fileds?.slice(0, index) || []
                                const secondArr = row.fileds?.slice(index + 1) || []
                                const newArrSubCategory = [...firstArr, ...secondArr]
                                Stores.interfaceManagerStore.changeUpdateItem({
                                  value: newArrSubCategory,
                                  dataField: "fileds",
                                  id: row._id,
                                })
                                setModalConfirm({
                                  type: "update",
                                  show: true,
                                  title: "Are you sure update recoard?",
                                })
                              }}
                            >
                              {`${item.filed
                                .replaceAll(/&amp;/g, "&")
                                .replaceAll(/&gt;/g, ">")
                                .replaceAll(/&lt;/g, "<")
                                .replaceAll(/&quot;/g, '"')
                                .replaceAll(/â/g, "’")
                                .replaceAll(/â¦/g, "…")} - ${item.value
                                .replaceAll(/&amp;/g, "&")
                                .replaceAll(/&gt;/g, ">")
                                .replaceAll(/&lt;/g, "<")
                                .replaceAll(/&quot;/g, '"')
                                .replaceAll(/â/g, "’")
                                .replaceAll(/â¦/g, "…")}`}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        ))}
                      </div>
                    </LibraryComponents.Atoms.List>
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
                    <LibraryComponents.Atoms.Buttons.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Atoms.Icons.Remove}
                      onClick={() => {
                        setModalConfirm({
                          type: "delete",
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete interfaceType = ${row.interfaceType}!`,
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
              fileName: `Interface Manager${moment(new Date()).format(
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
                    // afterSaveCell,
                  })}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type) => {
            RootStore.rootStore.setProcessLoading(true)
            if (type === "delete") {
              Stores.interfaceManagerStore.encodeCharacterService
                .deleteInterfaceManager(modalConfirm.id)
                .then((res: any) => {
                  console.log({ res })
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(
                      `Encode Character deleted.`
                    )
                    setModalConfirm({ show: false })
                    Stores.interfaceManagerStore.fetchEncodeCharacter()
                  }
                })
            } else {
              Stores.interfaceManagerStore.encodeCharacterService
                .interfaceManagerUpdateSingleFiled(
                  toJS(Stores.interfaceManagerStore.updateItem)
                )
                .then((res) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    Stores.interfaceManagerStore.fetchEncodeCharacter()
                    LibraryComponents.Atoms.ToastsStore.success(`Updated.`)
                  }
                })
            }
          }}
          close={() => {
            setModalConfirm({ show: false })
          }}
        />
      </div>
    </>
  )
})

export default InterfaceManager
