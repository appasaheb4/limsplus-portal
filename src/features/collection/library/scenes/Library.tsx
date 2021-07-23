/* eslint-disable */
import React, { useEffect, useState } from "react"
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
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
   
import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
   
export const Library = observer(() => {
  const [errors, setErrors] = useState<Models.MasterAnalyte>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

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
          Stores.masterAnalyteStore.updateMasterAnalyte({
            ...Stores.masterAnalyteStore.masterAnalyte,
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

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(stores.routerStore.userPermission),
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
          <LibraryComponents.Atoms.Grid cols={3}>
           
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                const error = Utils.validate(
                  Stores.masterAnalyteStore.masterAnalyte,
                  Utils.masterAnalyte
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  if (
                    !Stores.masterAnalyteStore.masterAnalyte?.existsVersionId &&
                    !Stores.masterAnalyteStore.masterAnalyte?.existsRecordId
                  ) {
                    Stores.masterAnalyteStore.masterAnalyteService
                      .addAnalyteMaster({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        enteredBy: LoginStore.loginStore.login?._id,
                      })
                      .then(() => {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Analyte master created.`,
                        })
                      })
                  } else if (
                    Stores.masterAnalyteStore.masterAnalyte?.existsVersionId &&
                    !Stores.masterAnalyteStore.masterAnalyte?.existsRecordId
                  ) {
                    Stores.masterAnalyteStore.masterAnalyteService
                      .versionUpgradeAnalyteMaster({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        enteredBy: LoginStore.loginStore.login?._id,
                      })
                      .then(() => {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Analyte master version upgrade.`,
                        })
                      })
                  } else if (
                    !Stores.masterAnalyteStore.masterAnalyte?.existsVersionId &&
                    Stores.masterAnalyteStore.masterAnalyte?.existsRecordId
                  ) {
                    Stores.masterAnalyteStore.masterAnalyteService
                      .duplicateAnalyteMaster({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        enteredBy: LoginStore.loginStore.login?._id,
                      })
                      .then(() => {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Analyte master duplicate created.`,
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
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
          <div>
            {errorsMsg &&
              Object.entries(errorsMsg).map((item, index) => (
                <h6 className="text-red-700" key={index}>
                  {_.upperFirst(item.join(" : "))}
                </h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.MasterAnalyteList
            data={Stores.masterAnalyteStore.listMasterAnalyte || []}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Edit/Modify"
            )}
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
                body: `Update item!`,
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
            if (type === "Delete") {
              Stores.masterAnalyteStore.masterAnalyteService
                .deleteAnalyteMaster(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Analyte master deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterAnalyteStore.fetchAnalyteMaster()
                  }
                })
            } else if (type === "Update") {
              Stores.masterAnalyteStore.masterAnalyteService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Analyte master updated.`,
                    })
                    setModalConfirm({ show: false })
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.masterAnalyteStore.updateMasterAnalyte({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.masterAnalyteStore.updateMasterAnalyte({
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
 
export default Library
