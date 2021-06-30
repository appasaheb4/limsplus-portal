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

const RegistrationLocation = observer(() => {
  const [errors, setErrors] = useState<Models.RegistrationLocations>()
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
          Stores.registrationLocationsStore.updateRegistrationLocations({
            ...Stores.registrationLocationsStore.registrationLocations,
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
                  .unix(
                    Stores.registrationLocationsStore.registrationLocations
                      ?.dateCreation || 0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active From"
                placeholder="Date Active From"
                value={LibraryUtils.moment
                  .unix(
                    Stores.registrationLocationsStore.registrationLocations
                      ?.dateActiveFrom || 0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active To"
                placeholder="Date Active T0"
                value={LibraryUtils.moment
                  .unix(
                    Stores.registrationLocationsStore.registrationLocations
                      ?.dateActiveTo || 0
                  )
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder="Version"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.version
                }
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder="Key Num"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.keyNum
                }
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder="Entered By"
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
              />

              <LibraryComponents.Atoms.Form.Input
                label="Location Code"
                placeholder="Location Code"
                value={
                  Stores.registrationLocationsStore.registrationLocations
                    ?.locationCode
                }
                onChange={(locationCode) => {
                  setErrors({
                    ...errors,
                    locationCode: Utils.validate.single(
                      locationCode,
                      Utils.registrationLocations.locationCode
                    ),
                  })
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    locationCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Location Name"
                placeholder="Location Name"
                value={
                  Stores.registrationLocationsStore.registrationLocations
                    ?.locationName
                }
                onChange={(locationName) => {
                  setErrors({  
                    ...errors,
                    locationName: Utils.validate.single(
                      locationName,
                      Utils.registrationLocations.locationCode
                    ),
                  })
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    locationName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Address"
                placeholder="Address"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.address
                }
                onChange={(address) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    address,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="City"
                placeholder="City"
                value={Stores.registrationLocationsStore.registrationLocations?.city}
                onChange={(city) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    city,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="State"
                placeholder="State"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.state
                }
                onChange={(state) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    state,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Country"
                placeholder="Country"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.country
                }
                onChange={(country) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    country,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Postcode"
                placeholder="Postcode"
                type="number"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.postcode
                }
                onChange={(postcode) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    postcode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Customer Group">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const customerGroup = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      customerGroup,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "CUSTOMER_GROUP"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Category">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      category,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "Category"
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
              <LibraryComponents.Atoms.Form.Input
                label="Telephone"
                placeholder="Telephone"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.telephone
                }
                onChange={(telephone) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    telephone,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Mobile No"
                placeholder="Mobile No"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.mobileNo
                }
                onChange={(mobileNo) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    mobileNo,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Email"
                placeholder="Email"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.email
                }
                onChange={(email) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    email,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryType = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      deliveryType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "DELIVERY_TYPE"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Method">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      deliveryMethod,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "DELIVERY_METHOD"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Corporate Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const corporateCode = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      corporateCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Invoice AC">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const invoiceAc = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      invoiceAc,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Lab Licence"
                placeholder="Lab Licence"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.labLicence
                }
                onChange={(labLicence) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    labLicence,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Method Coln">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const methodColn = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      methodColn,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "METHOD_COLN"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Work HRS"
                placeholder="Work HRS"
                type="number"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.workHrs
                }
                onChange={(workHrs) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    workHrs,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales TerritoRy">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      salesTerritoRy,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SPECIALITY"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Area"
                placeholder="Area"
                value={Stores.registrationLocationsStore.registrationLocations?.area}
                onChange={(area) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    area,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Zone"
                placeholder="Zone"
                value={Stores.registrationLocationsStore.registrationLocations?.zone}
                onChange={(zone) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    zone,
                  })
                }}
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  value={
                    Stores.registrationLocationsStore.registrationLocations
                      ?.confidential
                  }
                  onChange={(confidential) => {
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      confidential,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Print Label"
                  value={
                    Stores.registrationLocationsStore.registrationLocations
                      ?.printLabel
                  }
                  onChange={(printLabel) => {
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      printLabel,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Never Bill"
                  value={
                    Stores.registrationLocationsStore.registrationLocations
                      ?.neverBill
                  }
                  onChange={(neverBill) => {
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
                      neverBill,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  value={
                    Stores.registrationLocationsStore.registrationLocations?.urgent
                  }
                  onChange={(urgent) => {
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
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
              <LibraryComponents.Atoms.Form.Input
                label="Route"
                placeholder="Route"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.route
                }
                onChange={(route) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    route,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  value={
                    Stores.registrationLocationsStore.registrationLocations?.lab
                  }
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
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
              <LibraryComponents.Atoms.Form.Input
                label="Location"
                placeholder="Location"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.location
                }
                onChange={(location) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    location,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="EDI"
                placeholder="EDI"
                value={Stores.registrationLocationsStore.registrationLocations?.edi}
                onChange={(edi) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    edi,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="EDI Address"
                placeholder="EDI Address"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.ediAddress
                }
                onChange={(ediAddress) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    ediAddress,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="Schedule">
                <select
                  value={
                    Stores.registrationLocationsStore.registrationLocations?.schedule
                  }
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
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
                value={
                  Stores.registrationLocationsStore.registrationLocations
                    ?.reportFormat
                }
                onChange={(reportFormat) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    reportFormat,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Info"
                placeholder="Info"
                value={Stores.registrationLocationsStore.registrationLocations?.info}
                onChange={(info) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    info,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="FYI Line"
                placeholder="FYI Line"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.fyiLine
                }
                onChange={(fyiLine) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    fyiLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Work Line"
                placeholder="Work Line"
                value={
                  Stores.registrationLocationsStore.registrationLocations?.workLine
                }
                onChange={(workLine) => {
                  Stores.registrationLocationsStore.updateRegistrationLocations({
                    ...Stores.registrationLocationsStore.registrationLocations,
                    workLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.registrationLocationsStore.updateRegistrationLocations({
                      ...Stores.registrationLocationsStore.registrationLocations,
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
                  Stores.registrationLocationsStore.registrationLocations,
                  Utils.registrationLocations
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.registrationLocationsStore.registrationLocationsService
                    .addRegistrationLocations(
                      Stores.registrationLocationsStore.registrationLocations
                    )
                    .then((res) => {
                      RootStore.rootStore.setProcessLoading(false)
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Doctor record created.`,
                        })
                        Stores.registrationLocationsStore.fetchRegistrationLocations()
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
            data={Stores.registrationLocationsStore.listRegistrationLocations || []}
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
              Stores.registrationLocationsStore.registrationLocationsService
                .deleteRegistrationLocations(modalConfirm.id)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Doctors record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.registrationLocationsStore.fetchRegistrationLocations()
                  }
                })
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.registrationLocationsStore.registrationLocationsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Doctors record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.registrationLocationsStore.fetchRegistrationLocations()
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

export default RegistrationLocation
