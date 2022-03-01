/* eslint-disable */
import React, { useState, useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from "@/library/components"
import { LabList, PriceListTable } from "../components"
import { lookupItems, lookupValue } from "@/library/utils"
import { useForm, Controller } from "react-hook-form"
import { LabHoc } from "../hoc"
import { useStores } from "@/stores"
import { FormHelper } from "@/helper"
import { RouterFlow } from "@/flows"
import { toJS } from "mobx"

const Lab = LabHoc(
  observer(() => {
    const {
      labStore,
      salesTeamStore,
      routerStore,
      administrativeDivisions,
      loading,
      loginStore,
    } = useStores()

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()

    setValue("environment", labStore.labs?.environment)
    setValue("status", labStore.labs?.status)

    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddLab, setHideAddLab] = useState<boolean>(true)

    const onSubmitLab = () => {
      if (!labStore.checkExitsEnvCode) {
        if (
          labStore.labs?.priceList?.filter((item) => {
            return (
              item.hasOwnProperty("priceGroup") && item.hasOwnProperty("priority")
            )
          }).length > 0
        ) {
          labStore.LabService.addLab({ input: { ...labStore.labs } }).then((res) => {
            if (res.createLab.success) {
              Toast.success({
                message: `😊 ${res.createLab.message}`,
              })
            }
          })
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } else {
          return Toast.warning({
            message: "😔 Price list min 1 recored requied.",
          })
        }
      } else {
        Toast.warning({
          message: "😔 Please enter diff code and environment",
        })
      }
    }

    const tableView = useMemo(
      () => (
        <LabList
          data={labStore.listLabs || []}
          totalSize={labStore.listLabsCount}
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
          onPageSizeChange={(page, limit) => {
            labStore.fetchListLab(page, limit)
          }}
          onFilter={(type, filter, page, limit) => {
            labStore.LabService.filter({
              input: { type, filter, page, limit },
            })
          }}
        />
      ),
      [labStore.listLabs]
    )

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ""} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}
        <div className="mx-auto flex-wrap">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")
            }
          >
            <Grid cols={3}>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Code"
                      id="code"
                      hasError={errors.code}
                      placeholder={errors.code ? "Please Enter Code" : "Code"}
                      value={labStore.labs?.code}
                      onChange={(code) => {
                        onChange(code)
                        labStore.updateLabs({
                          ...labStore.labs,
                          code: code.toUpperCase(),
                        })
                      }}
                      onBlur={(code) => {
                        if (code)
                          labStore.LabService.checkExitsEnvCode({
                            input: {
                              code,
                              env: labStore.labs?.environment,
                            },
                          }).then((res) => {
                            if (res.checkLabExitsEnvCode.success) {
                              labStore.setExitsEnvCode(true)
                              Toast.error({
                                message: `😔 ${res.checkLabExitsEnvCode.message}`,
                              })
                            } else labStore.setExitsEnvCode(false)
                          })
                      }}
                    />
                  )}
                  name="code"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {labStore.checkExitsEnvCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Name"
                      name="name"
                      hasError={errors.name}
                      placeholder={errors.name ? "Please Enter Name" : "Name"}
                      value={labStore.labs?.name}
                      onChange={(name) => {
                        onChange(name)
                        labStore.updateLabs({
                          ...labStore.labs,
                          name: name.toUpperCase(),
                        })
                      }}
                    />
                  )}
                  name="name"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {administrativeDivisions.listAdministrativeDiv && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="Country"
                        id="country"
                        hasError={errors.country}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv,
                              "country"
                            ),
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
                            labStore.updateLabs({
                              ...labStore.labs,
                              country: item.country.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="country"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                )}

                {(labStore.labs.country ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="State"
                        id="state"
                        hasError={errors.state}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!labStore.labs.country}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) => item.country === labStore.labs.country
                              ),
                              "state"
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
                                    country: labStore.labs.country,
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
                            labStore.updateLabs({
                              ...labStore.labs,
                              state: item.state.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="state"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(labStore.labs.district ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="District"
                        id="district"
                        hasError={errors.district}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!labStore.labs.state}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === labStore.labs.country &&
                                  item.state === labStore.labs.state
                              ),
                              "district"
                            ),
                            displayKey: "district",
                            findKey: "district",
                          }}
                          hasError={errors.district}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: labStore.labs.country,
                                    state: labStore.labs.state,
                                    district: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.district)
                            labStore.updateLabs({
                              ...labStore.labs,
                              district: item.district.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="district"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(labStore.labs.district ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="City"
                        id="city"
                        hasError={errors.city}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!labStore.labs.district}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === labStore.labs.country &&
                                  item.state === labStore.labs.state &&
                                  item.district === labStore.labs.district
                              ),
                              "city"
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
                                    country: labStore.labs.country,
                                    state: labStore.labs.state,
                                    district: labStore.labs.district,
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
                            labStore.updateLabs({
                              ...labStore.labs,
                              city: item.city.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="city"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(labStore.labs.city ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="Area"
                        id="area"
                        hasError={errors.area}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!labStore.labs.city}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === labStore.labs.country &&
                                  item.state === labStore.labs.state &&
                                  item.district === labStore.labs.district &&
                                  item.city === labStore.labs.city
                              ),
                              "area"
                            ),
                            selected: labStore.selectedItems?.area,
                            displayKey: "area",
                            findKey: "area",
                          }}
                          hasError={errors.area}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: labStore.labs.country,
                                    state: labStore.labs.state,
                                    district: labStore.labs.district,
                                    city: labStore.labs.city,
                                    area: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.city)
                            labStore.updateLabs({
                              ...labStore.labs,
                              area: item.area.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="area "
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(labStore.labs.area ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="Postal Code"
                        id="postalCode"
                        hasError={errors.postalCode}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!labStore.labs.area}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === labStore.labs.country &&
                                  item.state === labStore.labs.state &&
                                  item.district === labStore.labs.district &&
                                  item.city === labStore.labs.city &&
                                  item.area === labStore.labs.area
                              ),
                              "postalCode"
                            ),
                            displayKey: "postalCode",
                            findKey: "postalCode",
                          }}
                          hasError={errors.postalCode}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: labStore.labs.country,
                                    state: labStore.labs.state,
                                    district: labStore.labs.district,
                                    city: labStore.labs.city,
                                    area: labStore.labs.area,
                                    postalCode: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.postalCode)
                            labStore.updateLabs({
                              ...labStore.labs,
                              postalCode: item,
                            })
                            administrativeDivisions.updateAdministrativeDivList(
                              administrativeDivisions.listAdministrativeDivCopy
                            )
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="postalCode"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Delivery Type"
                      hasError={errors.deliveryType}
                    >
                      <select
                        value={labStore.labs?.deliveryType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.deliveryType
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const deliveryType = e.target.value
                          onChange(deliveryType)
                          labStore.updateLabs({
                            ...labStore.labs,
                            deliveryType,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, "DELIVERY_TYPE").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="deliveryType"
                  rules={{ required: false }}
                  defaultValue=""
                />
              </List>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Sales Territory"
                      hasError={errors.salesTerritory}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.salesTerritory
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const salesTerritory = e.target.value
                          onChange(salesTerritory)
                          labStore.updateLabs({
                            ...labStore.labs,
                            salesTerritory,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {salesTeamStore.listSalesTeam &&
                          _.union(
                            _.map(salesTeamStore.listSalesTeam, "salesTerritory")
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="salesTerritory"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Lab Licence"
                      placeholder={
                        errors.labLicence ? "Please Enter labLicence" : "Lab Licence"
                      }
                      hasError={errors.labLicence}
                      value={labStore.labs?.labLicence}
                      onChange={(labLicence) => {
                        onChange(labLicence)
                        labStore.updateLabs({
                          ...labStore.labs,
                          labLicence,
                        })
                      }}
                    />
                  )}
                  name="labLicence"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Director"
                      placeholder={
                        errors.director ? "Please Enter director" : "Director"
                      }
                      hasError={errors.director}
                      value={labStore.labs?.director}
                      onChange={(director) => {
                        onChange(director)
                        labStore.updateLabs({
                          ...labStore.labs,
                          director,
                        })
                      }}
                    />
                  )}
                  name="director"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Physician"
                      placeholder={
                        errors.physician ? "Please Enter physician" : "Physician"
                      }
                      hasError={errors.physician}
                      value={labStore.labs?.physician}
                      onChange={(physician) => {
                        onChange(physician)
                        labStore.updateLabs({
                          ...labStore.labs,
                          physician,
                        })
                      }}
                    />
                  )}
                  name="physician"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      type="number"
                      label="Mobile Number"
                      placeholder={
                        errors.mobileNo ? "Please Enter mobileNo" : "Mobile Number"
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={errors.mobileNo}
                      value={labStore.labs?.mobileNo}
                      onChange={(mobileNo) => {
                        onChange(mobileNo)
                        labStore.updateLabs({
                          ...labStore.labs,
                          mobileNo,
                        })
                      }}
                    />
                  )}
                  name="mobileNo"
                  rules={{ required: false, pattern: FormHelper.patterns.mobileNo }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      type="number"
                      label="Contact Number"
                      placeholder={
                        errors.contactNo
                          ? "Please Enter contactNo"
                          : "Contact Number"
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={errors.contactNo}
                      value={labStore.labs?.contactNo}
                      onChange={(contactNo) => {
                        onChange(contactNo)
                        labStore.updateLabs({
                          ...labStore.labs,
                          contactNo,
                        })
                      }}
                    />
                  )}
                  name="contactNo"
                  rules={{ required: false, pattern: FormHelper.patterns.mobileNo }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Speciality"
                      hasError={errors.speciality}
                    >
                      <select
                        value={labStore.labs?.speciality}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.speciality ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const speciality = e.target.value
                          onChange(speciality)
                          labStore.updateLabs({
                            ...labStore.labs,
                            speciality,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, "SPECIALITY").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="speciality"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Lab type" hasError={errors.labType}>
                      <select
                        value={labStore.labs?.labType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.labType ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const labType = e.target.value
                          onChange(labType)
                          labStore.updateLabs({
                            ...labStore.labs,
                            labType,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, "LAB_TYPE").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="labType"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Default Lab"
                      hasError={errors.defaultLab}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by code or name"
                        data={{
                          list: labStore?.listLabs,
                          displayKey: ["code", "name"],
                        }}
                        hasError={errors.defaultLab}
                        onFilter={(value: string) => {
                          labStore.LabService.filterByFields({
                            input: {
                              filter: {
                                fields: ["code", "name"],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
                        onSelect={(item) => {
                          onChange(item.code)
                          labStore.updateLabs({
                            ...labStore.labs,
                            defaultLab: item.code,
                          })
                          labStore.updateLabList(labStore.listLabsCopy)
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="defaultLab"
                  rules={{ required: true }}
                  defaultValue={labStore.listLabs}
                />
                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Report Format"
                        hasError={errors.reportFormat}
                        value={labStore.labs?.reportFormat}
                        onChange={(reportFormat) => {
                          onChange(reportFormat)
                          labStore.updateLabs({
                            ...labStore.labs,
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
                      <Form.Toggle
                        label="Print Label"
                        hasError={errors.printLable}
                        value={labStore.labs?.printLable}
                        onChange={(printLable) => {
                          onChange(printLable)
                          labStore.updateLabs({
                            ...labStore.labs,
                            printLable,
                          })
                        }}
                      />
                    )}
                    name="printLable"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </Grid>
              </List>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Clock
                      label="Opening Time"
                      hasError={errors.openingTime}
                      value={labStore.labs?.openingTime}
                      onChange={(openingTime) => {
                        onChange(openingTime)
                        labStore.updateLabs({
                          ...labStore.labs,
                          openingTime,
                        })
                      }}
                    />
                  )}
                  name="openingTime"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Clock
                      label="Closing Time"
                      hasError={errors.closingTime}
                      value={labStore.labs?.closingTime}
                      onChange={(closingTime) => {
                        onChange(closingTime)
                        labStore.updateLabs({
                          ...labStore.labs,
                          closingTime,
                        })
                      }}
                    />
                  )}
                  name="closingTime"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Email"
                      placeholder={errors.email ? "Please Enter Email" : "Email"}
                      hasError={errors.email}
                      value={labStore.labs?.email}
                      onChange={(email) => {
                        onChange(email)
                        labStore.updateLabs({
                          ...labStore.labs,
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
                    <Form.InputFile
                      label="Lab logo"
                      placeholder={errors.labLog ? "Please Enter labLog" : "LabLog"}
                      hasError={errors.labLog}
                      onChange={(e) => {
                        const labLog = e.target.files[0]
                        onChange(labLog)
                        labStore.updateLabs({
                          ...labStore.labs,
                          labLog,
                        })
                      }}
                    />
                  )}
                  name="labLog"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.MultilineInput
                      rows={2}
                      label="FYI line"
                      placeholder={
                        errors.fyiLine ? "Please Enter fyiLine" : "FYI Line"
                      }
                      hasError={errors.fyiLine}
                      value={labStore.labs?.fyiLine}
                      onChange={(fyiLine) => {
                        onChange(fyiLine)
                        labStore.updateLabs({
                          ...labStore.labs,
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
                    <Form.MultilineInput
                      rows={2}
                      label="Work line"
                      placeholder={
                        errors.workLine ? "Please Enter workLine" : "WorkLine"
                      }
                      hasError={errors.workLine}
                      value={labStore.labs?.workLine}
                      onChange={(workLine) => {
                        onChange(workLine)
                        labStore.updateLabs({
                          ...labStore.labs,
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
                    <Form.InputWrapper label="Status" hasError={errors.status}>
                      <select
                        value={labStore.labs.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const status = e.target.value
                          onChange(status)
                          labStore.updateLabs({
                            ...labStore.labs,
                            status,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, "STATUS").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="status"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Environment"
                      hasError={errors.environment}
                    >
                      <select
                        value={labStore.labs?.environment}
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
                          labStore.updateLabs({
                            ...labStore.labs,
                            environment,
                          })
                          labStore.LabService.checkExitsEnvCode({
                            input: {
                              code: labStore.labs?.code,
                              env: environment,
                            },
                          }).then((res) => {
                            if (res.checkLabExitsEnvCode.success) {
                              labStore.setExitsEnvCode(true)
                              Toast.error({
                                message: `😔 ${res.checkLabExitsEnvCode.message}`,
                              })
                            } else labStore.setExitsEnvCode(false)
                          })
                        }}
                      >
                        <option selected>
                          {loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? `Select`
                            : labStore.labs?.environment || `Select`}
                        </option>
                        {lookupItems(routerStore.lookupItems, "ENVIRONMENT").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="environment"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Grid cols={4}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Auto Release"
                        hasError={errors.autoRelease}
                        value={labStore.labs?.autoRelease}
                        onChange={(autoRelease) => {
                          onChange(autoRelease)
                          labStore.updateLabs({
                            ...labStore.labs,
                            autoRelease,
                          })
                        }}
                      />
                    )}
                    name="autoRelease"
                    rules={{ required: false }}
                    defaultValue=""
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Require Reveiving in Lab"
                        hasError={errors.requireReceveInLab}
                        value={labStore.labs?.requireReceveInLab}
                        onChange={(requireReceveInLab) => {
                          onChange(requireReceveInLab)
                          labStore.updateLabs({
                            ...labStore.labs,
                            requireReceveInLab,
                          })
                        }}
                      />
                    )}
                    name="requireReceveInLab"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Require Scain In"
                        hasError={errors.requireScainIn}
                        value={labStore.labs?.requireScainIn}
                        onChange={(requireScainIn) => {
                          onChange(requireScainIn)
                          labStore.updateLabs({
                            ...labStore.labs,
                            requireScainIn,
                          })
                        }}
                      />
                    )}
                    name="requireScainIn"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Routing Dept"
                        hasError={errors.routingDept}
                        value={labStore.labs?.routingDept}
                        onChange={(routingDept) => {
                          onChange(routingDept)
                          labStore.updateLabs({
                            ...labStore.labs,
                            routingDept,
                          })
                        }}
                      />
                    )}
                    name="routingDept"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </Grid>
              </List>
            </Grid>
            <List direction="row" space={3} align="center">
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper label="Price List" hasError={errors.priceList}>
                    <PriceListTable />
                  </Form.InputWrapper>
                )}
                name="priceList"
                rules={{ required: false }}
                defaultValue=""
              />
            </List>
            <br />
            <List direction="row" space={3} align="center">
              <Buttons.Button
                size="medium"
                type="solid"
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitLab)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size="medium"
                type="outline"
                icon={Svg.Remove}
                onClick={() => {
                  window.location.reload()
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className="p-2 rounded-lg shadow-xl overflow-auto">{tableView}</div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                labStore.LabService.deleteLab({
                  input: { id: modalConfirm.id },
                }).then((res: any) => {
                  if (res.removeLab.success) {
                    Toast.success({
                      message: `😊 ${res.removeLab.message}`,
                    })
                    setModalConfirm({ show: false })
                    labStore.fetchListLab()
                  }
                })
              } else if (type === "Update") {
                labStore.LabService.updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  if (res.updateLab.success) {
                    Toast.success({
                      message: `😊 ${res.updateLab.message}`,
                    })
                    setModalConfirm({ show: false })
                    labStore.fetchListLab()
                  }
                })
              } else {
                labStore.LabService.updateLabImages({
                  input: {
                    _id: modalConfirm.data.id,
                    labLog: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  if (res.updateLabImages.success) {
                    Toast.success({
                      message: `😊 ${res.updateLabImages.message}`,
                    })
                    setModalConfirm({ show: false })
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
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
)

export default Lab
