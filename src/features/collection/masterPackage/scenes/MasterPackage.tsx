/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as PanelMasterStore } from "@lp/features/collection/masterPanel/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPackage = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const { loginStore } = useStores()
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
      Stores.masterPackageStore.updateMasterPackage({
        ...Stores.masterPackageStore.masterPackage,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitMasterPackage = () => {
    if (Stores.masterPackageStore.masterPackage) {
      if (
        !Stores.masterPackageStore.masterPackage?.existsVersionId &&
        !Stores.masterPackageStore.masterPackage?.existsRecordId
      ) {
        Stores.masterPackageStore.masterPackageService
          .addPackageMaster({
            ...Stores.masterPackageStore.masterPackage,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Package master created.`,
            })
          })
      } else if (
        Stores.masterPackageStore.masterPackage?.existsVersionId &&
        !Stores.masterPackageStore.masterPackage?.existsRecordId
      ) {
        Stores.masterPackageStore.masterPackageService
          .versionUpgradePackageMaster(Stores.masterPackageStore.masterPackage)
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Package master version upgrade.`,
            })
          })
      } else if (
        !Stores.masterPackageStore.masterPackage?.existsVersionId &&
        Stores.masterPackageStore.masterPackage?.existsRecordId
      ) {
        Stores.masterPackageStore.masterPackageService
          .duplicatePackageMaster(Stores.masterPackageStore.masterPackage)
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Package master duplicate created.`,
            })
          })
      }

      setTimeout(() => {
        window.location.reload()
      }, 2000)
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
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.lab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const lab = e.target.value as string
                        onChange(lab)
                        Stores.masterPackageStore.updateMasterPackage({
                          ...Stores.masterPackageStore.masterPackage,
                          lab,
                        })
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
                        if (PanelMasterStore.masterPanelStore.listMasterPanel) {
                          console.log({
                            items: PanelMasterStore.masterPanelStore.listMasterPanel,
                          })
                          const listPackageItems: any = PanelMasterStore.masterPanelStore.listMasterPanel.filter(
                            (item) => {
                              return item.serviceType === serviceItem.code
                            }
                          )
                          setArrPackageItems(listPackageItems)
                          const listPanelItems = PanelMasterStore.masterPanelStore.listMasterPanel.filter(
                            (item) => {
                              return (
                                item.serviceType ===
                                (serviceItem.code === "K" ? "N" : "S")
                              )
                            }
                          )
                          setArrPanelItems(listPanelItems)
                        }

                        Stores.masterPackageStore.updateMasterPackage({
                          ...Stores.masterPackageStore.masterPackage,
                          serviceType: serviceItem.code,
                          packageName: undefined,
                          panelName: undefined,
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
                        onChange(packageItem.panelCode)
                        Stores.masterPackageStore.updateMasterPackage({
                          ...Stores.masterPackageStore.masterPackage,
                          packageCode: packageItem.panelCode,
                          packageName: packageItem.panelName,
                        })
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Package Name"
                    hasError={errors.packageName}
                  >
                    <select
                      disabled={true}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.packageName
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                    >
                      <option selected>
                        {Stores.masterPackageStore.masterPackage?.packageName ||
                          `Select`}
                      </option>
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
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
                            Stores.masterPackageStore.updateMasterPackage({
                              ...Stores.masterPackageStore.masterPackage,
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
                            errors.panelName
                              ? "border-red-500  focus:border-red-500"
                              : "border-gray-300"
                          } rounded-md`}
                        >
                          <option selected>
                            {Stores.masterPackageStore.masterPackage?.panelName?.join(
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
                      value={Stores.masterPackageStore.masterPackage?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        Stores.masterPackageStore.updateMasterPackage({
                          ...Stores.masterPackageStore.masterPackage,
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter Entered By " : "Entered By"
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter DateCreation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={LibraryUtils.moment
                      .unix(
                        Stores.masterPackageStore.masterPackage?.dateCreation || 0
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
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Bill"
                    id="modeBill"
                    hasError={errors.bill}
                    value={Stores.masterPackageStore.masterPackage?.bill}
                    onChange={(bill) => {
                      Stores.masterPackageStore.updateMasterPackage({
                        ...Stores.masterPackageStore.masterPackage,
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
                    value={LibraryUtils.moment
                      .unix(
                        Stores.masterPackageStore.masterPackage?.dateActiveFrom || 0
                      )
                      .format("YYYY-MM-DD")}
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
                    value={LibraryUtils.moment
                      .unix(
                        Stores.masterPackageStore.masterPackage?.dateActiveTo || 0
                      )
                      .format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const schedule = new Date(e.target.value)
                      onChange(schedule)
                      Stores.masterPackageStore.updateMasterPackage({
                        ...Stores.masterPackageStore.masterPackage,
                        dateActiveTo: LibraryUtils.moment(schedule).unix(),
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
                    value={Stores.masterPackageStore.masterPackage?.version}
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
                    value={Stores.masterPackageStore.masterPackage?.keyNum}
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
                      value={Stores.masterPackageStore.masterPackage?.environment}
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
                        Stores.masterPackageStore.updateMasterPackage({
                          ...Stores.masterPackageStore.masterPackage,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.masterPackageStore.masterPackage?.environment}
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
            data={Stores.masterPackageStore.listMasterPackage || []}
            totalSize={Stores.masterPackageStore.listMasterPackageCount}
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
              Stores.masterPackageStore.fetchPackageMaster(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            console.log({ type })
            if (type === "Delete") {
              Stores.masterPackageStore.masterPackageService
                .deletePackageMaster(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Package master deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterPackageStore.fetchPackageMaster()
                  }
                })
            } else if (type === "Update") {
              Stores.masterPackageStore.masterPackageService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Package master updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterPackageStore.fetchPackageMaster()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.masterPackageStore.updateMasterPackage({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.masterPackageStore.updateMasterPackage({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
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

export default MasterPackage
