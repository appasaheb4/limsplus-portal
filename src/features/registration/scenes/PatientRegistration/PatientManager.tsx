/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import "@lp/library/assets/css/accordion.css"
import { stores } from "@lp/library/stores"

import { Stores } from "../../stores"


interface PatientManagerProps {
  onModalConfirm?: (item: any) => void
}

const PatientManager = observer((props: PatientManagerProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const onSubmitPatientManager = () =>{
    // Add Patient
  }
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.patientRegistationStore.updatePatientManager({
        ...Stores.patientRegistationStore.patientManger,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

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
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Internal Pid"
              name="txtInternalPid"
              placeholder={errors.internalPid?"Please Enter Internal Pid":"Internal Pid"}
              hasError={errors.internalPid}
              value={Stores.patientRegistationStore.patientManger?.internalPid}
              onChange={(internalPid) => {
               onChange(internalPid)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  internalPid,
                })
              }}
            />
            )}
              name="internalPid"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Mobile No"
              name="txtMobileNo"
              placeholder={errors.txtMobileNo?"Please Enter MobileNo":"Mobile No"}
              hasError={errors.txtMobileNo}
              type="number"
              value={Stores.patientRegistationStore.patientManger?.mobileNo}
              onChange={(mobileNo) => {
                onChange(mobileNo)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  mobileNo,
                })
              }}
            />
            )}
              name="txtMobileNo"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper label="Title" hasError={errors.title}>
              <select
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.title
                    ? "border-red-500  focus:border-red-500"
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const title = e.target.value
                  onChange(title)
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    title,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  stores.routerStore.lookupItems,
                  "PATIENT MANAGER - TITLE"
                ).map((item: any, index: number) => (
                  <option key={index} value={item.code}>
                    {LibraryUtils.lookupValue(item)}
                  </option>  
                ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
             )}
             name="title"
             rules={{ required: true }}
             defaultValue=""
           />
           <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="First Name"
              name="txtFirstName"
              placeholder={errors.firstName?"Please Enter FirstName":"First Name"}
              hasError={errors.firstName}
              value={Stores.patientRegistationStore.patientManger?.firstName}
              onChange={(firstName) => {
                onChange(firstName)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  firstName,
                })
              }}
            />
            )}
              name="firstName"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Middle Name"
              name="txtMiddleName"
              placeholder={errors.middleName?"Please Enter MiddleName":"Middle Name"}
              hasError={errors.middleName}
              value={Stores.patientRegistationStore.patientManger?.middleName}
              onChange={(middleName) => {
               onChange(middleName)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  middleName,
                })
              }}
            />
            )}
              name="middleName"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Last Name"
              name="txtLastName"
              placeholder={errors.lastName?"Please Enter LastName":"Last Name"}
              hasError={errors.lastName}
              value={Stores.patientRegistationStore.patientManger?.lastName}
              onChange={(lastName) => {
                onChange(lastName)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  lastName,
                })
              }}
            />
            )}
              name="lastName"
              rules={{ required: true }}
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
            <LibraryComponents.Atoms.Form.InputWrapper label="Sex" hasError={errors.sex}>
              <select
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.sex
                    ? "border-red-500  focus:border-red-500"
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const sex = e.target.value
                  onChange(sex)
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    sex,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  stores.routerStore.lookupItems,
                  "PATIENT MANAGER - SEX"
                ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>  
                    ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="sex"
            rules={{ required: true }}
            defaultValue=""
          />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.MultilineInput
              rows={4}
              label="Address"
              name="txtAddress"
              placeholder={errors.address?"Please Enter Address":"Address"}
              hasError={errors.address}
              value={Stores.patientRegistationStore.patientManger?.address}
              onChange={(address) => {
                onChange(address)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  address,
                })
              }}
            />
            )}
              name="address"
              rules={{ required: true }}
              defaultValue=""
            />
           
            <div className="mt-2" />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="City"
              name="txtCity"
              placeholder={errors.city?"Please Enter City":"City"}
              hasError={errors.city}
              value={Stores.patientRegistationStore.patientManger?.city}
              onChange={(city) => {
                onChange(city)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  city,
                })
              }}
            />
            )}
              name="city"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="State"
              name="txtState"
              placeholder={errors.state?"Please Enter State":"State"}
              hasError={errors.state}
              value={Stores.patientRegistationStore.patientManger?.state}
              onChange={(state) => {
                onChange(state)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  state,
                })
              }}
            />
            )}
              name="state"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Country"
              name="txtCountry"
              placeholder={errors.country?"Please Enter Country":"Country"}
              hasError={errors.country}
              value={Stores.patientRegistationStore.patientManger?.country}
              onChange={(country) => {
                onChange(country)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  country,
                })
              }}
            />
            )}
              name="country"
              rules={{ required: true }}
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
              label="Postcode"
              name="txtPostcode"   
              placeholder={errors.postcode?"Please Enter Postcode":"Postcode"}
              hasError={errors.postcode}
              value={Stores.patientRegistationStore.patientManger?.postcode}
              onChange={(postcode) => {
                onChange(postcode)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  postcode,
                })
              }}
            />
            )}
              name="postcode"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Email"
              name="txtEmail"
              placeholder={errors.email?"Please Enter Email":"Email"}
              hasError={errors.email}
              type="mail"
              value={Stores.patientRegistationStore.patientManger?.email}
              onChange={(email) => {
                onChange(email)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  email,
                })
              }}
            />
            )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper label="Species" hasError={errors.species}>
              <select
               className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                errors.species
                  ? "border-red-500  focus:border-red-500"
                  : "border-gray-300"
              } rounded-md`}
                onChange={(e) => {
                  const species = e.target.value as string
                  onChange(species)
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    species,
                  })
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  stores.routerStore.lookupItems,
                  "PATIENT MANAGER - SPECIES"
                ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                       {LibraryUtils.lookupValue(item)}
                      </option>
                    ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="species"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.patientRegistationStore.patientManger?.environment}
                  disabled={
                    stores.loginStore.login &&
                    stores.loginStore.login.role !== "SYSADMIN"
                      ? true
                      : false
                  }
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.patientRegistationStore.updatePatientManager({
                      ...Stores.patientRegistationStore.patientManger,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.patientRegistationStore.patientManger?.environment || `Select`}
                      </option>
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
            <LibraryComponents.Atoms.Grid cols={2}>
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Toggle
                label="Permanent"
                id="modePermanent"
                hasError={errors.permanent}
                value={Stores.patientRegistationStore.patientManger?.permanent}
                onChange={(permanent) => {
                  onChange(permanent)
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    permanent,
                  })
                }}
              />
              )}
              name="permanent"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Toggle
                label="Vip"
                id="modeVip"
                hasError={errors.vip}
                value={Stores.patientRegistationStore.patientManger?.vip}
                onChange={(vip) => {
                  onChange(vip)
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    vip,
                  })
                }}
              />
              )}
              name="vip"
              rules={{ required: false }}
              defaultValue=""
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
          onClick={handleSubmit(onSubmitPatientManager)}
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
