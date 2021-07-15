/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as PanelMasterStore } from "@lp/features/collection/masterPanel/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPackage = observer(() => {
  const [errors, setErrors] = useState<Models.MasterPackage>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])
  const [arrPackageItems, setArrPackageItems] = useState<Array<any>>()
  const [arrPanelItems, setArrPanelItems] = useState<Array<any>>()

  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      if (items) {
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.masterPackageStore.updateMasterPackage({
            ...Stores.masterPackageStore.masterPackage,
            status: status.code,
          })
        }
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  const getServiceTypes = (fileds: any) => {
    const finalArray = fileds.arrValue.filter((fileds) => {
      if (fileds.code === "K" || fileds.code === "M") return fileds
    })
    return finalArray
  }

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
          show={hideAddLab}
          onClick={() => setHideAddLab(!hideAddLab)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")}
        >
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder="Date Creation"
                value={LibraryUtils.moment
                  .unix(Stores.masterPackageStore.masterPackage?.dateCreation || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active"
                placeholder="Date Active"
                value={LibraryUtils.moment
                  .unix(Stores.masterPackageStore.masterPackage?.dateActiveFrom || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Expire"
                placeholder="Date Expire"
                value={LibraryUtils.moment
                  .unix(Stores.masterPackageStore.masterPackage?.dateActiveTo || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.masterPackageStore.updateMasterPackage({
                    ...Stores.masterPackageStore.masterPackage,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder="Version"
                value={Stores.masterPackageStore.masterPackage?.version}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder="Key Num"
                value={Stores.masterPackageStore.masterPackage?.keyNum}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder="Entered By"
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    setErrors({
                      ...errors,
                      lab: Utils.validate.single(lab, Utils.masterPackage.lab),
                    })
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      lab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Toggle
                label="Bill"
                id="modeBill"
                value={Stores.masterPackageStore.masterPackage?.bill}
                onChange={(bill) => {
                  Stores.masterPackageStore.updateMasterPackage({
                    ...Stores.masterPackageStore.masterPackage,
                    bill,
                  })
                }}
              />
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Service Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const serviceItem = JSON.parse(e.target.value)
                    if (PanelMasterStore.masterPanelStore.listMasterPanel) {
                      console.log({
                        items: PanelMasterStore.masterPanelStore.listMasterPanel,
                      })
                      const listPackageItems: any = PanelMasterStore.masterPanelStore.listMasterPanel.filter(
                        (item) => {
                          return item.serviceType === serviceItem.code
                        }
                      )
                      setArrPackageItems(listPackageItems)
                      const listPanelItems = PanelMasterStore.masterPanelStore.listMasterPanel.filter(
                        (item) => {
                          return (
                            item.serviceType ===
                            (serviceItem.code === "K" ? "N" : "S")
                          )
                        }
                      )
                      setArrPanelItems(listPanelItems)
                    }
                    setErrors({
                      ...errors,
                      panelCode: Utils.validate.single(
                        undefined,
                        Utils.masterPackage.panelCode
                      ),
                    })
                    setErrors({
                      ...errors,
                      panelName: Utils.validate.single(
                        undefined,
                        Utils.masterPackage.panelName
                      ),
                    })
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      serviceType: serviceItem.code,
                      packageName: undefined,
                      panelName: undefined,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    getServiceTypes(
                      lookupItems.find((item) => {
                        return item.fieldName === "SERVICE_TYPE"
                      })
                    ).map((item: any, index: number) => (
                      <option key={index} value={JSON.stringify(item)}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Package Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const packageItem = JSON.parse(e.target.value)

                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      packageCode: packageItem.panelCode,
                      packageName: packageItem.panelName,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {arrPackageItems &&
                    arrPackageItems.map((item: any, index: number) => (
                      <option key={index} value={JSON.stringify(item)}>
                        {`${item.panelName} - ${item.panelCode}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Package Name">
                <select
                  disabled={true}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                >
                  <option selected>
                    {Stores.masterPackageStore.masterPackage?.packageName ||
                      `Select`}
                  </option>
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              {arrPanelItems && (
                <>
                  {" "}
                  <LibraryComponents.Atoms.Form.InputWrapper label="Panel Code">
                    <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeyProps
                      placeholder="Search by panel name or panel code"
                      data={{
                        defulatValues: [],
                        list: arrPanelItems,
                        displayKey: ["panelName", "panelCode"],
                        findKey: ["panelName", "panelCode"],
                      }}
                      onUpdate={(items) => {
                        const panelCode: string[] = []
                        const panelName: string[] = []
                        items.filter((item: any) => {
                          panelCode.push(item.panelCode)
                          panelName.push(item.panelName)
                        })
                        Stores.masterPackageStore.updateMasterPackage({
                          ...Stores.masterPackageStore.masterPackage,
                          panelCode,
                          panelName,
                        })
                      }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Panel Name">
                    <select
                      disabled={true}
                      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    >
                      <option selected>
                        {Stores.masterPackageStore.masterPackage?.panelName?.join(
                          ","
                        ) || `Select`}
                      </option>
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              )}
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  value={Stores.masterPackageStore.masterPackage?.status}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                const error = Utils.validate(
                  Stores.masterPackageStore.masterPackage,
                  Utils.masterPackage
                )
                setErrorsMsg(error)
                if (!error) {
                  RootStore.rootStore.setProcessLoading(true)

                  if (
                    !Stores.masterPackageStore.masterPackage?.existsVersionId &&
                    !Stores.masterPackageStore.masterPackage?.existsRecordId
                  ) {
                    Stores.masterPackageStore.masterPackageService
                      .addPackageMaster(Stores.masterPackageStore.masterPackage)
                      .then(() => {
                        RootStore.rootStore.setProcessLoading(false)
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Package master created.`,
                        })
                      })
                  } else if (
                    Stores.masterPackageStore.masterPackage?.existsVersionId &&
                    !Stores.masterPackageStore.masterPackage?.existsRecordId
                  ) {
                    Stores.masterPackageStore.masterPackageService
                      .versionUpgradePackageMaster(
                        Stores.masterPackageStore.masterPackage
                      )
                      .then(() => {
                        RootStore.rootStore.setProcessLoading(false)
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Package master version upgrade.`,
                        })
                      })
                  } else if (
                    !Stores.masterPackageStore.masterPackage?.existsVersionId &&
                    Stores.masterPackageStore.masterPackage?.existsRecordId
                  ) {
                    Stores.masterPackageStore.masterPackageService
                      .duplicatePackageMaster(
                        Stores.masterPackageStore.masterPackage
                      )
                      .then(() => {
                        RootStore.rootStore.setProcessLoading(false)
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Package master duplicate created.`,
                        })
                      })
                  }

                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: `😔 Please enter all information!`,
                  })
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
          </LibraryComponents.Atoms.List>
          <div>
            {errorsMsg &&
              Object.entries(errorsMsg).map((item, index) => (
                <h6 className="text-red-700">{_.upperFirst(item.join(" : "))}</h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.PackageMasterList
            data={Stores.masterPackageStore.listMasterPackage || []}
            isDelete={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Edit/Modify"
            )}
            // isEditModify={false}
            onDelete={(selectedItem) => setModalConfirm(selectedItem)}
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
                body: `Update lab!`,
              })
            }}
            onVersionUpgrade={(item) => {
              setModalConfirm({
                show: true,
                type: "versionUpgrade",
                data: item,
                title: "Are you version upgrade?",
                body: `Version upgrade this record`,
              })
            }}
            onDuplicate={(item) => {
              setModalConfirm({
                show: true,
                type: "duplicate",
                data: item,
                title: "Are you duplicate?",
                body: `Duplicate this record`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            console.log({ type })
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.masterPackageStore.masterPackageService
                .deletePackageMaster(modalConfirm.id)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Package master deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterPackageStore.fetchPackageMaster()
                  }
                })
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.masterPackageStore.masterPackageService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Package master updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterPackageStore.fetchPackageMaster()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.masterPackageStore.updateMasterPackage({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.masterPackageStore.updateMasterPackage({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
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

export default MasterPackage
