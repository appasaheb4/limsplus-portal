/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
const InterfaceManager = observer(() => {
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddInterfaceManager, setHideAddInterfaceManager] = useState<boolean>(
    true
  )

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(RootStore.routerStore.userPermission),
        "Add"
      ) && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddInterfaceManager}
          onClick={(status) => setHideAddInterfaceManager(!hideAddInterfaceManager)}
        />
      )}
      <div className=" mx-auto  flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " +
            (hideAddInterfaceManager ? "hidden" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
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
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
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
                        let fileds =
                          Stores.interfaceManagerStore.encodeCharacter?.fileds || []
                        if (filed === undefined)
                          return alert("Please enter filed and value.")
                        if (filed !== undefined) {
                          fileds !== undefined
                            ? fileds.push({
                                filed,
                                value,
                              })
                            : fileds = [
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
                    {Stores.interfaceManagerStore.encodeCharacter?.fileds?.map(
                      (item, index) => (
                        <div className="mb-2">
                          <LibraryComponents.Atoms.Buttons.Button
                            key={index}
                            size="medium"
                            type="solid"
                            icon={LibraryComponents.Atoms.Icon.Remove}
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
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                if (Stores.interfaceManagerStore.encodeCharacter !== undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.interfaceManagerStore.encodeCharacterService
                    .addInterfaceManager(
                      Stores.interfaceManagerStore.encodeCharacter
                    )
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
              icon={LibraryComponents.Atoms.Icon.Remove}
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
          <FeatureComponents.Molecules.InterfaceManagerList
            data={Stores.interfaceManagerStore.listEncodeCharacter || []}
            isDelete={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Edit/Modify"
            )}
            onDelete={(selectedUser) => setModalConfirm(selectedUser)}
            onSelectedRow={(rows) => {
              setModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update interface manager!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type) => {
            RootStore.rootStore.setProcessLoading(true)
            if (type === "Delete") {
              Stores.interfaceManagerStore.encodeCharacterService
                .deleteInterfaceManager(modalConfirm.id)
                .then((res: any) => {
                  console.log({ res })
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(
                      `Interface manager deleted.`
                    )
                    setModalConfirm({ show: false })
                    Stores.interfaceManagerStore.fetchEncodeCharacter()
                  }
                })
            } else {
              Stores.interfaceManagerStore.encodeCharacterService
                .interfaceManagerUpdateSingleFiled(modalConfirm.data)
                .then((res) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    Stores.interfaceManagerStore.fetchEncodeCharacter()
                    LibraryComponents.Atoms.ToastsStore.success(`Updated.`)
                  }
                })
            }
          }}
          onClose={() => {
            setModalConfirm({ show: false })
          }}
        />
      </div>
    </>
  )
})

export default InterfaceManager
