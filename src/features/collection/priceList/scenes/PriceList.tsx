/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { useForm, Controller } from "react-hook-form"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
import { Stores as CoporateClients } from "@lp/features/collection/corporateClients/stores"
import { Stores as PanelMaster } from "@lp/features/collection/masterPanel/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
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
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.priceListStore.updatePriceList({
        ...Stores.priceListStore.priceList,
        lab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("lab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitPriceList = async () => {
    if (!Stores.priceListStore.checkExitsLabEnvCode) {
      if (
        !Stores.priceListStore.priceList?.existsVersionId &&
        !Stores.priceListStore.priceList?.existsRecordId
      ) {
        Stores.priceListStore.priceListService
          .addPriceList({
            input: {...Stores.priceListStore.priceList,enteredBy: stores.loginStore.login.userId},
          })
          .then((res) => {
            if (res.addPriceList.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.addPriceList.message}`,
              })

            }
          })
      } else if (
        Stores.priceListStore.priceList?.existsVersionId &&
        !Stores.priceListStore.priceList?.existsRecordId
      ) {
        Stores.priceListStore.priceListService
          .versionUpgradePriceList({
            ...Stores.priceListStore.priceList,
            enteredBy: stores.loginStore.login.userId,
          })
          .then((res) => {
            if (res.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.message}`,
              })
            }
          })
      } else if (
        !Stores.priceListStore.priceList?.existsVersionId &&
        Stores.priceListStore.priceList?.existsRecordId
      ) {
        Stores.priceListStore.priceListService
          .duplicatePriceList({
            ...Stores.priceListStore.priceList,
            enteredBy: stores.loginStore.login.userId,
          })
          .then((res) => {
            if (res.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.message}`,
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
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Panel Code"
                    hasError={errors.panelCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.panelCode
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panel = JSON.parse(e.target.value) as any
                        onChange(panel)
                        setValue("panelName", panel.panelName)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          panelCode: panel.panelCode,
                          panelName: panel.panelName,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {PanelMaster.masterPanelStore.listMasterPanel &&
                        PanelMaster.masterPanelStore.listMasterPanel.map(
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Panel Name"
                    name="txtPanelName"
                    disabled={true}
                    value={Stores.priceListStore.priceList?.panelName}
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
                        errors.priority
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const priority = e.target.value as string
                        onChange(priority)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          priority,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                        errors.priceGroup
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const priceGroup = e.target.value as string
                        onChange(priceGroup)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          priceGroup,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                rules={{ required: false }}
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
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          billTo: corporateClientsInfo.corporateCode,
                          clientName: corporateClientsInfo.corporateName,
                          invoiceAc: corporateClientsInfo.invoiceAc,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {CoporateClients.corporateClientsStore.listCorporateClients &&
                        CoporateClients.corporateClientsStore.listCorporateClients.map(
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
              <label className="hidden">
                {Stores.priceListStore.priceList.clientName}
              </label>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Client Name"
                    placeholder="Client Name"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.clientName
                        ? "border-red-500  focus:border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.clientName}
                    disabled={true}
                    value={Stores.priceListStore.priceList?.clientName}
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
                      errors.invoiceAc
                        ? "border-red-500  focus:border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.invoiceAc}
                    disabled={true}
                    value={Stores.priceListStore.priceList?.invoiceAc}
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
                      value={Stores.priceListStore.priceList?.lab}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.lab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const lab = e.target.value as string
                        onChange(lab)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          lab,
                        })
                        // if (
                        //   !Stores.priceListStore.priceList
                        //     ?.existsVersionId
                        // ) {
                        //   Stores.priceListStore.priceListService
                        //     .checkExitsLabEnvCode(
                        //       Stores.priceListStore.priceList
                        //         ?.price|| "",
                        //       Stores.priceListStore.priceList
                        //         ?.environment || "",
                        //       lab
                        //     )
                        //     .then((res) => {
                        //       if (res.success) {
                        //         Stores.priceListStore.updateExistsLabEnvCode(
                        //           true
                        //         )
                        //         LibraryComponents.Atoms.Toast.error({
                        //           message: `😔 ${res.message}`,
                        //         })
                        //       } else
                        //         Stores.priceListStore.updateExistsLabEnvCode(
                        //           false
                        //         )
                        //     })
                        // }
                      }}
                    >
                      <option selected>Select</option>
                      {LabStores.labStore.listLabs.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        )
                      )}
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
                    value={Stores.priceListStore.priceList?.price}
                    onChange={(price) => {
                      onChange(price)
                      Stores.priceListStore.updatePriceList({
                        ...Stores.priceListStore.priceList,
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
                    value={Stores.priceListStore.priceList?.fixedPrice}
                    onChange={(fixedPrice) => {
                      onChange(fixedPrice)
                      Stores.priceListStore.updatePriceList({
                        ...Stores.priceListStore.priceList,
                        fixedPrice,
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
                    placeholder={errors.minSp ? "Please Enter Min SP" : " Min Sp"}
                    hasError={errors.minSp}
                    value={Stores.priceListStore.priceList?.minSp}
                    onChange={(minSp) => {
                      onChange(minSp)
                      Stores.priceListStore.updatePriceList({
                        ...Stores.priceListStore.priceList,
                        minSp,
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
                    placeholder={errors.maxSp ? "Please Enter Min SP" : " Min Sp"}
                    hasError={errors.minSp}
                    value={Stores.priceListStore.priceList?.maxSp}
                    onChange={(maxSp) => {
                      onChange(maxSp)
                      Stores.priceListStore.updatePriceList({
                        ...Stores.priceListStore.priceList,
                        maxSp,
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
                        errors.speicalScheme
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const speicalScheme = e.target.value as string
                        onChange(speicalScheme)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          speicalScheme,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    label="Max SP"
                    name="txtMaxSp"
                    placeholder={
                      errors.schemePrice ? "Please Enter Min SP" : " Min Sp"
                    }
                    hasError={errors.schemePrice}
                    value={Stores.priceListStore.priceList?.maxSp}
                    onChange={(schemePrice) => {
                      onChange(schemePrice)
                      Stores.priceListStore.updatePriceList({
                        ...Stores.priceListStore.priceList,
                        schemePrice,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter Entered By" : "Entered By"
                    }
                    hasError={errors.userId}
                    value={LoginStore.loginStore.login?.userId}
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
                      value={Stores.priceListStore.priceList?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                rules={{ required: false }}
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
                      value={Stores.priceListStore.priceList?.anyScheme}
                      onChange={(anyScheme) => {
                        onChange(anyScheme)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
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
                      value={Stores.priceListStore.priceList?.disOnScheme}
                      onChange={(disOnScheme) => {
                        onChange(disOnScheme)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter Date Creation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={LibraryUtils.moment
                      .unix(Stores.priceListStore.priceList?.dateCreation || 0)
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
                    placeholder={
                      errors.dateActive ? "Please Enter Date Active" : "Date Active"
                    }
                    hasError={errors.dateActive}
                    value={LibraryUtils.moment
                      .unix(Stores.priceListStore.priceList?.dateActive || 0)
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
                    placeholder={
                      errors.dateExpiry ? "Please Enter schedule" : "Date Expire"
                    }
                    hasError={errors.dateExpiry}
                    value={LibraryUtils.moment
                      .unix(Stores.priceListStore.priceList?.dateActive || 0)
                      .format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const dateExpiry = new Date(e.target.value)
                      Stores.priceListStore.updatePriceList({
                        ...Stores.priceListStore.priceList,
                        dateExpiry: LibraryUtils.moment(dateExpiry).unix(),
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
                    value={Stores.priceListStore.priceList?.version}
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
                    value={Stores.priceListStore.priceList?.keyNum}
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={Stores.priceListStore.priceList?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        Stores.priceListStore.updatePriceList({
                          ...Stores.priceListStore.priceList,
                          environment,
                        })
                        // if (
                        //   !Stores.priceListStore.priceList?.existsVersionId
                        // ) {
                        //   Stores.priceListStore.priceListService
                        //     .checkExitsLabEnvCode(
                        //       Stores.priceListStore.priceList?.analyteCode ||
                        //         "",
                        //       environment,
                        //       Stores.priceListStore.priceList?.lab || ""
                        //     )
                        //     .then((res) => {
                        //       if (res.success) {
                        //         Stores.priceListStore.updateExistsLabEnvCode(
                        //           true
                        //         )
                        //         LibraryComponents.Atoms.Toast.error({
                        //           message: `😔 ${res.message}`,
                        //         })
                        //       } else
                        //         Stores.priceListStore.updateExistsLabEnvCode(
                        //           false
                        //         )
                        //     })
                        // }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.priceListStore.priceList?.environment || `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                //rootStore.labStore.clear();
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
            data={Stores.priceListStore.listPriceList || []}
            totalSize={Stores.priceListStore.listPriceListCount}
            extraData={{  
              lookupItems: stores.routerStore.lookupItems,
              listMasterPanel: PanelMaster.masterPanelStore.listMasterPanel,
            }}
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
            //   Stores.priceListStore.fetchListPriceList()
            // }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          // click={(type?: string) => {
          //   if (type === "Delete") {
          //     Stores.masterAnalyteStore.masterAnalyteService
          //       .deleteAnalyteMaster(modalConfirm.id)
          //       .then((res: any) => {
          //         if (res.status === 200) {
          //           LibraryComponents.Atoms.Toast.success({
          //             message: `😊 Analyte master deleted.`,
          //           })
          //           setModalConfirm({ show: false })
          //           Stores.masterAnalyteStore.fetchAnalyteMaster()
          //         }
          //       })
          //   } else if (type === "Update") {
          //     Stores.masterAnalyteStore.masterAnalyteService
          //       .updateSingleFiled(modalConfirm.data)
          //       .then((res: any) => {
          //         if (res.status === 200) {
          //           LibraryComponents.Atoms.Toast.success({
          //             message: `😊 Analyte master updated.`,
          //           })
          //           setModalConfirm({ show: false })
          //           window.location.reload()
          //         }
          //       })
          //   } else if (type === "versionUpgrade") {
          //     Stores.masterAnalyteStore.updateMasterAnalyte({
          //       ...modalConfirm.data,
          //       _id: undefined,
          //       existsVersionId: modalConfirm.data._id,
          //       existsRecordId: undefined,
          //       version: modalConfirm.data.version + 1,
          //       dateActiveFrom: LibraryUtils.moment().unix(),
          //     })
          //     setValue("lab",modalConfirm.data.lab)
          //     setValue("analyteCode",modalConfirm.data.analyteCode)
          //     setValue("analyteName",modalConfirm.data.analyteName)
          //     setValue("environment",modalConfirm.data.environment)
          //     //clearErrors(["lab", "analyteCode", "analyteName", "environment"])
          //   } else if (type === "duplicate") {
          //     Stores.masterAnalyteStore.updateMasterAnalyte({
          //       ...modalConfirm.data,
          //       _id: undefined,
          //       existsVersionId: undefined,
          //       existsRecordId: modalConfirm.data._id,
          //       version: 1,
          //       dateActiveFrom: LibraryUtils.moment().unix(),
          //     })
          //   }
          // }}
          // onClose={() => {
          //   setModalConfirm({ show: false })
          // }}
        />
      </div>
    </>
  )
})

export default PriceList
