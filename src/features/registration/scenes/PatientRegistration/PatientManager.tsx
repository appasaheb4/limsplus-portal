/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import * as Utils from "../../utils"
import * as Models from "../../models"

import Storage from "@lp/library/modules/storage"

import { Stores } from "../../stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

interface PatientManagerProps {
  onModalConfirm?: (item: any) => void
}

const PatientManager = observer((props: PatientManagerProps) => {
  const [errors, setErrors] = useState<Models.PaientManger>()
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
      setLookupItems(items)
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])
  return (
    <>
      <div className="p-2 rounded-lg shadow-xl">
        <LibraryComponents.Atoms.Grid cols={3}>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <LibraryComponents.Atoms.Form.Input
              label="Internal Pid"
              name="txtInternalPid"
              placeholder="Internal Pid"
              value={Stores.patientRegistationStore.patientManger?.internalPid}
              onChange={(internalPid) => {
                setErrors({
                  ...errors,
                  internalPid: Utils.validate.single(
                    internalPid,
                    Utils.patientManager.internalPid
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  internalPid,
                })
              }}
            />
            {errors?.internalPid && (
              <span className="text-red-600 font-medium relative">
                {errors.internalPid}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Mobile No"
              name="txtMobileNo"
              placeholder="Mobile No"
              type="number"
              value={Stores.patientRegistationStore.patientManger?.mobileNo}
              onChange={(mobileNo) => {
                setErrors({
                  ...errors,
                  mobileNo: Utils.validate.single(
                    mobileNo,
                    Utils.patientManager.mobileNo
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  mobileNo,
                })
              }}
            />
            {errors?.mobileNo && (
              <span className="text-red-600 font-medium relative">
                {errors.mobileNo}
              </span>
            )}
            <LibraryComponents.Atoms.Form.InputWrapper label="Title">
              <select
                className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const title = e.target.value
                  setErrors({
                    ...errors,
                    title: Utils.validate.single(title, Utils.patientManager.title),
                  })
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    title,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  lookupItems,
                  "PATIENT MANAGER - TITLE"
                ).map((item: any, index: number) => (
                  <option key={index} value={item.code}>
                    {LibraryUtils.lookupValue(item)}
                  </option>  
                ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            <LibraryComponents.Atoms.Form.Input
              label="First Name"
              name="txtFirstName"
              placeholder="First Name"
              value={Stores.patientRegistationStore.patientManger?.firstName}
              onChange={(firstName) => {
                setErrors({
                  ...errors,
                  firstName: Utils.validate.single(
                    firstName,
                    Utils.patientManager.firstName
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  firstName,
                })
              }}
            />
            {errors?.firstName && (
              <span className="text-red-600 font-medium relative">
                {errors.firstName}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Middle Name"
              name="txtMiddleName"
              placeholder="Middle Name"
              value={Stores.patientRegistationStore.patientManger?.middleName}
              onChange={(middleName) => {
                setErrors({
                  ...errors,
                  middleName: Utils.validate.single(
                    middleName,
                    Utils.patientManager.middleName
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  middleName,
                })
              }}
            />
            {errors?.middleName && (
              <span className="text-red-600 font-medium relative">
                {errors.middleName}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Last Name"
              name="txtLastName"
              placeholder="Last Name"
              value={Stores.patientRegistationStore.patientManger?.lastName}
              onChange={(lastName) => {
                setErrors({
                  ...errors,
                  lastName: Utils.validate.single(
                    lastName,
                    Utils.patientManager.lastName
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  lastName,
                })
              }}
            />
            {errors?.middleName && (
              <span className="text-red-600 font-medium relative">
                {errors.middleName}
              </span>
            )}
          </LibraryComponents.Atoms.List>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <LibraryComponents.Atoms.Form.InputWrapper label="Sex">
              <select
                className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const sex = e.target.value
                  setErrors({
                    ...errors,
                    sex: Utils.validate.single(sex, Utils.patientManager.sex),
                  })
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    sex,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  lookupItems,
                  "PATIENT MANAGER - SEX"
                ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>  
                    ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            {errors?.sex && (
              <span className="text-red-600 font-medium relative">{errors.sex}</span>
            )}
            <LibraryComponents.Atoms.Form.MultilineInput
              rows={4}
              label="Address"
              name="txtAddress"
              placeholder="Address"
              value={Stores.patientRegistationStore.patientManger?.address}
              onChange={(address) => {
                setErrors({
                  ...errors,
                  address: Utils.validate.single(
                    address,
                    Utils.patientManager.address
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  address,
                })
              }}
            />
            {errors?.address && (
              <span className="text-red-600 font-medium relative">
                {errors.address}
              </span>
            )}
            <div className="mt-2" />
            <LibraryComponents.Atoms.Form.Input
              label="City"
              name="txtCity"
              placeholder="City"
              value={Stores.patientRegistationStore.patientManger?.city}
              onChange={(city) => {
                setErrors({
                  ...errors,
                  city: Utils.validate.single(city, Utils.patientManager.city),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  city,
                })
              }}
            />
            {errors?.middleName && (
              <span className="text-red-600 font-medium relative">
                {errors.middleName}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="State"
              name="txtState"
              placeholder="State"
              value={Stores.patientRegistationStore.patientManger?.state}
              onChange={(state) => {
                setErrors({
                  ...errors,
                  state: Utils.validate.single(state, Utils.patientManager.state),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  state,
                })
              }}
            />
            {errors?.state && (
              <span className="text-red-600 font-medium relative">
                {errors.state}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Country"
              name="txtCountry"
              placeholder="Country"
              value={Stores.patientRegistationStore.patientManger?.country}
              onChange={(country) => {
                setErrors({
                  ...errors,
                  country: Utils.validate.single(
                    country,
                    Utils.patientManager.country
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  country,
                })
              }}
            />
            {errors?.country && (
              <span className="text-red-600 font-medium relative">
                {errors.country}
              </span>
            )}
          </LibraryComponents.Atoms.List>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <LibraryComponents.Atoms.Form.Input
              label="Postcode"
              name="txtPostcode"   
              placeholder="Postcode"
              value={Stores.patientRegistationStore.patientManger?.postcode}
              onChange={(postcode) => {
                setErrors({
                  ...errors,
                  postcode: Utils.validate.single(
                    postcode,
                    Utils.patientManager.postcode
                  ),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  postcode,
                })
              }}
            />
            {errors?.postcode && (
              <span className="text-red-600 font-medium relative">
                {errors.postcode}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Email"
              name="txtEmail"
              placeholder="Email"
              type="mail"
              value={Stores.patientRegistationStore.patientManger?.email}
              onChange={(email) => {
                setErrors({
                  ...errors,
                  email: Utils.validate.single(email, Utils.patientManager.email),
                })
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  email,
                })
              }}
            />
            {errors?.postcode && (
              <span className="text-red-600 font-medium relative">
                {errors.postcode}
              </span>
            )}
            <LibraryComponents.Atoms.Form.InputWrapper label="Species">
              <select
                className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const species = e.target.value as string
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    species,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  lookupItems,
                  "PATIENT MANAGER - SPECIES"
                ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                       {LibraryUtils.lookupValue(item)}
                      </option>
                    ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            <LibraryComponents.Atoms.Grid cols={2}>
              <LibraryComponents.Atoms.Form.Toggle
                label="Permanent"
                id="modePermanent"
                value={Stores.patientRegistationStore.patientManger?.permanent}
                onChange={(permanent) => {
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    permanent,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Toggle
                label="Vip"
                id="modeVip"
                value={Stores.patientRegistationStore.patientManger?.vip}
                onChange={(vip) => {
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    vip,
                  })
                }}
              />
            </LibraryComponents.Atoms.Grid>
          </LibraryComponents.Atoms.List>
        </LibraryComponents.Atoms.Grid>
      </div>
      <br />

      <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={() => {
            // if (
            //   Utils.validate(
            //     Stores.enviromentSettingsStore.sessionManagement,
            //     Utils.constraintsSessionManagement
            //   ) === undefined
            // ) {
            //   
            //   Stores.enviromentSettingsStore.EnvironmentSettingsService.addSessionManagement(
            //     Stores.enviromentSettingsStore
            //       .sessionManagement as Models.SessionManagement
            //   ).then((res) => {
            //     
            //     if (res.status === 201) {
            //       LibraryComponents.Atoms.ToastsStore.success(`Session created.`)
            //       // Stores.userStore.clear()
            //       // Stores.userStore.loadUser()
            //       setTimeout(() => {
            //         window.location.reload()
            //       }, 2000)
            //     } else {
            //       LibraryComponents.Atoms.ToastsStore.warning(
            //         "Session not create.Please try again"
            //       )
            //     }
            //   })
            // } else {
            //   LibraryComponents.Atoms.ToastsStore.warning(
            //     "Please enter all information!"
            //   )
            // }
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
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      ></div>
    </>
  )
})
export default PatientManager
