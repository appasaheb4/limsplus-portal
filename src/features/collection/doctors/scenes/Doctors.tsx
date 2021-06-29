import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import { RouterFlow } from "@lp/flows"

const Doctors = observer(() => {
  const [errors, setErrors] = useState<Models.Doctors>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
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
          Stores.doctorsStore.updateDoctors({
            ...Stores.doctorsStore.doctors,
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
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "shown" : "shown")
          }
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
                  .unix(Stores.doctorsStore.doctors?.dateCreation || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active From"
                placeholder="Date Active From"
                value={LibraryUtils.moment
                  .unix(Stores.doctorsStore.doctors?.dateActiveFrom || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active To"
                placeholder="Date Active T0"
                value={LibraryUtils.moment
                  .unix(Stores.doctorsStore.doctors?.dateActiveTo || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder="Version"
                value={Stores.doctorsStore.doctors?.version}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder="Key Num"
                value={Stores.doctorsStore.doctors?.keyNum}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder="Entered By"
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
              />

              <LibraryComponents.Atoms.Form.Input
                label="Doctor Code"
                placeholder="Doctor Code"
                value={Stores.doctorsStore.doctors?.doctorCode}
                onChange={(doctorCode) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    doctorCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Doctor Name"
                placeholder="Doctor Name"
                value={Stores.doctorsStore.doctors?.doctorName}
                onChange={(doctorName) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    doctorName,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="Sex">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sex = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      sex,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Male", "Female"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {`${item}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Title">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const title = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      title,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "TITLE"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "STATUS"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
                  Stores.doctorsStore.doctors,
                  Utils.doctors
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.doctorsStore.doctorsService
                    .addMethods(Stores.doctorsStore.doctors)
                    .then((res) => {
                      RootStore.rootStore.setProcessLoading(false)
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Doctor record created.`,
                        })
                        Stores.doctorsStore.fetchDoctors()
                      }
                    })
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
                <h6 className="text-red-700" key={index}>
                  {_.upperFirst(item.join(" : "))}
                </h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <FeatureComponents.Molecules.MethodsList
            data={Stores.doctorsStore.listDoctors || []}
            isDelete={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Delete"
            )}
            // isEditModify={RouterFlow.checkPermission(
            //   RootStore.routerStore.userPermission,
            //   "Edit/Modify"
            // )}
            isEditModify={false}
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
                body: `Update Section!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.doctorsStore.doctorsService
                .deleteMethods(modalConfirm.id)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Methods record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.doctorsStore.fetchDoctors()
                  }
                })
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.doctorsStore.doctorsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Methods record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.doctorsStore.fetchDoctors()
                  }
                })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})   

export default Doctors
