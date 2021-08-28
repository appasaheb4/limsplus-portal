/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
const InterfaceManager = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddInterfaceManager, setHideAddInterfaceManager] = useState<boolean>(
    true
  )


  const onSubmitInterfaceManager = ()=>{
    if (Stores.interfaceManagerStore.encodeCharacter !== undefined) {
                  
      Stores.interfaceManagerStore.encodeCharacterService
        .addInterfaceManager(
          Stores.interfaceManagerStore.encodeCharacter
        )
        .then((res) => {
          
          if (res.status === 200) {
            LibraryComponents.Atoms.Toast.success({
             message : `😊Encode Character created.`
            })
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
       message : "😔Please enter all information!"
      })
    }
  }
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(stores.routerStore.userPermission),
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
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Interface Type"
                name="interfaceType"
                placeholder={errors.interfaceType?"Please Enter InterFace Type":"Interface Type"}
                hasError={errors.interfaceType}
                value={Stores.interfaceManagerStore.encodeCharacter?.interfaceType}
                onChange={(interfaceType) => {
                  onChange(interfaceType)
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    interfaceType,
                  })
                }}
              />
              )}
              name="interfaceType"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Instrument Type"
                name="instrumentType"
                placeholder={errors.instrumentType ? "Please Enter instrumentType":"Instrument Type"}
                hasError={errors.instrumentType}
                value={Stores.interfaceManagerStore.encodeCharacter?.instrumentType}
                onChange={(instrumentType) => {
                  onChange(instrumentType)
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    instrumentType,
                  })
                }}
              />
              )}
              name="instrumentType"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Instrument Name"
                name="instrumentName"
                placeholder={errors.instrumentName?"Please Enter InstrumentName":"Instrument Name"}
                hasError={errors.instrumentName}
                value={Stores.interfaceManagerStore.encodeCharacter?.instrumentName}
                onChange={(instrumentName) => {
                  onChange(instrumentName)
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    instrumentName,
                  })
                }}
              />
              )}
              name="instrumentName"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Data Flow From"
                name="dataFlowFrom"
                placeholder={errors.dataFlowFrom?"Please Enter DataFlowFrom":"Data Flow From"}
                hasError={errors.dataFlowFrom}
                value={Stores.interfaceManagerStore.encodeCharacter?.dataFlowFrom}
                onChange={(dataFlowFrom) => {
                  onChange(dataFlowFrom)
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    dataFlowFrom,
                  })
                }}
              />
              )}
              name="dataFlowFrom"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Communication Protocol"
                name="communicationProtocal"
                placeholder={errors.communicationProtocal?"Please Enter communicationProtocal":"Communication Protocal"}
                hasError={errors.communicationProtocal}
                value={
                  Stores.interfaceManagerStore.encodeCharacter?.communicationProtocol
                }
                onChange={(communicationProtocol) => {
                  onChange(communicationProtocol)
                  Stores.interfaceManagerStore.updateEncodeCharacter({
                    ...Stores.interfaceManagerStore.encodeCharacter,
                    communicationProtocol,
                  })
                }}
              />
              )}
              name="communicationProtocal"
              rules={{ required: false }}
              defaultValue=""
            />

              <div className="clearfix" />
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              
            
              
              <LibraryComponents.Atoms.Form.InputWrapper label="Block" id="block">
                <LibraryComponents.Atoms.Grid cols={2}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    name="startBlock"
                    placeholder={errors.blockStart?"Please Enter BlockStart":"Start Block"}
                    hasError={errors.blockStart}
                    value={Stores.interfaceManagerStore.encodeCharacter?.blockStart}
                    onChange={(blockStart) => {
                      onChange(blockStart)
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        blockStart,
                      })
                    }}
                  />
                  )}
                  name="startBlock"
                  rules={{ required: false }}
                  defaultValue=""
                />
                  
                  <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    name="endBlock"
                    placeholder={errors.endBlock?"Please Enter endBlock":"End Block"}
                    value={Stores.interfaceManagerStore.encodeCharacter?.blockEnd}
                    onChange={(blockEnd) => {
                      onChange(blockEnd)
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        blockEnd,
                      })
                    }}
                  />
                  )}
                  name="endBlock"
                  rules={{ required: false }}
                  defaultValue=""
                />
                </LibraryComponents.Atoms.Grid>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.InputWrapper label="Filed" id="filed">
                <LibraryComponents.Atoms.Grid cols={3}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    name="filed"
                    placeholder={errors.filed?"Please Enter Filed":"Filed"}
                    hasError={errors.filed}
                    value={Stores.interfaceManagerStore.encodeCharacter?.filed}
                    onChange={(filed) => {
                      onChange(filed)
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        filed,
                      })
                    }}
                  />
                  )}
                  name="filed"
                  rules={{ required: false }}
                  defaultValue=""
                />
                  <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    name="value"
                    placeholder={errors.value?"Please Enter Value":"Value"}
                    hasError={errors.value}
                    value={Stores.interfaceManagerStore.encodeCharacter?.value}
                    onChange={(value) => {
                      onChange(value)
                      Stores.interfaceManagerStore.updateEncodeCharacter({
                        ...Stores.interfaceManagerStore.encodeCharacter,
                        value,
                      })
                    }}
                  />
                  )}
                  name="value"
                  rules={{ required: false }}
                  defaultValue=""
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
            
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.interfaceManagerStore.encodeCharacter?.environment}
                  className={`leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.interfaceManagerStore.updateEncodeCharacter({
                      ...Stores.interfaceManagerStore.encodeCharacter,
                      environment,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="environment"
            rules={{ required: true }}
            defaultValue=""
          />
          </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitInterfaceManager)}
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
            totalSize={Stores.interfaceManagerStore.listEncodeCharacterCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
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
            onPageSizeChange={(page,limit)=>{
              Stores.interfaceManagerStore.fetchEncodeCharacter(page,limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type) => {
            
            if (type === "Delete") {
              Stores.interfaceManagerStore.encodeCharacterService
                .deleteInterfaceManager(modalConfirm.id)
                .then((res: any) => {
                  console.log({ res })
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message :`😊Interface manager deleted.`
                    })
                    setModalConfirm({ show: false })
                    Stores.interfaceManagerStore.fetchEncodeCharacter()
                  }
                })
            } else {
              Stores.interfaceManagerStore.encodeCharacterService
                .interfaceManagerUpdateSingleFiled(modalConfirm.data)
                .then((res) => {
                  
                  if (res.status === 200) {
                    Stores.interfaceManagerStore.fetchEncodeCharacter()
                    LibraryComponents.Atoms.Toast.success({message :`😊Updated.`})
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
