/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as AdministrativeDivisionStore } from "@lp/features/collection/administrativeDivisions/stores"
import "@lp/library/assets/css/accordion.css"
import { stores } from "@lp/stores"
import { toJS } from "mobx"
import { Stores } from "../../stores"
import { RouterFlow } from "@lp/flows"
import { AdministrativeDivisions } from "@lp/features/collection/administrativeDivisions/scenes"

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
              label="Pid"
              name="txtPid"
              placeholder={errors.pId?"Please Enter Pid":"Pid"}
              hasError={errors.pId}
              value={Stores.patientRegistationStore.patientManger?.pId}
              onChange={(pId) => {
               onChange(pId)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  pId,
                })
              }}
            />
            )}
              name="pId"
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
            <LibraryComponents.Atoms.Form.InputDate
              label="BithDate"
              name="txtBirthDate"
              placeholder={errors.birthDate?"Please Enter BirthDate":"BirthDate"}
              hasError={errors.birthDate}
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientManger?.birthDate
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let birthDate = new Date(e.target.value)
                onChange(birthDate)
                const formatDate = LibraryUtils.moment(birthDate).format(
                  "YYYY-MM-DD HH:mm"
                )
                
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  birthDate: new Date(formatDate),
                })
              }}
            />
            )}
              name="birthDate"
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
                    ? "border-red-500  "
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
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper label="Sex" hasError={errors.sex}>
              <select
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.sex
                    ? "border-red-500  "
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
            <LibraryComponents.Atoms.Form.InputWrapper label="Species" hasError={errors.species}>
              <select
               className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                errors.species
                  ? "border-red-500  "
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
            <LibraryComponents.Atoms.Form.Input
              label="Breed"
              name="txtBreed"
              placeholder={errors.breed?"Please Enter Breed":"Breed"}
              hasError={errors.breed}
              value={Stores.patientRegistationStore.patientManger?.breed}
              onChange={(breed) => {
                onChange(breed)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  breed,
                })
              }}
            />
            )}
              name="breed"
              rules={{ required: false }}
              defaultValue=""
            />
          <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Usual Doctor"
                    hasError={errors.usualDoctor}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.usualDoctor ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const usualDoctor = JSON.parse(e.target.value)
                        onChange(usualDoctor)
                        Stores.patientRegistationStore.updatePatientManager({
                          ...Stores.patientRegistationStore.patientManger,
                          usualDoctor
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {/* {CoporateClients.corporateClientsStore.listCorporateClients &&
                        CoporateClients.corporateClientsStore.listCorporateClients.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.corporateCode} - ${item.corporateName}`}
                            </option>
                          )
                        )} */}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="usualDoctor"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.MultilineInput
              rows={2}
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
              <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="History"
                      id="txtHistory"
                      hasError={errors.history}
                      value={Stores.patientRegistationStore.patientManger?.history}
                      onChange={(history) => {
                        onChange(history)
                        Stores.patientRegistationStore.updatePatientManager({
                          ...Stores.patientRegistationStore.patientManger,
                          history,
                        })
                      }}
                    />
                  )}
                  name="history"
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="City"
                    hasError={errors.city}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const city = e.target.value as string
                        onChange(city)
                        Stores.patientRegistationStore.updatePatientManager({
                          ...Stores.patientRegistationStore.patientManger,
                          city,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv &&
                      AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.city}>
                            {`${item.city}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="city"
                rules={{ required: true }}
                defaultValue=""
              />
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="State"
                    hasError={errors.state}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const state = e.target.value as string
                        onChange(state)
                        Stores.patientRegistationStore.updatePatientManager({
                          ...Stores.patientRegistationStore.patientManger,
                          state,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv &&
                      AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.state}>
                            {`${item.state}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="state"
                rules={{ required: true }}
                defaultValue=""
              />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                    label="Country"
                    hasError={errors.country}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.country ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const country = e.target.value as string
                        onChange(country)
                        Stores.patientRegistationStore.updatePatientManager({
                          ...Stores.patientRegistationStore.patientManger,
                          country,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv &&
                      AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.country}>
                            {`${item.country}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
            )}
              name="country"
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
            <LibraryComponents.Atoms.Form.Input
              label="WhatsApp Number"
              name="txtWhatsappNumber"
              placeholder={errors.whatsappNumber?"Please Enter WhatsappNumber":"WhatsAppNumber"}
              hasError={errors.whatsappNumber}
              value={Stores.patientRegistationStore.patientManger?.whatsappNumber}
              onChange={(whatsappNumber) => {
                onChange(whatsappNumber)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  whatsappNumber,
                })
              }}
            />
            )}
              name="whatsappNumber"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputFile
                      label="Photograph"
                      placeholder="File"
                      onChange={(e) => {
                        const photograph = e.target.files[0]
                        onChange(photograph)
                        Stores.patientRegistationStore.updatePatientManager({
                          ...Stores.patientRegistationStore.patientManger,
                          photograph,
                        })
                      }}
                    />
                  )}
                  name="photograph"
                  rules={{ required: false }}
                  defaultValue=""
                />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputFile
                      label="Signature"
                      placeholder="File"
                      onChange={(e) => {
                        const signature = e.target.files[0]
                        onChange(signature)
                        Stores.patientRegistationStore.updatePatientManager({
                          ...Stores.patientRegistationStore.patientManger,
                          signature,
                        })
                      }}
                    />
                  )}
                  name="signature"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Blood Group"
              name="txtBloodGroup"
              placeholder={errors.bloodGroup?"Please Enter Blood Group":"BloodGroup"}
              hasError={errors.bloodGroup}
              value={Stores.patientRegistationStore.patientManger?.bloodGroup}
              onChange={(bloodGroup) => {
                onChange(bloodGroup)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  bloodGroup,
                })
              }}
            />
            )}
              name="bloodGroup"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Height"
              name="txtHeight"
              placeholder={errors.height?"Please Enter Height":"Height"}
              hasError={errors.height}
              value={Stores.patientRegistationStore.patientManger?.height}
              onChange={(height) => {
                onChange(height)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  height,
                })
              }}
            />
            )}
              name="height"
              rules={{ required: true }}
              defaultValue=""
            />
                <LibraryComponents.Atoms.Grid cols={4}>
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Toggle
                label="Is Mobile WhatsApp"
                id="modeIsMobileAndWhatsApp"
                hasError={errors.isMobileAndWhatsApp}
                value={Stores.patientRegistationStore.patientManger?.isMobileAndWhatsApp}
                onChange={(isMobileAndWhatsApp) => {
                  onChange(isMobileAndWhatsApp)
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    isMobileAndWhatsApp,
                  })
                }}
              />
              )}
              name="isMobileAndWhatsApp"
              rules={{ required: false }}
              defaultValue=""
            />
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
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Toggle
                label="Confidental"
                id="modeConfidental"
                hasError={errors.confidental}
                value={Stores.patientRegistationStore.patientManger?.confidental}
                onChange={(confidental) => {
                  onChange(confidental)
                  Stores.patientRegistationStore.updatePatientManager({
                    ...Stores.patientRegistationStore.patientManger,
                    confidental,
                  })
                }}
              />
              )}
              name="confidental"
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
              label="Weight"
              name="txtWeight"
              placeholder={errors.height?"Please Enter Weight":"Weight"}
              hasError={errors.weight}
              value={Stores.patientRegistationStore.patientManger?.weight}
              onChange={(weight) => {
                onChange(weight)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  weight,
                })
              }}
            />
            )}
              name="weight"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Follow Up"
              name="txtFollowUp"
              placeholder={errors.followUp?"Please Enter FollowUp":"FollowUp"}
              hasError={errors.followUp}
              value={Stores.patientRegistationStore.patientManger?.followUp}
              onChange={(followUp) => {
                onChange(followUp)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  followUp,
                })
              }}
            />
            )}
              name="followUp"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Comments"
              name="txtComments"
              placeholder={errors.comments?"Please Enter FollowUp":"FollowUp"}
              hasError={errors.comments}
              value={Stores.patientRegistationStore.patientManger?.comments}
              onChange={(comments) => {
                onChange(comments)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  comments,
                })
              }}
            />
            )}
              name="comments"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="FyiLine"
              name="txtFyiLine"
              placeholder={errors.fyiLine?"Please Enter FyiLine":"Fyiline"}
              hasError={errors.fyiLine}
              value={Stores.patientRegistationStore.patientManger?.fyiLine}
              onChange={(fyiLine) => {
                onChange(fyiLine)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  fyiLine,
                })
              }}
            />
            )}
              name="fyiLine"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Balance"
              name="txtBalance"
              placeholder={errors.balance?"Please Enter Balance":"Balance"}
              hasError={errors.balance}
              value={Stores.patientRegistationStore.patientManger?.balance}
              onChange={(balance) => {
                onChange(balance)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  balance,
                })
              }}
            />
            )}
              name="balance"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Account Type"
              name="txtAccountType"
              placeholder={errors.accountType?"Please Enter Account Type":"Account Type"}
              hasError={errors.accountType}
              value={Stores.patientRegistationStore.patientManger?.accountType}
              onChange={(accountType) => {
                onChange(accountType)
                Stores.patientRegistationStore.updatePatientManager({
                  ...Stores.patientRegistationStore.patientManger,
                  accountType,
                })
              }}
            />
            )}
              name="accountType"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.enteredBy ? "Please Enter Entered By" : "Entered By"
                    }
                    hasError={errors.enteredBy}
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
                    <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                      <select
                        value={Stores.patientRegistationStore.patientManger?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const status = e.target.value
                          onChange(status)
                          Stores.patientRegistationStore.updatePatientManager({
                            ...Stores.patientRegistationStore.patientManger,
                            status,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(
                          stores.routerStore.lookupItems,
                          "PATIENT MANGER - STATUS"
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="status"
                  rules={{ required: false }}
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
                      ? "border-red-500  "
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
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "PATIENT MANAGER - ENVIRONMENT").map(
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
      >
        <FeatureComponents.Molecules.PatientMangerList
          data={Stores.patientRegistationStore.listPatientManger}
          totalSize={Stores.patientRegistationStore.listPatientMangerCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
            listAdministrativeDiv: AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Edit/Modify"
          )}
          onDelete={(selectedUser) =>
            props.onModalConfirm && props.onModalConfirm(selectedUser)
          }
          onSelectedRow={(rows) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update recoard!`,
              })
          }}
          // onPageSizeChange={(page, limit) => {
          //   // Stores.enviromentSettingsStore.fetchSessionManagementList(page, limit)
          // }}
        />
      </div>
    </>
  )
})
export default PatientManager
