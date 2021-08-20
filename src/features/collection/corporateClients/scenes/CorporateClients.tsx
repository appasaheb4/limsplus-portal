/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import { useForm, Controller } from "react-hook-form"  
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"

import { RouterFlow } from "@lp/flows"

const CorporateClients = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const {
		loginStore,
	} = useStores();
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
          Stores.corporateClientsStore.updateCorporateClients({
            ...Stores.corporateClientsStore.corporateClients,
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

  const onSubmitCoporateClients = () =>{
    const error = Utils.validate(
      Stores.corporateClientsStore.corporateClients,
      Utils.corporateClients
    )
    
    if (error === undefined) {
      Stores.corporateClientsStore.corporateClientsService
        .addCorporateClients(
          Stores.corporateClientsStore.corporateClients
        )
        .then((res) => {
          if (res.status === 200) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Corporate Client record created.`,
            })
            Stores.corporateClientsStore.fetchCorporateClients()
          }
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter all information!`,
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
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
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
              <Controller
               control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder={errors.dateCreation ? "Please Enter Date Creation " : "Created By"}
                hasError={errors.dateCreation}
                value={LibraryUtils.moment
                  .unix(
                    Stores.corporateClientsStore.corporateClients?.dateCreation || 0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              )}
              name="dateCreation"
               rules={{ required: false }}
               defaultValue=""
              />

            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active"
                hasError={errors.dateActive}
                placeholder={errors.dateActive ? "Please Enter Date Active" : "Date Active"}
                value={LibraryUtils.moment
                  .unix(
                    Stores.corporateClientsStore.corporateClients?.dateActiveFrom ||
                      0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              )}
               name="dateActive"
               rules={{ required: false }}
              defaultValue=""
             />

              <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Expire"
                hasError={errors.dateExpire}
                placeholder={errors.dateExpire ? "Please Enter Date Expire" : "Date Expire"}
                value={LibraryUtils.moment
                  .unix(
                    Stores.corporateClientsStore.corporateClients?.dateActiveTo || 0
                  )
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              )}
               name="dateExpire"
               rules={{ required: false }}
              defaultValue=""
             />
              <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder={errors.version ? "Please Enter Version" : "Version"}
                hasError={errors.version}
                value={Stores.corporateClientsStore.corporateClients?.version}
                disabled={true}
              />
              )}
              name="version"
              rules={{ required: false }}
             defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder={errors.keyNum ? "Please Enter Key Num" : "Key Num"}
                hasError={errors.keyNum}
                value={Stores.corporateClientsStore.corporateClients?.keyNum}
                disabled={true}
              />
              )}
              name="keyNum"
              rules={{ required: false }}
             defaultValue=""
            />

            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                hasError={errors.enteredBy}
                placeholder={errors.enteredBy ? "Please Enter Entered By" : "Entered By"}
                value={LoginStore.loginStore.login?.userId} 
                disabled={true}
              />
              )}
              name="enteredBy"
              rules={{ required: false }}
             defaultValue=""
            />

             <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Corporate Code"
                placeholder={errors.corporateCode ? "Please Enter Coporate Code" : "Coporate Code"}
                hasError={errors.corporateCode}
                value={Stores.corporateClientsStore.corporateClients?.corporateCode}
                onChange={(corporateCode) => {
                  onChange(corporateCode)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    corporateCode,
                  })
                }}
              />
              )}
              name="corporateCode"
              rules={{ required: true }}
              defaultValue=""
            />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Corporate Name"
                placeholder={errors.corporateName  ? "Please Enter Coporate Name" : "Coporate Name"}
                hasError={errors.corporateName}
                value={Stores.corporateClientsStore.corporateClients?.corporateName}
                onChange={(corporateName) => {
                 onChange(corporateName)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    corporateName,
                  })
                }}
              />
              )}
              name="corporate Name"
              rules={{ required: true }}
              defaultValue=""
            />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Invoice AC"
                placeholder={errors.invoiceAc ? "Please Enter Invoice AC" : "Invoice AC"}
                hasError={errors.invoiceAc}
                value={Stores.corporateClientsStore.corporateClients?.invoiceAc}
                onChange={(invoiceAc) => {
                  onChange(invoiceAc)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    invoiceAc,
                  })
                }}
              />
              )}
              name="invoiceAc"
              rules={{ required: false }}
              defaultValue=""
            />
             <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Price List" hasError={errors.priceList}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.priceList
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const priceList = e.target.value
                    onChange(priceList)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      priceList,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {`${item}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
               )}
               name="priceList"
               rules={{ required: false }}
               defaultValue=""
             />

              <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Price Group"
                placeholder={errors.priceGroup ? "Please Enter Price Group" : "Price Group"}
                value={Stores.corporateClientsStore.corporateClients?.priceGroup}
                hasError={errors.priceGroup}
                onChange={(priceGroup) => {
                  onChange(priceGroup)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    priceGroup,
                  })
                }}
              />
              )}
               name="priceGroup"
               rules={{ required: false }}
               defaultValue=""
             />

              <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Billing on"
                placeholder={errors.billingOn ? "Please Enter Biling On" : "Billing On"}
                hasError={errors.billingOn}
                value={Stores.corporateClientsStore.corporateClients?.billingOn}
                onChange={(billingOn) => {
                  onChange(billingOn)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    billingOn,
                  })
                }}
              />
              )}
               name="billingOn"
               rules={{ required: false }}
               defaultValue=""
             />
             <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Address"
                placeholder={errors.address ? "Please Enter Address" : "Address"}
                hasError={errors.address}
                value={Stores.corporateClientsStore.corporateClients?.address}
                onChange={(address) => {
                  onChange(address)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    address,
                  })
                }}
              />
              )}
               name="address"
               rules={{ required: false }}
               defaultValue=""
             />
            </LibraryComponents.Atoms.List>
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
                label="City"
                placeholder={errors.city ? "Please Enter City" : "City"}
                hasError={errors.city}
                value={Stores.corporateClientsStore.corporateClients?.city}
                onChange={(city) => {
                  onChange(city)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    city,
                  })
                }}
              />
              )}
               name="city"
               rules={{ required: false }}
               defaultValue=""
             />
             <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="State"
                placeholder={errors.state ? "Please Enter State" : "State"} 
                hasError={errors.state}
                value={Stores.corporateClientsStore.corporateClients?.state}
                onChange={(state) => {
                  onChange(state)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    state,
                  })
                }}
              />
              )}
               name="state"
               rules={{ required: false }}
               defaultValue=""
             />
             <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Country"
                placeholder={errors.country ? "Please Enter Country" : "Country"}
                hasError={errors.country}
                value={Stores.corporateClientsStore.corporateClients?.country}
                onChange={(country) => {
                  onChange(country)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    country,
                  })
                }}
              />
              )}
              name="country"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Postcode"
                placeholder={errors.postCode ? "Please Enter PostCode" : "Post Code"}
                hasError={errors.postCode}
                type="number"
                value={Stores.corporateClientsStore.corporateClients?.postcode}
                onChange={(postcode) => {
                  onChange(postcode)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    postcode,
                  })
                }}
              />
              )}
              name="postCode"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Customer Group" hasError={errors.customerGroup}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.customerGroup
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const customerGroup = e.target.value
                    onChange(customerGroup)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      customerGroup,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CUSTOMER_GROUP").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
               )}
               name="customerGroup"
               rules={{ required: false }}
               defaultValue=""
             />

            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Category" hasError={errors.category}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.category
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const category = e.target.value
                    onChange(category)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      category,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CATEGORY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="category"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Telephone"
                placeholder={errors.telephone ? "Please Enter Telephone" : "Telephone"}
                hasError={errors.telephone}
                value={Stores.corporateClientsStore.corporateClients?.telephone}
                onChange={(telephone) => {
                  onChange(telephone)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    telephone,
                  })
                }}
              />
              )}
              name="telephone"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Mobile No"
                placeholder={errors.mobileNo ? "Please Enter Mobile No" : "Mobile No"}
                hasError={errors.mobileNo}
                value={Stores.corporateClientsStore.corporateClients?.mobileNo}
                onChange={(mobileNo) => {
                  onChange(mobileNo)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    mobileNo,
                  })
                }}
              />
              )}
              name="mobileNo"
              rules={{ required: false }}
              defaultValue=""
            />
             <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Email"
                placeholder={errors.email ? "Please Enter Email" : "Email"}
                hasError={errors.email}
                value={Stores.corporateClientsStore.corporateClients?.email}
                onChange={(email) => {
                  onChange(email)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    email,
                  })
                }}
              />
              )}
              name="email"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type" hasError={errors.deliveryType}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.deliveryType
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const deliveryType = e.target.value
                    onChange(deliveryType)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
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
              )}
              name="deliveryType"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Method" hasError={errors.deliveryMethod}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.deliveryMethod
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                    onChange(deliveryMethod)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
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
              )}
              name="deliveryMethod"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales TerritoRy" hasError={errors.salesTerritoRy}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.salesTerritoRy
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                    onChange(salesTerritoRy)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
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
              )}
              name="salesTerritoRy"
              rules={{ required: false }}
              defaultValue=""
            />
              <LibraryComponents.Atoms.Grid cols={5}>
              <Controller
               control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  hasError={errors.confidential}
                  value={Stores.corporateClientsStore.corporateClients?.confidential}
                  onChange={(confidential) => {
                    onChange(confidential)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      confidential,
                    })
                  }}
                />
                )}
              name="confidential"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  hasError={errors.urgent}
                  value={Stores.corporateClientsStore.corporateClients?.urgent}
                  onChange={(urgent) => {
                    onChange(urgent)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
                      urgent,
                    })
                  }}
                />
                )}
                name="urgent"
                rules={{ required: false }}
                defaultValue=""
              />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>
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
                label="Area"
                placeholder={errors.area ? "Please Enter Area" : "Area"}
                hasError={errors.area}
                value={Stores.corporateClientsStore.corporateClients?.area}
                onChange={(area) => {
                  onChange(area)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    area,
                  })
                }}
              />
              )}
              name="area"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Zone"
                placeholder={errors.zone ? "Please Enter Zone" : "Zone"}
                hasError={errors.zone}
                value={Stores.corporateClientsStore.corporateClients?.zone}
                onChange={(zone) => {
                  onChange(zone)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    zone,
                  })
                }}
              />
              )}
              name="zone"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="EDI"
                placeholder={errors.edi ? "Please Enter EDI" : "EDI"}
                hasError={errors.edi}
                value={Stores.corporateClientsStore.corporateClients?.edi}
                onChange={(edi) => {
                  onChange(edi)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    edi,
                  })
                }}
              />
              )}
              name="edi"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="EDI Address"
                placeholder={errors.ediAddress ? "Please Enter EDI Address" : "EDI Address"}
                hasError={errors.ediAddress}
                value={Stores.corporateClientsStore.corporateClients?.ediAddress}
                onChange={(ediAddress) => {
                  onChange(ediAddress)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    ediAddress,
                  })
                }}
              />
              )}
              name="ediAddress"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Schedule" hasError={errors.schedule}>
                <select
                  value={Stores.corporateClientsStore.corporateClients?.schedule}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.schedule
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    onChange(schedule)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
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
              )}
              name="schedule"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Report Format"
                placeholder={errors.reportFormat ? "Please Enter Report Format" : "ReportFormat"}
                hasError={errors.reportFormat}
                value={Stores.corporateClientsStore.corporateClients?.reportFormat}
                onChange={(reportFormat) => {
                  onChange(reportFormat)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    reportFormat,
                  })
                }}
              />
              )}
              name="reportFormat"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Info"
                placeholder={errors.info ?"Please Enter INFO" : "INFO"}
                hasError={errors.info}
                value={Stores.corporateClientsStore.corporateClients?.info}
                onChange={(info) => {
                  onChange(info)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    info,
                  })
                }}
              />
              )}
              name="info"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="FYI Line"
                placeholder={errors.fyiLine ? "Please Enter FyiLine" : "FyiLine"}
                hasError={errors.fyiLine}
                value={Stores.corporateClientsStore.corporateClients?.fyiLine}
                onChange={(fyiLine) => {
                  onChange(fyiLine)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    fyiLine,
                  })
                }}
              />
              )}
              name="fyiLine"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Work Line"
                placeholder={errors.workLine ? "Plese Enter WorkLine" : "WorkLine"}
                hasError={errors.workLine}
                value={Stores.corporateClientsStore.corporateClients?.workLine}
                onChange={(workLine) => {
                  onChange(workLine)
                  Stores.corporateClientsStore.updateCorporateClients({
                    ...Stores.corporateClientsStore.corporateClients,
                    workLine,
                  })
                }}
              />
              )}
              name="workLine"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
               control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Status" hasError={errors.status}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.status
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const status = e.target.value
                    onChange(status)
                    Stores.corporateClientsStore.updateCorporateClients({
                      ...Stores.corporateClientsStore.corporateClients,
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
              )}
              name="status"
              rules={{ required: false }}
              defaultValue=""
            />
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitCoporateClients)}
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
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.CorporateClient
            data={Stores.corporateClientsStore.listCorporateClients || []}
            isDelete={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
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
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.corporateClientsStore.corporateClientsService
                .deleteCorporateClients(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Corporate Client record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.corporateClientsStore.fetchCorporateClients()
                  }
                })
            } else if (type === "Update") {
              Stores.corporateClientsStore.corporateClientsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Corporate Client record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.corporateClientsStore.fetchCorporateClients()
                    window.location.reload()
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

export default CorporateClients
