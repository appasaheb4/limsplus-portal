/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import dayjs from "dayjs"

import { useForm, Controller } from "react-hook-form"
import { useStores, stores } from "@lp/stores"
  
import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPackage = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const { loginStore, masterPackageStore, labStore, masterPanelStore } = useStores()
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
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      masterPackageStore.updateMasterPackage({
        ...masterPackageStore.masterPackage,
        lab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("lab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

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
              enteredBy: stores.loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createPackageMaster.success) {
              LibraryComponents.Atoms.Toast.success({
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
              enteredBy: stores.loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradePackageMaster.success) {
              LibraryComponents.Atoms.Toast.success({
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
              enteredBy: stores.loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicatePackageMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicatePackageMaster.message}`,
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Lab"
                    hasError={errors.lab}
                  >
                    <select
                      value={masterPackageStore.masterPackage?.lab}
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
                        masterPackageStore.updateMasterPackage({
                          ...masterPackageStore.masterPackage,
                          lab,
                        })
                        if (!masterPackageStore.masterPackage?.existsVersionId) {
                          masterPackageStore.masterPackageService
                            .checkExitsLabEnvCode({
                              input: {
                                code: masterPackageStore.masterPackage?.packageCode,
                                env: masterPackageStore.masterPackage?.environment,
                                lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkPackageMasterExistsRecord.success) {
                                masterPackageStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                })
                              } else masterPackageStore.updateExistsLabEnvCode(false)
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Service Type"
                    hasError={errors.serviceType}
                  >
                    <select
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
                      <option selected>Select</option>
                      {stores.routerStore.lookupItems.length > 0 &&
                        getServiceTypes(
                          stores.routerStore.lookupItems.find((item) => {
                            return item.fieldName === "SERVICE_TYPE"
                          })
                        ).map((item: any, index: number) => (
                          <option key={index} value={JSON.stringify(item)}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="serviceType"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
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
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                })
                              } else masterPackageStore.updateExistsLabEnvCode(false)
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
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
                  <LibraryComponents.Atoms.Form.Input
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
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Panel Code"
                        hasError={errors.panelCode}
                      >
                        <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
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
                      </LibraryComponents.Atoms.Form.InputWrapper>
                    )}
                    name="panelCode"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Panel Name"
                        hasError={errors.panelName}
                      >
                        <select
                          disabled={true}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.panelName ? "border-red-500  " : "border-gray-300"
                          } rounded-md`}
                        >
                          <option selected>
                            {masterPackageStore.masterPackage?.panelName?.join(
                              ","
                            ) || `Select`}
                          </option>
                        </select>
                      </LibraryComponents.Atoms.Form.InputWrapper>
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Status"
                    hasError={errors.status}
                  >
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
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter DateCreation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(
                      masterPackageStore.masterPackage?.dateCreation
                    ).format("YYYY-MM-DD")}
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
                  <LibraryComponents.Atoms.Form.Toggle
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
                    label="Date Active"
                    placeholder={
                      errors.dateActiveFrom
                        ? "Please Enter DateActiveFrom"
                        : "Date Active"
                    }
                    hasError={errors.dateActiveFrom}
                    value={dayjs(
                      masterPackageStore.masterPackage?.dateActiveFrom
                    ).format("YYYY-MM-DD")}
                    disabled={true}
                  />
                )}
                name="dateActiveFrom"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Expire"
                    placeholder={
                      errors.dateExpire ? "Please Enter Date Expire" : "Date Expire"
                    }
                    hasError={errors.dateExpire}
                    value={dayjs(
                      masterPackageStore.masterPackage?.dateActiveTo
                    ).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const dateActiveTo = new Date(e.target.value)
                      onChange(dateActiveTo)
                      masterPackageStore.updateMasterPackage({
                        ...masterPackageStore.masterPackage,
                        dateActiveTo,
                      })
                    }}
                  />
                )}
                name="dateActiveTo"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={masterPackageStore.masterPackage?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
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
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPackageMasterExistsRecord.message}`,
                                })  
                              } else masterPackageStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : masterPackageStore.masterPackage?.environment ||
                            `Select`}
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
              onClick={handleSubmit(onSubmitMasterPackage)}
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
          <FeatureComponents.Molecules.PackageMasterList
            data={masterPackageStore.listMasterPackage || []}
            totalSize={masterPackageStore.listMasterPackageCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
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
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            console.log({ type })
            if (type === "Delete") {
              masterPackageStore.masterPackageService
                .deletePackageMaster({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removePackageMaster.success) {
                    LibraryComponents.Atoms.Toast.success({
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
                    LibraryComponents.Atoms.Toast.success({
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
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
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
                version: 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
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

export default MasterPackage
