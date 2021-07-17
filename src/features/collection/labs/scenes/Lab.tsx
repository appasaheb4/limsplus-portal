import React, { useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import * as Utils from "../util"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as AdministrativeDivStore } from "@lp/features/collection/administrativeDivisions/stores"
import {Stores as SalesTeamStore} from '@lp/features/collection/salesTeam/stores'

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const Lab = observer(() => {
  const [errors, setErrors] = useState<Models.Labs>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

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
          <LibraryComponents.Atoms.Grid cols={3}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={Stores.labStore.labs?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Utils.validate.single(code, Utils.labs.code),
                  })
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    code,
                  })
                }}
                onBlur={(code) => {
                  Stores.labStore.LabService.checkExitsCode(code).then((res) => {
                    console.log({ res })
                    if (res)
                      if (res.length > 0) Stores.labStore.setExitsCode(true)
                      else Stores.labStore.setExitsCode(false)
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              {Stores.labStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Name"
                name="name"
                placeholder="Name"
                value={Stores.labStore.labs?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Utils.validate.single(name, Utils.labs.name),
                  })
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    name,
                  })
                }}
              />

              {errors?.name && (
                <span className="text-red-600 font-medium relative">
                  {errors.name}
                </span>
              )}
              <LibraryComponents.Atoms.Form.InputWrapper label="Country">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const country = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      country,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {AdministrativeDivStore.administrativeDivStore
                    .listAdministrativeDiv &&
                    AdministrativeDivStore.administrativeDivStore.listAdministrativeDiv.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.country}>
                          {`${item.country}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="State">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const state = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      state,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Utils.stateList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country
                  ) &&
                    Utils.stateList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="District">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const district = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      district,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Utils.districtList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state
                  ) &&
                    Utils.districtList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="City">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const city = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      city,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Utils.cityList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state,
                    Stores.labStore.labs?.district
                  ) &&
                    Utils.cityList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state,
                      Stores.labStore.labs?.district
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Area">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const area = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      area,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Utils.areaList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state,
                    Stores.labStore.labs?.district,
                    Stores.labStore.labs?.city
                  ) &&
                    Utils.areaList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state,
                      Stores.labStore.labs?.district,
                      Stores.labStore.labs?.city
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Postal Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const postalCode = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      postalCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Utils.postCodeList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state,
                    Stores.labStore.labs?.district,
                    Stores.labStore.labs?.city
                  ) &&
                    Utils.postCodeList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state,
                      Stores.labStore.labs?.district,
                      Stores.labStore.labs?.city
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryType = e.target.value as
                      | "Interim"
                      | "Progress"
                      | "Complete"
                      | "Single"
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      deliveryType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Interim", "Progress", "Complete", "Single"].map(
                    (item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales Territory">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritory = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      salesTerritory,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SalesTeamStore.salesTeamStore.listSalesTeam && SalesTeamStore.salesTeamStore.listSalesTeam.map(
                    (item: any, index: number) => (
                      <option key={index} value={item.salesTerritory.area}>
                        {`${item.salesTerritory.area}`}
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
                const error = Utils.validate(Stores.labStore.labs, Utils.labs)
                setErrorsMsg(error)
                if (error === undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.labStore.LabService.addLab(Stores.labStore.labs).then(
                    () => {
                      RootStore.rootStore.setProcessLoading(false)
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊Lab created.`,
                      })
                      Stores.labStore.fetchListLab()
                      Stores.labStore.clear()
                    }
                  )
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: "😔Please enter all information!",
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.LabList
            data={Stores.labStore.listLabs || []}
            isDelete={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
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
                body: `Update lab!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.labStore.LabService.deleteLab(modalConfirm.id).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊Lab deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.labStore.fetchListLab()
                  }
                }
              )
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.labStore.LabService.updateSingleFiled(modalConfirm.data).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊Lab updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.labStore.fetchListLab()
                  }
                }
              )
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

export default Lab
