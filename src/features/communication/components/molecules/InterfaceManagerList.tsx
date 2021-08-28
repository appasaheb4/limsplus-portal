/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"
import { Stores } from "../../stores"

interface InterfaceManagerListProps {
  data: any
  extraData: any
  totalSize: number
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
}

const InterfaceManagerList = observer((props: InterfaceManagerListProps) => {
  return (
    <LibraryComponents.Organisms.TableBootstrap
      id="_id"
      data={props.data}
      totalSize={props.totalSize}
      columns={[
        {
          dataField: "_id",
          text: "Id",
          hidden: true,
          csvExport: false,
        },
        {
          dataField: "interfaceType",
          text: "Interface Type",
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
              <LibraryComponents.Atoms.Form.Input
                name="interfaceType"
                placeholder="Interface Type"
                onBlur={(interfaceType) => {
                  if (row.interfaceType !== interfaceType && interfaceType) {
                    props.onUpdateItem &&
                      props.onUpdateItem(interfaceType, column.dataField, row._id)
                  }
                }}
              />
            </>
          ),
        },
        {
          dataField: "instrumentType",
          text: "Instrument Type",
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
              <LibraryComponents.Atoms.Form.Input
                name="instrumentType"
                placeholder="Instrument Type"
                onBlur={(instrumentType) => {
                  if (row.instrumentType !== instrumentType && instrumentType) {
                    props.onUpdateItem &&
                      props.onUpdateItem(instrumentType, column.dataField, row._id)
                  }
                }}
              />
            </>
          ),
        },
        {
          dataField: "instrumentName",
          text: "Instrument Name",
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
              <LibraryComponents.Atoms.Form.Input
                name="instrumentType"
                placeholder="Instrument Type"
                onBlur={(instrumentType) => {
                  if (row.instrumentType !== instrumentType && instrumentType) {
                    props.onUpdateItem &&
                      props.onUpdateItem(instrumentType, column.dataField, row._id)
                  }
                }}
              />
            </>
          ),
        },
        {
          dataField: "dataFlowFrom",
          text: "Data Flow From",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
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

                    props.onUpdateItem &&
                      props.onUpdateItem(dataFlowFrom, column.dataField, row._id)
                  }
                }}
              />
            </>
          ),
        },
        {
          dataField: "communicationProtocol",
          text: "Communication Protocol",
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
              <LibraryComponents.Atoms.Form.Input
                name="communicationProtocol"
                placeholder="Communication Protocol"
                onBlur={(communicationProtocol) => {
                  if (
                    row.communicationProtocol !== communicationProtocol &&
                    communicationProtocol
                  ) {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        communicationProtocol,
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
          dataField: "block",
          text: "Block",
          sort: true,
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

                      props.onUpdateItem &&
                        props.onUpdateItem(blockStart, "blockStart", row._id)
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
                      props.onUpdateItem &&
                        props.onUpdateItem(blockEnd, "blockEnd", row._id)
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
          sort: true,
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
                      let filed = Stores.interfaceManagerStore.encodeCharacter?.filed
                      let value = Stores.interfaceManagerStore.encodeCharacter?.value
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

                        props.onUpdateItem &&
                          props.onUpdateItem(fileds, "fileds", row._id)

                        Stores.interfaceManagerStore.updateEncodeCharacter({
                          ...Stores.interfaceManagerStore.encodeCharacter,
                          filed: "",
                          value: "",
                        })
                      }
                    }}
                  >
                    <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
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
                        icon={LibraryComponents.Atoms.Icon.Remove}
                        onClick={() => {
                          const firstArr = row.fileds?.slice(0, index) || []
                          const secondArr = row.fileds?.slice(index + 1) || []
                          const newArrSubCategory = [...firstArr, ...secondArr]

                          props.onUpdateItem &&
                            props.onUpdateItem(newArrSubCategory, "fileds", row._id)
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
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
              </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "operation",
          text: "Action",
          editable: false,
          csvExport: false,
          hidden: !props.isDelete,
          formatter: (cellContent, row) => (
            <>
              <div className="flex flex-row">
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#000"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "Delete",
                            show: true,
                            id: [row._id],
                            title: "Are you sure?",
                            body: `Delete item`,
                          })
                        }
                      >
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                  </div>
            </>
          ),
        },
      ]}
      isEditModify={props.isEditModify}
      isSelectRow={true}
      fileName="Interface Manager"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
      onPageSizeChange={(page,size)=>{
        props.onPageSizeChange && props.onPageSizeChange(page,size)
      }}
    />
  )
})
export default InterfaceManagerList
