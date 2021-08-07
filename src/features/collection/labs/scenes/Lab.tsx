/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as AdministrativeDivStore } from "@lp/features/collection/administrativeDivisions/stores"
import { Stores as SalesTeamStore } from "@lp/features/collection/salesTeam/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
import { AssetsService } from "@lp/features/assets/services"

const Lab = observer(() => {
  const [errors, setErrors] = useState<Models.Labs>()
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryType = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      deliveryType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
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
                  {SalesTeamStore.salesTeamStore.listSalesTeam &&
                    SalesTeamStore.salesTeamStore.listSalesTeam.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.salesTerritory.area}>
                          {`${item.salesTerritory.area}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Lab Licence"
                placeholder="Lab Licence"
                value={Stores.labStore.labs?.labLicence}
                onChange={(labLicence) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    labLicence,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Director"
                placeholder="Director"
                value={Stores.labStore.labs?.director}
                onChange={(director) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    director,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Physician"
                placeholder="Physician"
                value={Stores.labStore.labs?.physician}
                onChange={(physician) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    physician,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                type="number"
                label="Mobile Number"
                placeholder="Mobile Number"
                value={Stores.labStore.labs?.mobileNo}
                onChange={(mobileNo) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    mobileNo,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                type="number"
                label="Contact Number"
                placeholder="Contact Number"
                value={Stores.labStore.labs?.contactNo}
                onChange={(contactNo) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    contactNo,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Speciality"
                placeholder="Speciality"
                value={Stores.labStore.labs?.speciality}
                onChange={(speciality) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    speciality,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab type">
                <select
                  value={Stores.labStore.labs?.labType}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const labType = e.target.value
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      labType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "LAB_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Clock
                label="Opening Time"
                value={Stores.labStore.labs?.openingTime}
                onChange={(openingTime) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    openingTime,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Clock
                label="Closing Time"
                value={Stores.labStore.labs?.closingTime}
                onChange={(closingTime) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    closingTime,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Email"
                placeholder="Email"
                value={Stores.labStore.labs?.email}
                onChange={(email) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    email,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputFile
                label="Lab logo"
                placeholder="Lab logo"
                onChange={(e) => {
                  const labLog = e.target.files[0]
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    labLog,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={2}
                label="FYI line"
                placeholder="FYI line"
                value={Stores.labStore.labs?.fyiLine}
                onChange={(fyiLine) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    fyiLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={2}
                label="Work line"
                placeholder="Work line"
                value={Stores.labStore.labs?.workLine}
                onChange={(workLine) => {
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    workLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Grid cols={4}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Auto Release"
                  value={Stores.labStore.labs?.autoRelease}
                  onChange={(autoRelease) => {
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      autoRelease,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Require receve in lab"
                  value={Stores.labStore.labs?.requireReceveInLab}
                  onChange={(requireReceveInLab) => {
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      requireReceveInLab,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Require Scain In"
                  value={Stores.labStore.labs?.requireScainIn}
                  onChange={(requireScainIn) => {
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      requireScainIn,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Routing Dept"
                  value={Stores.labStore.labs?.routingDept}
                  onChange={(routingDept) => {
                    Stores.labStore.updateLabs({
                      ...Stores.labStore.labs,
                      routingDept,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
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
                  Stores.labStore.LabService.addLab(Stores.labStore.labs).then(
                    () => {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Lab created.`,
                      })
                    }
                  )
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: "😔 Please enter all information!",
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
                body: `Update lab!`,
              })
            }}
            onUpdateImage={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "UpdateImage",
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
              Stores.labStore.LabService.deleteLab(modalConfirm.id).then(
                (res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Lab deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.labStore.fetchListLab()
                  }
                }
              )
            } else if (type === "Update") {
              Stores.labStore.LabService.updateSingleFiled(modalConfirm.data).then(
                (res: any) => {
                  if (res.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.message}`,
                    })
                    setModalConfirm({ show: false })
                    setTimeout(() => {   
                      window.location.reload()
                    }, 2000)
                  }
                }
              )
            } else {
              const path = `https://limsplus.blob.core.windows.net/labs/${modalConfirm.data.value.name}`
              new AssetsService()
                .uploadFile(
                  modalConfirm.data.value,
                  "labs",
                  modalConfirm.data.value.name
                )
                .then((res) => {
                  if (res.success) {
                    Stores.labStore.LabService.updateSingleFiled({
                      ...modalConfirm.data,
                      value: path,
                    }).then((res: any) => {
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 ${res.message}`,
                        })
                        setModalConfirm({ show: false })
                        setTimeout(() => {
                          window.location.reload()
                        }, 2000)
                      }
                    })
                  } else {
                    alert(res.message)
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

export default Lab
