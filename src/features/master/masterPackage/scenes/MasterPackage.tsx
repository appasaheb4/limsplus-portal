/* eslint-disable */
import React, { useState, useMemo } from "react"
import { observer } from "mobx-react"
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
  AutoCompleteCheckMultiFilterKeys,
} from "@/library/components"
import { lookupItems, moment, lookupValue } from "@/library/utils"
import { PackageMasterList } from "../components"

import { useForm, Controller } from "react-hook-form"
import { MasterPackageHOC } from "../hoc"
import { useStores } from "@/stores"

import { RouterFlow } from "@/flows"
import { toJS } from "mobx"

const MasterPackage = MasterPackageHOC(
  observer(() => {
    const {
      loginStore,
      masterPackageStore,
      labStore,
      masterPanelStore,
      routerStore,
      loading,
    } = useStores()
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()

    setValue("lab", loginStore.login.lab)
    setValue("environment", loginStore.login.environment)
    setValue("status", masterPackageStore.masterPackage?.status)
    setValue("environment", masterPackageStore.masterPackage?.environment)

    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddLab, setHideAddLab] = useState<boolean>(true)
    const [arrPackageItems, setArrPackageItems] = useState<Array<any>>()
    const [arrPanelItems, setArrPanelItems] = useState<Array<any>>()

    const getServiceTypes = (fileds: any) => {
      if (fileds) {
        const finalArray = fileds.arrValue.filter((fileds) => {
          if (fileds.code === "K" || fileds.code === "M") return fileds
        })
        return finalArray
      }
      return []
    }
    const onSubmitMasterPackage = () => {
      if (!masterPackageStore.checkExitsLabEnvCode) {
        if (
          !masterPackageStore.masterPackage?.existsVersionId &&
          !masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .addPackageMaster({
              input: {
                ...masterPackageStore.masterPackage,
                enteredBy: loginStore.login.userId,
              },
            })
            .then((res) => {
              if (res.createPackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.createPackageMaster.message}`,
                })
              }
            })
        } else if (
          masterPackageStore.masterPackage?.existsVersionId &&
          !masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .versionUpgradePackageMaster({
              input: {
                ...masterPackageStore.masterPackage,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then((res) => {
              if (res.versionUpgradePackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.versionUpgradePackageMaster.message}`,
                })
              }
            })
        } else if (
          !masterPackageStore.masterPackage?.existsVersionId &&
          masterPackageStore.masterPackage?.existsRecordId
        ) {
          masterPackageStore.masterPackageService
            .duplicatePackageMaster({
              input: {
                ...masterPackageStore.masterPackage,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then((res) => {
              if (res.duplicatePackageMaster.success) {
                Toast.success({
                  message: `😊 ${res.duplicatePackageMaster.message}`,
                })
              }
            })
        }
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        Toast.warning({
          message: `😔 Please enter diff code`,
        })
      }
    }

    const tableView = useMemo(
      () => (
        <PackageMasterList
          data={masterPackageStore.listMasterPackage || []}
          totalSize={masterPackageStore.listMasterPackageCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
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
              body: `Update lab!`,
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
          onPageSizeChange={(page, limit) => {
            masterPackageStore.fetchPackageMaster(page, limit)
          }}
          onFilter={(type, filter, page, limit) => {
            masterPackageStore.masterPackageService.filter({
              input: { type, filter, page, limit },
            })
          }}
        />
      ),
      [masterPackageStore.listMasterPackage]
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
              "p-2 rounded-lg shadow-xl " + (hideAddLab ? "hidden" : "shown")
            }
          >
            <Grid cols={2}>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Lab" hasError={errors.lab}>
                      <AutoCompleteFilterSingleSelect
                        placeholder="Search by name"
                        loader={loading}
                        disable={
                          loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? true
                            : false
                        }
                        data={{
                          list: labStore.listLabs,
                          displayKey: "name",
                          findKey: "name",
                        }}
                        displayValue={masterPackageStore.masterPackage?.lab}
                        hasError={errors.lab}
                        onFilter={(value: string) => {
                          labStore.LabService.filter({
                            input: {
                              type: "filter",
                              filter: {
                                name: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
                        onSelect={(item) => {
                          onChange(item.name)
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            lab: item.code,
                          })
                          labStore.updateLabList(labStore.listLabsCopy)
                          if (!masterPackageStore.masterPackage?.existsVersionId) {
                            masterPackageStore.masterPackageService
                              .checkExitsLabEnvCode({
                                input: {
                                  code:
                                    masterPackageStore.masterPackage?.packageCode,
                                  env: masterPackageStore.masterPackage?.environment,
                                  lab: item.code,
                                },
                              })
                              .then((res) => {
                                if (res.checkPackageMasterExistsRecord.success) {
                                  masterPackageStore.updateExistsLabEnvCode(true)
                                  Toast.error({
                                    message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                  })
                                } else
                                  masterPackageStore.updateExistsLabEnvCode(false)
                              })
                          }
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="lab"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Service Type"
                      hasError={errors.serviceType}
                    >
                      <select
                        value={masterPackageStore.masterPackage?.serviceType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.serviceType ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const serviceItem = JSON.parse(e.target.value)
                          onChange(serviceItem)
                          if (masterPanelStore.listMasterPanel) {
                            console.log({
                              items: masterPanelStore.listMasterPanel,
                            })
                            const listPackageItems: any = masterPanelStore.listMasterPanel.filter(
                              (item) => {
                                return item.serviceType === serviceItem.code
                              }
                            )
                            setArrPackageItems(listPackageItems)
                            const listPanelItems = masterPanelStore.listMasterPanel.filter(
                              (item) => {
                                return (
                                  item.serviceType ===
                                  (serviceItem.code === "K" ? "N" : "S")
                                )
                              }
                            )
                            setArrPanelItems(listPanelItems)
                          }
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            serviceType: serviceItem.code,
                            packageName: undefined,
                            panelName: [],
                          })
                        }}
                      >
                        <option selected>
                          {masterPackageStore.masterPackage?.serviceType || "Select"}
                        </option>
                        {routerStore.lookupItems.length > 0 &&
                          getServiceTypes(
                            routerStore.lookupItems.find((item) => {
                              return item.fieldName === "SERVICE_TYPE"
                            })
                          ).map((item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {lookupValue(item)}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="serviceType"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Package Code"
                      hasError={errors.packageCode}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.packageCode ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const packageItem = JSON.parse(e.target.value)
                          console.log({ packageItem })
                          onChange(packageItem.panelCode)
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            packageCode: packageItem.panelCode,
                            packageName: packageItem.panelName,
                          })
                          if (!masterPackageStore.masterPackage?.existsVersionId) {
                            masterPackageStore.masterPackageService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: packageItem.panelCode,
                                  env: masterPackageStore.masterPackage?.environment,
                                  lab: masterPackageStore.masterPackage.lab,
                                },
                              })
                              .then((res) => {
                                if (res.checkPackageMasterExistsRecord.success) {
                                  masterPackageStore.updateExistsLabEnvCode(true)
                                  Toast.error({
                                    message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                  })
                                } else
                                  masterPackageStore.updateExistsLabEnvCode(false)
                              })
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {arrPackageItems &&
                          arrPackageItems.map((item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.panelName} - ${item.panelCode}`}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="packageCode"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {masterPackageStore.checkExitsLabEnvCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
                <label className="hidden">
                  {" "}
                  {`${masterPackageStore.masterPackage?.packageName}`}
                </label>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      value={masterPackageStore.masterPackage?.packageName}
                      label="Package Name"
                      placeholder="Package Name"
                      disabled={true}
                    />
                  )}
                  name="packageName"
                  rules={{ required: false }}
                  defaultValue=""
                />
                {arrPanelItems && (
                  <>
                    {" "}
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.InputWrapper
                          label="Panel Code"
                          hasError={errors.panelCode}
                        >
                          <AutoCompleteCheckMultiFilterKeys
                            placeholder={
                              errors.panelCode
                                ? "Please Search Panel Name Or Panel Code"
                                : "Search by panel name or panel code"
                            }
                            hasError={errors.panelCode}
                            data={{
                              defulatValues: [],
                              list: arrPanelItems,
                              displayKey: ["panelName", "panelCode"],
                              findKey: ["panelName", "panelCode"],
                            }}
                            onUpdate={(items) => {
                              onChange(items)
                              const panelCode: string[] = []
                              const panelName: string[] = []
                              items.filter((item: any) => {
                                panelCode.push(item.panelCode)
                                panelName.push(item.panelName)
                              })
                              masterPackageStore.updateMasterPackage({
                                ...masterPackageStore.masterPackage,
                                panelCode,
                                panelName,
                              })
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name="panelCode"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.InputWrapper
                          label="Panel Name"
                          hasError={errors.panelName}
                        >
                          <select
                            disabled={true}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.panelName
                                ? "border-red-500  "
                                : "border-gray-300"
                            } rounded-md`}
                          >
                            <option selected>
                              {masterPackageStore.masterPackage?.panelName?.join(
                                ","
                              ) || `Select`}
                            </option>
                          </select>
                        </Form.InputWrapper>
                      )}
                      name="panelName"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                  </>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Status" hasError={errors.status}>
                      <select
                        value={masterPackageStore.masterPackage?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const status = e.target.value
                          onChange(status)
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
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
                    <Form.Input
                      label="Entered By"
                      placeholder={
                        errors.userId ? "Please Enter Entered By " : "Entered By"
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
                    <Form.InputDateTime
                      label="Date Creation"
                      placeholder={
                        errors.dateCreation
                          ? "Please Enter DateCreation"
                          : "Date Creation"
                      }
                      hasError={errors.dateCreation}
                      value={masterPackageStore.masterPackage?.dateCreation}
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
                    <Form.Toggle
                      label="Bill"
                      id="modeBill"
                      hasError={errors.bill}
                      value={masterPackageStore.masterPackage?.bill}
                      onChange={(bill) => {
                        masterPackageStore.updateMasterPackage({
                          ...masterPackageStore.masterPackage,
                          bill,
                        })
                      }}
                    />
                  )}
                  name="bill"
                  rules={{ required: false }}
                  defaultValue=""
                />
              </List>

              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputDateTime
                      label="Date Active"
                      placeholder={
                        errors.dateActive
                          ? "Please Enter DateActiveFrom"
                          : "Date Active"
                      }
                      hasError={errors.dateActive}
                      value={masterPackageStore.masterPackage?.dateActive}
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
                    <Form.InputDateTime
                      label="Date Expire"
                      placeholder={
                        errors.dateExpire
                          ? "Please Enter Date Expire"
                          : "Date Expire"
                      }
                      hasError={errors.dateExpire}
                      value={masterPackageStore.masterPackage?.dateExpire}
                      onChange={(dateExpire) => {
                        onChange(dateExpire)
                        masterPackageStore.updateMasterPackage({
                          ...masterPackageStore.masterPackage,
                          dateExpire,
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
                    <Form.Input
                      label="Version"
                      placeholder={
                        errors.version ? "Please Enter Version " : "Version"
                      }
                      hasError={errors.version}
                      value={masterPackageStore.masterPackage?.version}
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
                    <Form.InputWrapper
                      label="Environment"
                      hasError={errors.environment}
                    >
                      <select
                        value={masterPackageStore.masterPackage?.environment}
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
                          masterPackageStore.updateMasterPackage({
                            ...masterPackageStore.masterPackage,
                            environment,
                          })
                          if (!masterPackageStore.masterPackage?.existsVersionId) {
                            masterPackageStore.masterPackageService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: masterPackageStore.masterPackage.packageCode,
                                  env: environment,
                                  lab: masterPackageStore.masterPackage.lab,
                                },
                              })
                              .then((res) => {
                                if (res.checkPackageMasterExistsRecord.success) {
                                  masterPackageStore.updateExistsLabEnvCode(true)
                                  Toast.error({
                                    message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                  })
                                } else
                                  masterPackageStore.updateExistsLabEnvCode(false)
                              })
                          }
                        }}
                      >
                        <option selected>
                          {loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? `Select`
                            : masterPackageStore.masterPackage?.environment ||
                              `Select`}
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
              </List>
            </Grid>
            <br />
            <List direction="row" space={3} align="center">
              <Buttons.Button
                size="medium"
                type="solid"
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitMasterPackage)}
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
              console.log({ type })
              if (type === "Delete") {
                masterPackageStore.masterPackageService
                  .deletePackageMaster({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removePackageMaster.success) {
                      Toast.success({
                        message: `😊 ${res.removePackageMaster.message}`,
                      })
                      setModalConfirm({ show: false })
                      masterPackageStore.fetchPackageMaster()
                    }
                  })
              } else if (type === "Update") {
                masterPackageStore.masterPackageService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updatePackageMaster.success) {
                      Toast.success({
                        message: `😊 ${res.updatePackageMaster.message}`,
                      })
                      setModalConfirm({ show: false })
                      masterPackageStore.fetchPackageMaster()
                    }
                  })
              } else if (type === "versionUpgrade") {
                masterPackageStore.updateMasterPackage({
                  ...modalConfirm.data,
                  _id: undefined,
                  existsVersionId: modalConfirm.data._id,
                  existsRecordId: undefined,
                  version: parseInt(modalConfirm.data.version + 1),
                  dateActive: moment().unix(),
                })
                setValue("lab", modalConfirm.data.lab)
                setValue("environment", modalConfirm.data.environment)
                setValue("status", modalConfirm.data.status)
              } else if (type === "duplicate") {
                masterPackageStore.updateMasterPackage({
                  ...modalConfirm.data,
                  _id: undefined,
                  existsVersionId: undefined,
                  existsRecordId: modalConfirm.data._id,
                  version: parseInt(modalConfirm.data.version + 1),
                  dateActive: moment().unix(),
                })
                setHideAddLab(!hideAddLab)
                setValue("lab", modalConfirm.data.lab)
                setValue("environment", modalConfirm.data.environment)
                setValue("status", modalConfirm.data.status)
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

export default MasterPackage
