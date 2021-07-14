/* eslint-disable */
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
import { Stores as LabStores } from "@lp/features/collection/labs/stores"

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
          <LibraryComponents.Atoms.Grid cols={3}>
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
                label="Date Active"
                placeholder="Date Active"
                value={LibraryUtils.moment
                  .unix(Stores.doctorsStore.doctors?.dateActiveFrom || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Expire"
                placeholder="Date Expire"
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
                  setErrors({
                    ...errors,
                    doctorCode: Utils.validate.single(
                      doctorCode,
                      Utils.doctors.doctorCode
                    ),
                  })
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
                  setErrors({
                    ...errors,
                    doctorName: Utils.validate.single(
                      doctorName,
                      Utils.doctors.doctorName
                    ),
                  })
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
                  {LibraryUtils.lookupItems(lookupItems, "TITLE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="First Name"
                placeholder="First Name"
                value={Stores.doctorsStore.doctors?.firstName}
                onChange={(firstName) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    firstName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Middle Name"
                placeholder="Middle Name"
                value={Stores.doctorsStore.doctors?.middleName}
                onChange={(middleName) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    middleName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Last Name"
                placeholder="Last Name"
                value={Stores.doctorsStore.doctors?.lastName}
                onChange={(lastName) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    lastName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Report Name"
                placeholder="Report Name"
                value={Stores.doctorsStore.doctors?.reportName}
                onChange={(reportName) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    reportName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Address"
                placeholder="Address"
                value={Stores.doctorsStore.doctors?.address}
                onChange={(address) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    address,
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
              <LibraryComponents.Atoms.Form.Input
                label="City"
                placeholder="City"
                value={Stores.doctorsStore.doctors?.city}
                onChange={(city) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    city,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="State"
                placeholder="State"
                value={Stores.doctorsStore.doctors?.state}
                onChange={(state) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    state,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Country"
                placeholder="Country"
                value={Stores.doctorsStore.doctors?.country}
                onChange={(country) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    country,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Postcode"
                placeholder="Postcode"
                type="number"
                value={Stores.doctorsStore.doctors?.postcode}
                onChange={(postcode) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    postcode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Doctor Type"
                placeholder="Doctor Type"
                value={Stores.doctorsStore.doctors?.doctorType}
                onChange={(doctorType) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    doctorType,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Speciality">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const speciality = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      speciality,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales TerritoRy">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      salesTerritoRy,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Area"
                placeholder="Area"
                value={Stores.doctorsStore.doctors?.area}
                onChange={(area) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    area,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Zone"
                placeholder="Zone"
                value={Stores.doctorsStore.doctors?.zone}
                onChange={(zone) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    zone,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Telephone"
                placeholder="Telephone"
                value={Stores.doctorsStore.doctors?.telephone}
                onChange={(telephone) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    telephone,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Mobile No"
                placeholder="Mobile No"
                value={Stores.doctorsStore.doctors?.mobileNo}
                onChange={(mobileNo) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    mobileNo,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Email"
                placeholder="Email"
                value={Stores.doctorsStore.doctors?.email}
                onChange={(email) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    email,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Work Hours"
                placeholder="Work Hours"
                type="number"
                value={Stores.doctorsStore.doctors?.workHours}
                onChange={(workHours) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    workHours,
                  })
                }}
              />
              <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  value={Stores.doctorsStore.doctors?.confidential}
                  onChange={(confidential) => {
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      confidential,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  value={Stores.doctorsStore.doctors?.urgent}
                  onChange={(urgent) => {
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      urgent,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
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
                    const deliveryType = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Method">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      deliveryMethod,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_METHOD").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="EDI"
                placeholder="EDI"
                value={Stores.doctorsStore.doctors?.edi}
                onChange={(edi) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    edi,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="EDI Address"
                placeholder="EDI Address"
                value={Stores.doctorsStore.doctors?.ediAddress}
                onChange={(ediAddress) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    ediAddress,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Registartion Location">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const registrationLocation = e.target.value
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      registrationLocation,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  value={Stores.doctorsStore.doctors?.lab}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Location">
                <select
                  value={Stores.doctorsStore.doctors?.location}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const location = e.target.value as string
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      location,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Schedule">
                <select
                  value={Stores.doctorsStore.doctors?.schedule}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      schedule,
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
              <LibraryComponents.Atoms.Form.Input
                label="Report Format"
                placeholder="Report Format"
                value={Stores.doctorsStore.doctors?.reportFormat}
                onChange={(reportFormat) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    reportFormat,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Info"
                placeholder="Info"
                value={Stores.doctorsStore.doctors?.info}
                onChange={(info) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    info,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="FYI Line"
                placeholder="FYI Line"
                value={Stores.doctorsStore.doctors?.fyiLine}
                onChange={(fyiLine) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    fyiLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Work Line"
                placeholder="Work Line"
                value={Stores.doctorsStore.doctors?.workLine}
                onChange={(workLine) => {
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    workLine,
                  })
                }}
              />
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
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map((item: any, index: number) => (
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
                    .addDoctors(Stores.doctorsStore.doctors)
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.DoctorsList
            data={Stores.doctorsStore.listDoctors || []}
            isDelete={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
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
                body: `Update Section!`,
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
              RootStore.rootStore.setProcessLoading(true)
              Stores.doctorsStore.doctorsService
                .deleteDoctors(modalConfirm.id)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Doctors record deleted.`,
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
                      message: `😊 Doctors record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.doctorsStore.fetchDoctors()
                    window.location.reload();
                  }
                })
            }else if (type === "versionUpgrade") {
              Stores.doctorsStore.updateDoctors({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.doctorsStore.updateDoctors({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
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
