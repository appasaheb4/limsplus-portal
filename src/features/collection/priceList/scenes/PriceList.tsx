/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"
import dayjs from "dayjs"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

export const PriceList = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    // clearErrors,
  } = useForm()
  const {
    loginStore,
    labStore,
    corporateClientsStore,
    masterPanelStore,
    priceListStore,
    routerStore,
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      priceListStore.updatePriceList({
        ...priceListStore.priceList,
        lab: loginStore.login.lab,
        environment: loginStore.login.environment,
      })
      setValue("lab", loginStore.login.lab)
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])

  useEffect(()=>{
    const status = routerStore.lookupItems
    .find((fileds) => {
      return fileds.fieldName === "STATUS"
    })
    ?.arrValue?.find((statusItem) => statusItem.code === "A")
  if (status) {
    priceListStore && priceListStore.updatePriceList({
        ...priceListStore.priceList,
        status: status.code as string,
      })
    setValue("status", status.code as string)
  }
  const environment = routerStore.lookupItems.find((fileds)=>{
    return fileds.fieldName === 'ENVIRONMENT'
  })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
  if(environment){
    priceListStore && priceListStore.updatePriceList({
      ...priceListStore.priceList,
      environment: environment.code as string
    })
    setValue("environment",environment.code as string)
  }
  },[routerStore.lookupItems])
  const onSubmitPriceList = async () => {
    if (!priceListStore.checkExitsPriceGEnvLabCode) {
      if (
        !priceListStore.priceList?.existsVersionId &&
        !priceListStore.priceList?.existsRecordId
      ) {
        priceListStore.priceListService
          .addPriceList({
            input: {
              ...priceListStore.priceList,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createPriceList.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createPriceList.message}`,
              })
            }
          })
      } else if (
        priceListStore.priceList?.existsVersionId &&
        !priceListStore.priceList?.existsRecordId
      ) {
        priceListStore.priceListService
          .versionUpgradePriceList({
            input: {
              ...priceListStore.priceList,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradePriceList.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradePriceList.message}`,
              })
            }
          })
      } else if (
        !priceListStore.priceList?.existsVersionId &&
        priceListStore.priceList?.existsRecordId
      ) {
        priceListStore.priceListService
          .duplicatePriceList({
            input: {
              ...priceListStore.priceList,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicatePriceList.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicatePriceList.message}`,
              })
            }
          })
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter diff code`,
      })
    }
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddLab}
          onClick={() => setHideAddLab(!hideAddLab)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "hidden" : "shown")}
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Panel Code"
                    hasError={errors.panelCode}
                  >
                    <select
                      value={priceListStore.priceList.panelCode}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.panelCode ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panel = JSON.parse(e.target.value) as any
                        onChange(panel)
                        setValue("panelName", panel.panelName)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          panelCode: panel.panelCode,
                          panelName: panel.panelName,
                        })
                        if (!priceListStore.priceList?.existsVersionId) {
                          priceListStore.priceListService
                            .checkExitsPriceGEnvLabCode({
                              input: {
                                priceGroup: priceListStore.priceList.priceGroup,
                                env: priceListStore.priceList.environment,
                                lab: priceListStore.priceList?.lab,
                                code: panel.panelCode,
                              },
                            })
                            .then((res) => {
                              console.log({ res })
                              if (res.checkPriceListExistsRecord.success) {
                                priceListStore.updateExitsPriceGEnvLabCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                })
                              } else
                                priceListStore.updateExitsPriceGEnvLabCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {priceListStore.priceList.panelCode || "Select"}
                      </option>
                      {masterPanelStore.listMasterPanel &&
                        masterPanelStore.listMasterPanel.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.panelName} - ${item.panelCode}  `}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="panelCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {priceListStore.checkExitsPriceGEnvLabCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Panel Name"
                    name="txtPanelName"
                    disabled={true}
                    value={priceListStore.priceList?.panelName}
                    placeholder={
                      errors.panelName ? "Please Enter Panel Name" : "Panel Name"
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.panelName ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.panelName}
                  />
                )}
                name="panelName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Priority"
                    hasError={errors.priority}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.priority ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const priority = e.target.value as string
                        onChange(priority)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          priority,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "PRIORIITY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="priority"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Price Group"
                    hasError={errors.priceGroup}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.priceGroup ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const priceGroup = e.target.value as string
                        onChange(priceGroup)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          priceGroup,
                        })
                        if (!priceListStore.priceList?.existsVersionId) {
                          priceListStore.priceListService
                            .checkExitsPriceGEnvLabCode({
                              input: {
                                priceGroup,
                                env: priceListStore.priceList.environment,
                                lab: priceListStore.priceList?.lab,
                                code: priceListStore.priceList.panelCode,
                              },
                            })
                            .then((res) => {
                              console.log({ res })
                              if (res.checkPriceListExistsRecord.success) {
                                priceListStore.updateExitsPriceGEnvLabCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                })
                              } else
                                priceListStore.updateExitsPriceGEnvLabCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "PRICE_GROUP"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="priceGroup"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Bill To"
                    hasError={errors.billTo}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.billTo ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const corporateClientsInfo = JSON.parse(e.target.value)
                        onChange(corporateClientsInfo.corporateCode)
                        console.log({ corporateClientsInfo })

                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          billTo: corporateClientsInfo.corporateCode,
                          clientName: corporateClientsInfo.corporateName,
                          invoiceAc: corporateClientsInfo.invoiceAc,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {corporateClientsStore.listCorporateClients &&
                        corporateClientsStore.listCorporateClients.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.corporateCode} - ${item.corporateName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="billTo"
                rules={{ required: true }}
                defaultValue=""
              />
              <label className="hidden">{priceListStore.priceList.clientName}</label>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Client Name"
                    placeholder="Client Name"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.clientName ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.clientName}
                    disabled={true}
                    value={priceListStore.priceList?.clientName}
                  />
                )}
                name="clientName"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Invoice Ac"
                    placeholder="Invoice Ac"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.invoiceAc ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.invoiceAc}
                    disabled={true}
                    value={priceListStore.priceList?.invoiceAc}
                  />
                )}
                name="invoiceAc"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Lab"
                    hasError={errors.lab}
                  >
                    <select
                      value={priceListStore.priceList?.lab}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.lab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const lab = e.target.value as string
                        onChange(lab)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          lab,
                        })
                        if (!priceListStore.priceList?.existsVersionId) {
                          priceListStore.priceListService
                            .checkExitsPriceGEnvLabCode({
                              input: {
                                priceGroup: priceListStore.priceList.priceGroup,
                                env: priceListStore.priceList.environment,
                                lab,
                                code: priceListStore.priceList.panelCode,
                              },
                            })
                            .then((res) => {
                              console.log({ res })
                              if (res.checkPriceListExistsRecord.success) {
                                priceListStore.updateExitsPriceGEnvLabCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                })
                              } else
                                priceListStore.updateExitsPriceGEnvLabCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {labStore.listLabs.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="lab"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Price"
                    name="txtPrice"
                    placeholder={errors.price ? "Please Enter Price" : "Price"}
                    type="number"
                    hasError={errors.price}
                    value={priceListStore.priceList?.price}
                    onChange={(price) => {
                      onChange(price)
                      priceListStore.updatePriceList({
                        ...priceListStore.priceList,
                        price: parseFloat(price),
                      })
                    }}
                  />
                )}
                name="price"
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
                    label="Fixed Price"
                    name="txtFixedPrice"
                    placeholder={
                      errors.fixedPrice ? "Please Enter Fixed Price" : " Fixed Price"
                    }
                    type="number"
                    hasError={errors.fixedPrice}
                    value={priceListStore.priceList?.fixedPrice}
                    onChange={(fixedPrice) => {
                      onChange(fixedPrice)
                      priceListStore.updatePriceList({
                        ...priceListStore.priceList,
                        fixedPrice: parseFloat(fixedPrice),
                      })
                    }}
                  />
                )}
                name="fixedPrice"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Min SP"
                    name="txtMinSp"
                    type="number"
                    placeholder={errors.minSp ? "Please Enter Min SP" : " Min Sp"}
                    hasError={errors.minSp}
                    value={priceListStore.priceList?.minSp}
                    onChange={(minSp) => {
                      onChange(minSp)
                      priceListStore.updatePriceList({
                        ...priceListStore.priceList,
                        minSp: parseInt(minSp),
                      })
                    }}
                  />
                )}
                name="minSp"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Max SP"
                    name="txtMaxSp"
                    type="number"
                    placeholder={errors.maxSp ? "Please Enter Min SP" : " Min Sp"}
                    hasError={errors.minSp}
                    value={priceListStore.priceList?.maxSp}
                    onChange={(maxSp) => {
                      onChange(maxSp)
                      priceListStore.updatePriceList({
                        ...priceListStore.priceList,
                        maxSp: parseInt(maxSp),
                      })
                    }}
                  />
                )}
                name="maxSp"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Special Scheme"
                    hasError={errors.speicalScheme}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.speicalScheme ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const speicalScheme = e.target.value as string
                        onChange(speicalScheme)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          speicalScheme,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "SPEICAL_SCHEME"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="speicalScheme"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Scheme Price"
                    name="txtMaxSp"
                    placeholder={
                      errors.schemePrice
                        ? "Please Enter Scheme Price"
                        : " Scheme Price"
                    }
                    hasError={errors.schemePrice}
                    value={priceListStore.priceList?.maxSp}
                    onChange={(schemePrice) => {
                      onChange(schemePrice)
                      priceListStore.updatePriceList({
                        ...priceListStore.priceList,
                        schemePrice,
                      })
                    }}
                  />
                )}
                name="schemePrice"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter Entered By" : "Entered By"
                    }
                    hasError={errors.userId}
                    value={loginStore.login?.userId}
                    disabled={true}
                  />
                )}
                name="userId"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Status"
                    hasError={errors.status}
                  >
                    <select
                      value={priceListStore.priceList?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="status"
                rules={{ required: true }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Any Scheme"
                      id="modeAnyScheme"
                      hasError={errors.anyScheme}
                      value={priceListStore.priceList?.anyScheme}
                      onChange={(anyScheme) => {
                        onChange(anyScheme)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          anyScheme,
                        })
                      }}
                    />
                  )}
                  name="anyScheme"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Dis On Scheme"
                      id="modeDisOnScheme"
                      hasError={errors.disOnScheme}
                      value={priceListStore.priceList?.disOnScheme}
                      onChange={(disOnScheme) => {
                        onChange(disOnScheme)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          disOnScheme,
                        })
                      }}
                    />
                  )}
                  name="disOnScheme"
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={priceListStore &&priceListStore.priceList?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        priceListStore.updatePriceList({
                          ...priceListStore.priceList,
                          environment,
                        })
                        if (!priceListStore.priceList?.existsVersionId) {
                          priceListStore.priceListService
                            .checkExitsPriceGEnvLabCode({
                              input: {
                                priceGroup: priceListStore.priceList.priceGroup,
                                env: environment,
                                lab: priceListStore.priceList.lab,
                                code: priceListStore.priceList.panelCode,
                              },
                            })
                            .then((res) => {
                              if (res.checkPriceListExistsRecord.success) {
                                priceListStore.updateExitsPriceGEnvLabCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPriceListExistsRecord.message}`,
                                })
                              } else
                                priceListStore.updateExitsPriceGEnvLabCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : priceListStore.priceList?.environment || `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="environment"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter Date Creation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(priceListStore.priceList?.dateCreation).format(
                      "YYYY-MM-DD"
                    )}
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
                    placeholder={
                      errors.dateActive ? "Please Enter Date Active" : "Date Active"
                    }
                    hasError={errors.dateActive}
                    value={dayjs(priceListStore.priceList?.dateActive).format(
                      "YYYY-MM-DD"
                    )}
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
                    placeholder={
                      errors.dateExpiry ? "Please Enter schedule" : "Date Expire"
                    }
                    hasError={errors.dateExpiry}
                    value={dayjs(priceListStore.priceList?.dateExpire).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) => {
                      const dateExpire = new Date(e.target.value)
                      onChange(dateExpire)
                      priceListStore.updatePriceList({
                        ...priceListStore.priceList,
                        dateExpire,
                      })
                    }}
                  />
                )}
                name="dateExpiry"
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
                    value={priceListStore.priceList?.version}
                    disabled={true}
                  />
                )}
                name="version"
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
              onClick={handleSubmit(onSubmitPriceList)}
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
          <FeatureComponents.Molecules.PriceList
            data={priceListStore.listPriceList || []}
            totalSize={priceListStore.listPriceListCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listCorporateClients: corporateClientsStore.listCorporateClients,
              listMasterPanel:masterPanelStore.listMasterPanel,
              listLabs:labStore.listLabs
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              "Edit/Modify"
            )}
            onDelete={(selectedItem) => setModalConfirm(selectedItem)}
            onSelectedRow={(rows) => {
              setModalConfirm({
                show: true,
                type: "delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update item!`,
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
            // onPageSizeChange={() => {
            //   priceListStore.fetchListPriceList()
            // }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "delete") {
              priceListStore.priceListService
                .deletePriceList({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removePriceList.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removePriceList.message}`,
                    })
                    setModalConfirm({ show: false })
                    priceListStore.fetchListPriceList()
                  }
                })
            } else if (type === "update") {
              priceListStore.priceListService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updatePriceList.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updatePriceList.message}`,
                    })
                    setModalConfirm({ show: false })
                    priceListStore.fetchListPriceList()
                  }
                })
            } else if (type === "versionUpgrade") {
              priceListStore.updatePriceList({
                ...modalConfirm.data,
                _id: undefined,
                __typename: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateCreation: new Date(),
              })
              setValue("panelCode", modalConfirm.data.panelCode)
              setValue("panelName", modalConfirm.data.panelName)
              setValue("billTo", modalConfirm.data.billTo)
              setValue("lab", modalConfirm.data.lab)
              setValue("priceGroup", modalConfirm.data.priceGroup)
              setValue("price", modalConfirm.data.price)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
            } else if (type === "duplicate") {
              priceListStore.updatePriceList({
                ...modalConfirm.data,
                _id: undefined,
                __typename: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateCreation: new Date(),
              })
              setValue("panelCode", modalConfirm.data.panelCode)
              setValue("panelName", modalConfirm.data.panelName)
              setValue("billTo", modalConfirm.data.billTo)
              setValue("lab", modalConfirm.data.lab)
              setValue("priceGroup", modalConfirm.data.priceGroup)
              setValue("price", modalConfirm.data.price)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
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

export default PriceList
