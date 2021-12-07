/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"

import "@lp/library/assets/css/accordion.css"
import { useStores } from "@lp/stores"
import { toJS } from "mobx"
import { RouterFlow } from "@lp/flows"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"

interface PatientManagerProps {
  onModalConfirm?: (item: any) => void
}

const PatientManager = observer((props: PatientManagerProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const {
    loading,
    loginStore,
    patientManagerStore,
    routerStore,
    administrativeDivisions,
    doctorsStore,
  } = useStores()

  const onSubmitPatientManager = () => {
    patientManagerStore.patientManagerService
      .addPatientManager({
        input: {
          ...patientManagerStore.patientManger,
          documentType: "patientManager",
        },
      })
      .then((res) => {
        if (res.createPatientManager.success) {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 ${res.createPatientManager.message}`,
          })
        }
        // setTimeout(() => {
        //   // bannerStore.fetchListBanner()
        //   window.location.reload()
        // }, 1000)
      })
  }
  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      patientManagerStore.updatePatientManager({
        ...patientManagerStore.patientManger,
        extraData: {
          ...patientManagerStore.patientManger?.extraData,
          environment: loginStore.login.environment,
        },
      })
      setValue("environment", loginStore.login.environment)
    }
    patientManagerStore.updatePatientManager({
      ...patientManagerStore.patientManger,
      extraData: {
        ...patientManagerStore.patientManger?.extraData,
        enteredBy: loginStore.login.userId,
      },
    })
  }, [loginStore.login])

  return (
    <>
      <div className="p-2 rounded-lg shadow-xl">
        <LibraryComponents.Atoms.Grid cols={2}>
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
                  placeholder={errors.pId ? "Please enter pid" : "Pid"}
                  hasError={errors.pId}
                  value={patientManagerStore.patientManger?.pId}
                  onChange={(pId) => {
                    onChange(pId)
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
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
                  placeholder={
                    errors.txtMobileNo ? "Please Enter MobileNo" : "Mobile No"
                  }
                  hasError={errors.txtMobileNo}
                  type="number"
                  value={patientManagerStore.patientManger?.mobileNo}
                  onChange={(mobileNo) => {
                    onChange(mobileNo)
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
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
                  label="Bithdate"
                  placeholder={
                    errors.birthDate ? "Please Enter BirthDate" : "BirthDate"
                  }
                  hasError={errors.birthDate}
                  value={dayjs(patientManagerStore.patientManger?.birthDate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={(e) => {
                    let birthDate = new Date(e.target.value)
                    onChange(birthDate)
                    const formatDate = dayjs(birthDate).format("YYYY-MM-DD HH:mm")
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
                      birthDate: new Date(formatDate),
                    })
                  }}
                />
              )}
              name="birthDate"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Title"
                  hasError={errors.title}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.title ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const title = e.target.value
                      onChange(title)
                      patientManagerStore.updatePatientManager({
                        ...patientManagerStore.patientManger,
                        title,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      routerStore.lookupItems,
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
                  placeholder={
                    errors.firstName ? "Please Enter FirstName" : "First Name"
                  }
                  hasError={errors.firstName}
                  value={patientManagerStore.patientManger?.firstName}
                  onChange={(firstName) => {
                    onChange(firstName)
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
                      firstName: firstName.toUpperCase(),
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
                  placeholder={
                    errors.middleName ? "Please Enter MiddleName" : "Middle Name"
                  }
                  hasError={errors.middleName}
                  value={patientManagerStore.patientManger?.middleName}
                  onChange={(middleName) => {
                    onChange(middleName)
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
                      middleName: middleName.toUpperCase(),
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
                  placeholder={
                    errors.lastName ? "Please Enter LastName" : "Last Name"
                  }
                  hasError={errors.lastName}
                  value={patientManagerStore.patientManger?.lastName}
                  onChange={(lastName) => {
                    onChange(lastName)
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
                      lastName: lastName.toUpperCase(),
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
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Sex"
                  hasError={errors.sex}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.sex ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const sex = e.target.value
                      onChange(sex)
                      patientManagerStore.updatePatientManager({
                        ...patientManagerStore.patientManger,
                        sex,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      routerStore.lookupItems,
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
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Species"
                  hasError={errors.species}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.species ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const species = e.target.value as string
                      onChange(species)
                      patientManagerStore.updatePatientManager({
                        ...patientManagerStore.patientManger,
                        species,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      routerStore.lookupItems,
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
                  placeholder={errors.breed ? "Please Enter Breed" : "Breed"}
                  hasError={errors.breed}
                  value={patientManagerStore.patientManger?.breed}
                  onChange={(breed) => {
                    onChange(breed)
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
                      breed,
                    })
                  }}
                />
              )}
              name="breed"
              rules={{ required: false }}
              defaultValue=""
            />
            {doctorsStore.listDoctors && (
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
                        const usualDoctor = e.target.value
                        onChange(usualDoctor)
                        patientManagerStore.updatePatientManager({
                          ...patientManagerStore.patientManger,
                          usualDoctor,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {doctorsStore.listDoctors.map((item: any, index: number) => (
                        <option key={index} value={item.doctorCode}>
                          {`${item.doctorName} - ${item.doctorCode}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="usualDoctor"
                rules={{ required: true }}
                defaultValue=""
              />
            )}

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="History"
                  hasError={errors.history}
                  value={patientManagerStore.patientManger?.history}
                  onChange={(history) => {
                    onChange(history)
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
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
        </LibraryComponents.Atoms.Grid>
      </div>
      <br />

      <div className="extra" style={{ border: "1px solid yellow" }}>
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>EXTRA DATA</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <>
                <LibraryComponents.Atoms.Grid cols={2}>
                  <LibraryComponents.Atoms.List
                    direction="col"
                    space={4}
                    justify="stretch"
                    fill
                  >
                    {administrativeDivisions.listAdministrativeDiv && (
                      <Controller
                        control={control}
                        render={({ field: { onChange } }) => (
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="Country"
                            id="country"
                            hasError={errors.country}
                          >
                            <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                              loader={loading}
                              data={{
                                list: administrativeDivisions.listAdministrativeDiv,
                                displayKey: "country",
                                findKey: "country",
                              }}
                              hasError={errors.country}
                              onFilter={(value: string) => {
                                administrativeDivisions.administrativeDivisionsService.filter(
                                  {
                                    input: {
                                      filter: {
                                        type: "search",
                                        ["country"]: value,
                                      },
                                      page: 0,
                                      limit: 10,
                                    },
                                  }
                                )
                              }}
                              onSelect={(item) => {
                                onChange(item.country)
                                onChange(item.country)
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger?.extraData,
                                    country: item.country,
                                  },
                                })
                              }}
                            />
                          </LibraryComponents.Atoms.Form.InputWrapper>
                        )}
                        name="country"
                        rules={{ required: false }}
                        defaultValue=""
                      />
                    )}
                    {(patientManagerStore.patientManger.extraData?.country ||
                      administrativeDivisions.listAdministrativeDiv) && (
                      <Controller
                        control={control}
                        render={({ field: { onChange } }) => (
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="State"
                            id="state"
                            hasError={errors.state}
                          >
                            <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                              loader={loading}
                              disable={
                                !patientManagerStore.patientManger.extraData?.country
                              }
                              data={{
                                list: administrativeDivisions.listAdministrativeDiv.filter(
                                  (item) =>
                                    item.country ===
                                    patientManagerStore.patientManger.extraData
                                      ?.country
                                ),
                                displayKey: "state",
                                findKey: "state",
                              }}
                              hasError={errors.state}
                              onFilter={(value: string) => {
                                administrativeDivisions.administrativeDivisionsService.filter(
                                  {
                                    input: {
                                      filter: {
                                        type: "search",
                                        country:
                                          patientManagerStore.patientManger.extraData
                                            ?.country,
                                        state: value,
                                      },
                                      page: 0,
                                      limit: 10,
                                    },
                                  }
                                )
                              }}
                              onSelect={(item) => {
                                onChange(item.state)
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger?.extraData,
                                    state: item.state,
                                  },
                                })
                              }}
                            />
                          </LibraryComponents.Atoms.Form.InputWrapper>
                        )}
                        name="state"
                        rules={{ required: false }}
                        defaultValue=""
                      />
                    )}

                    {(patientManagerStore.patientManger.extraData?.state ||
                      administrativeDivisions.listAdministrativeDiv) && (
                      <Controller
                        control={control}
                        render={({ field: { onChange } }) => (
                          <LibraryComponents.Atoms.Form.InputWrapper
                            label="City"
                            id="city"
                            hasError={errors.city}
                          >
                            <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                              loader={loading}
                              disable={
                                !patientManagerStore.patientManger.extraData?.state
                              }
                              data={{
                                list: administrativeDivisions.listAdministrativeDiv.filter(
                                  (item) =>
                                    item.country ===
                                      patientManagerStore.patientManger.extraData
                                        ?.country &&
                                    item.state ===
                                      patientManagerStore.patientManger.extraData
                                        ?.state
                                ),
                                displayKey: "city",
                                findKey: "city",
                              }}
                              hasError={errors.city}
                              onFilter={(value: string) => {
                                administrativeDivisions.administrativeDivisionsService.filter(
                                  {
                                    input: {
                                      filter: {
                                        type: "search",
                                        country:
                                          patientManagerStore.patientManger.extraData
                                            ?.country,
                                        state:
                                          patientManagerStore.patientManger.extraData
                                            ?.state,
                                        city: value,
                                      },
                                      page: 0,
                                      limit: 10,
                                    },
                                  }
                                )
                              }}
                              onSelect={(item) => {
                                onChange(item.city)
                                patientManagerStore.updatePatientManager({
                                  ...patientManagerStore.patientManger,
                                  extraData: {
                                    ...patientManagerStore.patientManger?.extraData,
                                    city: item.city,
                                  },
                                })
                              }}
                            />
                          </LibraryComponents.Atoms.Form.InputWrapper>
                        )}
                        name="city"
                        rules={{ required: false }}
                        defaultValue=""
                      />
                    )}

                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.MultilineInput
                          rows={2}
                          label="Address"
                          placeholder={
                            errors.address ? "Please Enter Address" : "Address"
                          }  
                          hasError={errors.address}
                          value={
                            patientManagerStore.patientManger?.extraData?.address
                          }
                          onChange={(address) => {
                            onChange(address)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                address,
                              },
                            })
                          }}
                        />
                      )}
                      name="address"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          type="number"
                          label="Postcode"
                          placeholder={
                            errors.postcode ? "Please Enter Postcode" : "Postcode"
                          }
                          hasError={errors.postcode}
                          value={
                            patientManagerStore.patientManger?.extraData?.postcode
                          }
                          onChange={(postcode) => {
                            onChange(postcode)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                postcode,
                              },
                            })
                          }}
                        />
                      )}
                      name="postcode"
                      rules={{ required: false }}
                      defaultValue=""
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Email"
                          name="txtEmail"
                          placeholder={errors.email ? "Please Enter Email" : "Email"}
                          hasError={errors.email}
                          type="mail"
                          value={patientManagerStore.patientManger?.extraData?.email}
                          onChange={(email) => {
                            onChange(email)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                email,
                              },
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
                        <LibraryComponents.Atoms.Form.Input
                          label="WhatsApp Number"
                          name="txtWhatsappNumber"
                          placeholder={
                            errors.whatsappNumber
                              ? "Please Enter WhatsappNumber"
                              : "WhatsAppNumber"
                          }
                          hasError={errors.whatsappNumber}
                          value={
                            patientManagerStore.patientManger?.extraData
                              ?.whatsappNumber
                          }
                          onChange={(whatsappNumber) => {
                            onChange(whatsappNumber)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                whatsappNumber,
                              },
                            })
                          }}
                        />
                      )}
                      name="whatsappNumber"
                      rules={{ required: false }}
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
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                photograph,
                              },
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
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                signature,
                              },
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
                          placeholder={
                            errors.bloodGroup
                              ? "Please Enter Blood Group"
                              : "BloodGroup"
                          }
                          hasError={errors.bloodGroup}
                          value={
                            patientManagerStore.patientManger?.extraData?.bloodGroup
                          }
                          onChange={(bloodGroup) => {
                            onChange(bloodGroup)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                bloodGroup,
                              },
                            })
                          }}
                        />
                      )}
                      name="bloodGroup"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Height"
                          placeholder={
                            errors.height ? "Please Enter Height" : "Height"
                          }
                          hasError={errors.height}
                          value={
                            patientManagerStore.patientManger?.extraData?.height
                          }
                          onChange={(height) => {
                            onChange(height)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                height,
                              },
                            })
                          }}
                        />
                      )}
                      name="height"
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
                          label="Weight"
                          placeholder={
                            errors.weight ? "Please Enter Weight" : "Weight"
                          }
                          hasError={errors.weight}
                          value={
                            patientManagerStore.patientManger?.extraData?.weight
                          }
                          onChange={(weight) => {
                            onChange(weight)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                weight,
                              },
                            })
                          }}
                        />
                      )}
                      name="weight"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Follow Up"
                          placeholder={
                            errors.followUp ? "Please Enter FollowUp" : "FollowUp"
                          }
                          hasError={errors.followUp}
                          value={
                            patientManagerStore.patientManger?.extraData?.followUp
                          }
                          onChange={(followUp) => {
                            onChange(followUp)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                followUp,
                              },
                            })
                          }}
                        />
                      )}
                      name="followUp"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Comments"
                          placeholder={
                            errors.comments ? "Please Enter FollowUp" : "FollowUp"
                          }
                          hasError={errors.comments}
                          value={
                            patientManagerStore.patientManger?.extraData?.comments
                          }
                          onChange={(comments) => {
                            onChange(comments)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                comments,
                              },
                            })
                          }}
                        />
                      )}
                      name="comments"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="FyiLine"
                          placeholder={
                            errors.fyiLine ? "Please Enter FyiLine" : "Fyiline"
                          }
                          hasError={errors.fyiLine}
                          value={
                            patientManagerStore.patientManger?.extraData?.fyiLine
                          }
                          onChange={(fyiLine) => {
                            onChange(fyiLine)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                fyiLine,
                              },
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
                          label="Balance"
                          placeholder={
                            errors.balance ? "Please Enter Balance" : "Balance"
                          }
                          hasError={errors.balance}
                          value={
                            patientManagerStore.patientManger?.extraData?.balance
                          }
                          onChange={(balance) => {
                            onChange(balance)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                balance,
                              },
                            })
                          }}
                        />
                      )}
                      name="balance"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Account Type"
                          placeholder={
                            errors.accountType
                              ? "Please Enter Account Type"
                              : "Account Type"
                          }
                          hasError={errors.accountType}
                          value={
                            patientManagerStore.patientManger?.extraData?.accountType
                          }
                          onChange={(accountType) => {
                            onChange(accountType)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                accountType,
                              },
                            })
                          }}
                        />
                      )}
                      name="accountType"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Entered By"
                          placeholder={
                            errors.enteredBy
                              ? "Please Enter Entered By"
                              : "Entered By"
                          }
                          hasError={errors.enteredBy}
                          value={loginStore.login?.userId}
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
                            value={
                              patientManagerStore.patientManger?.extraData?.status
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.status ? "border-red-500  " : "border-gray-300"
                            } rounded-md`}
                            onChange={(e) => {
                              const status = e.target.value
                              onChange(status)
                              patientManagerStore.updatePatientManager({
                                ...patientManagerStore.patientManger,
                                extraData: {
                                  ...patientManagerStore.patientManger?.extraData,
                                  status,
                                },
                              })
                            }}
                          >
                            <option selected>Select</option>
                            {LibraryUtils.lookupItems(
                              routerStore.lookupItems,
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
                            value={
                              patientManagerStore.patientManger?.extraData
                                ?.environment
                            }
                            disabled={
                              loginStore.login &&
                              loginStore.login.role !== "SYSADMIN"
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
                              patientManagerStore.updatePatientManager({
                                ...patientManagerStore.patientManger,
                                extraData: {
                                  ...patientManagerStore.patientManger?.extraData,
                                  environment,
                                },
                              })
                            }}
                          >
                            <option selected>
                              {loginStore.login &&
                              loginStore.login.role !== "SYSADMIN"
                                ? `Select`
                                : patientManagerStore.patientManger?.extraData
                                    ?.environment || `Select`}
                            </option>
                            {LibraryUtils.lookupItems(
                              routerStore.lookupItems,
                              "PATIENT MANAGER - ENVIRONMENT"
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {`${item.value} - ${item.code}`}
                              </option>
                            ))}
                          </select>
                        </LibraryComponents.Atoms.Form.InputWrapper>
                      )}
                      name="environment"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                  </LibraryComponents.Atoms.List>
                  <LibraryComponents.Atoms.Grid cols={4}>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Toggle
                          label="Is Mobile WhatsApp"
                          id="modeIsMobileAndWhatsApp"
                          hasError={errors.isMobileAndWhatsApp}
                          value={
                            patientManagerStore.patientManger?.extraData
                              ?.isMobileAndWhatsApp
                          }
                          onChange={(isMobileAndWhatsApp) => {
                            onChange(isMobileAndWhatsApp)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                isMobileAndWhatsApp,
                              },
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
                          label="Confidental"
                          id="modeConfidental"
                          hasError={errors.confidental}
                          value={
                            patientManagerStore.patientManger?.extraData?.confidental
                          }
                          onChange={(confidental) => {
                            onChange(confidental)
                            patientManagerStore.updatePatientManager({
                              ...patientManagerStore.patientManger,
                              extraData: {
                                ...patientManagerStore.patientManger?.extraData,
                                confidental,
                              },
                            })
                          }}
                        />
                      )}
                      name="confidental"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                  </LibraryComponents.Atoms.Grid>
                </LibraryComponents.Atoms.Grid>
              </>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
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
          data={patientManagerStore.listPatientManger}
          totalSize={patientManagerStore.listPatientMangerCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listAdministrativeDiv: administrativeDivisions.listAdministrativeDiv,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
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
      <hr />
      <br />
      <div className="extra" style={{ border: "1px solid yellow" }}>
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>EXTRA DATA TABLE</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <>
                <div
                  className="p-2 rounded-lg shadow-xl overflow-scroll"
                >
                  <FeatureComponents.Molecules.ExtraDataPatientManagerList
                    data={patientManagerStore.listPatientManger}
                    totalSize={patientManagerStore.listPatientMangerCount}
                    extraData={{
                      lookupItems: routerStore.lookupItems,
                      listAdministrativeDiv:
                        administrativeDivisions.listAdministrativeDiv,
                    }}
                    isDelete={RouterFlow.checkPermission(
                      toJS(routerStore.userPermission),
                      "Delete"
                    )}
                    isEditModify={RouterFlow.checkPermission(
                      toJS(routerStore.userPermission),
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
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
})
export default PatientManager
