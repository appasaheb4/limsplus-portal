/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import * as Models from "../../../models"
import * as Config from "@lp/config"
const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport
import { Stores } from "../stores"
import { toJS } from "mobx"
const EncodeCharacter = observer(() => {
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading title="Interface Manager" />
      </LibraryComponents.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Input
                label="Interface Type"
                name="interfaceType"
                placeholder="Interface Type"
                value={Stores.encodeCharacterStore.encodeCharacter?.interfaceType}
                onChange={(interfaceType) => {
                  Stores.encodeCharacterStore.updateEncodeCharacter({
                    ...Stores.encodeCharacterStore.encodeCharacter,
                    interfaceType,
                  })
                }}
              />

              <LibraryComponents.Form.Input
                label="Instrument Type"
                name="instrumentType"
                placeholder="Instrument Type"
                value={Stores.encodeCharacterStore.encodeCharacter?.instrumentType}
                onChange={(instrumentType) => {
                  Stores.encodeCharacterStore.updateEncodeCharacter({
                    ...Stores.encodeCharacterStore.encodeCharacter,
                    instrumentType,
                  })
                }}
              />

              <LibraryComponents.Form.Input
                label="Instrument Name"
                name="instrumentName"
                placeholder="Instrument Name"
                value={Stores.encodeCharacterStore.encodeCharacter?.instrumentName}
                onChange={(instrumentName) => {
                  Stores.encodeCharacterStore.updateEncodeCharacter({
                    ...Stores.encodeCharacterStore.encodeCharacter,
                    instrumentName,
                  })
                }}
              />

              <LibraryComponents.Form.Input
                label="Communication Protocol"
                name="communicationProtocal"
                placeholder="Communication Protocal"
                value={
                  Stores.encodeCharacterStore.encodeCharacter?.communicationProtocol
                }
                onChange={(communicationProtocol) => {
                  Stores.encodeCharacterStore.updateEncodeCharacter({
                    ...Stores.encodeCharacterStore.encodeCharacter,
                    communicationProtocol,
                  })
                }}
              />
              <div className="clearfix" />
            </LibraryComponents.List>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.InputWrapper label="Block" id="block">
                <LibraryComponents.Grid cols={2}>
                  <LibraryComponents.Form.Input
                    name="startBlock"
                    placeholder="Start Block"
                    value={Stores.encodeCharacterStore.encodeCharacter?.blockStart}
                    onChange={(blockStart) => {
                      Stores.encodeCharacterStore.updateEncodeCharacter({
                        ...Stores.encodeCharacterStore.encodeCharacter,
                        blockStart,
                      })
                    }}
                  />
                  <LibraryComponents.Form.Input
                    name="endBlock"
                    placeholder="End Block"
                    value={Stores.encodeCharacterStore.encodeCharacter?.blockEnd}
                    onChange={(blockEnd) => {
                      Stores.encodeCharacterStore.updateEncodeCharacter({
                        ...Stores.encodeCharacterStore.encodeCharacter,
                        blockEnd,
                      })
                    }}
                  />
                </LibraryComponents.Grid>
              </LibraryComponents.Form.InputWrapper>
              <LibraryComponents.Form.InputWrapper label="Filed" id="filed">
                <LibraryComponents.Grid cols={3}>
                  <LibraryComponents.Form.Input
                    name="filed"
                    placeholder="Filed"
                    value={Stores.encodeCharacterStore.encodeCharacter?.filed}
                    onChange={(filed) => {
                      Stores.encodeCharacterStore.updateEncodeCharacter({
                        ...Stores.encodeCharacterStore.encodeCharacter,
                        filed,
                      })
                    }}
                  />
                  <LibraryComponents.Form.Input
                    name="value"
                    placeholder="Value"
                    value={Stores.encodeCharacterStore.encodeCharacter?.value}
                    onChange={(value) => {
                      Stores.encodeCharacterStore.updateEncodeCharacter({
                        ...Stores.encodeCharacterStore.encodeCharacter,
                        value,
                      })
                    }}
                  />
                  <div className="mt-2">
                    <LibraryComponents.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const filed =
                          Stores.encodeCharacterStore.encodeCharacter?.filed
                        const value =
                          Stores.encodeCharacterStore.encodeCharacter?.value
                        const fileds =
                          Stores.encodeCharacterStore.encodeCharacter?.fileds || []
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
                          Stores.encodeCharacterStore.updateEncodeCharacter({
                            ...Stores.encodeCharacterStore.encodeCharacter,
                            fileds,
                          })
                          Stores.encodeCharacterStore.updateEncodeCharacter({
                            ...Stores.encodeCharacterStore.encodeCharacter,
                            filed: "",
                            value: "",
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Icons.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Buttons.Button>
                  </div>
                  <div className="clearfix"></div>
                </LibraryComponents.Grid>
                <LibraryComponents.List space={2} direction="row" justify="center">
                  <div>
                    {Stores.encodeCharacterStore.encodeCharacter?.fileds?.map(
                      (item, index) => (
                        <div className="mb-2">
                          <LibraryComponents.Buttons.Button
                            key={index}
                            size="medium"
                            type="solid"
                            icon={LibraryComponents.Icons.Remove}
                            onClick={() => {
                              const firstArr =
                                Stores.encodeCharacterStore.encodeCharacter?.fileds?.slice(
                                  0,
                                  index
                                ) || []
                              const secondArr =
                                Stores.encodeCharacterStore.encodeCharacter?.fileds?.slice(
                                  index + 1
                                ) || []
                              const newArrSubCategory = [...firstArr, ...secondArr]
                              Stores.encodeCharacterStore.updateEncodeCharacter({
                                ...Stores.encodeCharacterStore.encodeCharacter,
                                fileds: newArrSubCategory,
                              })
                            }}
                          >
                            {`${item.filed} - ${item.value}`}
                          </LibraryComponents.Buttons.Button>
                        </div>
                      )
                    )}
                  </div>
                </LibraryComponents.List>
              </LibraryComponents.Form.InputWrapper>
            </LibraryComponents.List>
          </LibraryComponents.Grid>
          <LibraryComponents.List direction="row" space={3} align="center">
            <LibraryComponents.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Icons.Save}
              onClick={() => {
                if (Stores.encodeCharacterStore.encodeCharacter !== undefined) {
                  //rootStore.setProcessLoading(true)
                  Stores.encodeCharacterStore.encodeCharacterService
                    .addEncodeCharacter(Stores.encodeCharacterStore.encodeCharacter)
                    .then((res) => {
                      //rootStore.setProcessLoading(false)
                      if (res.status === 200) {
                        LibraryComponents.ToastsStore.success(
                          `Encode Character created.`
                        )
                        setTimeout(() => {
                          window.location.reload()
                        }, 1000)
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
            keyField="id"
            data={Stores.encodeCharacterStore.listEncodeCharacter || []}
            columns={[
              {
                dataField: "interfaceType",
                text: "Interface Type",
              },
              {
                dataField: "instrumentType",
                text: "Instrument Type",
              },
              {
                dataField: "instrumentName",
                text: "Instrument Name",
              },
              {
                dataField: "communicationProtocol",
                text: "Communication Protocol",
              },
              {
                dataField: "block",
                text: "Block",
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.List
                      space={2}
                      direction="row"
                      justify="center"
                    >
                      <div>
                        <div className="mb-2">
                          <LibraryComponents.Buttons.Button
                            size="medium"
                            type="solid"
                            //icon={LibraryComponents.Icons.Remove}
                            onClick={() => {
                              // const firstArr =
                              //   Stores.encodeCharacterStore.encodeCharacter?.fileds?.slice(
                              //     0,
                              //     index
                              //   ) || []
                              // const secondArr =
                              //   Stores.encodeCharacterStore.encodeCharacter?.fileds?.slice(
                              //     index + 1
                              //   ) || []
                              // const newArrSubCategory = [
                              //   ...firstArr,
                              //   ...secondArr,
                              // ]
                              // Stores.encodeCharacterStore.updateEncodeCharacter({
                              //   ...Stores.encodeCharacterStore.encodeCharacter,
                              //   fileds: newArrSubCategory,
                              // })
                            }}
                          >
                            {`Start:${
                              row.blockStart !== undefined
                                ? row.blockStart
                                    .toString()
                                    .replace(/&amp;/g, "&")
                                    .replace(/&gt;/g, ">")
                                    .replace(/&lt;/g, "<")
                                    .replace(/&quot;/g, '"')
                                    .replace(/â/g, "’")
                                    .replace(/â¦/g, "…")
                                    .toString()
                                : undefined
                            } - End:${
                              row.blockEnd !== undefined
                                ? row.blockEnd
                                    .toString()
                                    .replace(/&amp;/g, "&")
                                    .replace(/&gt;/g, ">")
                                    .replace(/&lt;/g, "<")
                                    .replace(/&quot;/g, '"')
                                    .replace(/â/g, "’")
                                    .replace(/â¦/g, "…")
                                    .toString()
                                : undefined
                            }`}
                          </LibraryComponents.Buttons.Button>
                        </div>
                      </div>
                    </LibraryComponents.List>
                  </>
                ),
              },
              {
                dataField: "fileds",
                text: "Fileds",
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.List
                      space={2}
                      direction="row"
                      justify="center"
                    >
                      <div>
                        {row.fileds?.map((item, index) => (
                          <div className="mb-2">
                            <LibraryComponents.Buttons.Button
                              key={index}
                              size="medium"
                              type="solid"
                              //icon={LibraryComponents.Icons.Remove}
                              onClick={() => {
                                // const firstArr =
                                //   Stores.encodeCharacterStore.encodeCharacter?.fileds?.slice(
                                //     0,
                                //     index
                                //   ) || []
                                // const secondArr =
                                //   Stores.encodeCharacterStore.encodeCharacter?.fileds?.slice(
                                //     index + 1
                                //   ) || []
                                // const newArrSubCategory = [...firstArr, ...secondArr]
                                // Stores.encodeCharacterStore.updateEncodeCharacter({
                                //   ...Stores.encodeCharacterStore.encodeCharacter,
                                //   fileds: newArrSubCategory,
                                // })
                              }}
                            >
                              {`Filed:${item.filed} - Value:${
                                item.value !== undefined
                                  ? item.value
                                      .toString()
                                      .replace(/&amp;/g, "&")
                                      .replace(/&gt;/g, ">")
                                      .replace(/&lt;/g, "<")
                                      .replace(/&quot;/g, '"')
                                      .replace(/â/g, "’")
                                      .replace(/â¦/g, "…")
                                      .toString()
                                  : undefined
                              }`}
                            </LibraryComponents.Buttons.Button>
                          </div>
                        ))}
                      </div>
                    </LibraryComponents.List>
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
                        setDeleteItem({
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete interfaceType = ${row.interfaceType}!`,
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
              fileName: `Encode Character_${moment(new Date()).format(
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
          {...deleteItem}
          click={() => {
            //rootStore.setProcessLoading(true)
            Stores.encodeCharacterStore.encodeCharacterService
              .deleteEncodeCharcter(deleteItem.id)
              .then((res: any) => {
                console.log({ res })
                // rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.ToastsStore.success(`Encode Character deleted.`)
                  setDeleteItem({ show: false })
                  Stores.encodeCharacterStore.fetchEncodeCharacter()
                }
              })
          }}
          close={() => {
            setDeleteItem({ show: false })
          }}
        />
      </div>
    </>
  )
})

export default EncodeCharacter
