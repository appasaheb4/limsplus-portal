/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import Storage from "@lp/library/modules/storage"
import { useStores } from "@lp/library/stores"
import { useForm, Controller } from "react-hook-form"
import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as AnalyteMasterStore } from "@lp/features/collection/masterAnalyte/stores"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestAnalyteMapping = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
        ...Stores.testAnalyteMappingStore.testAnalyteMapping,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitTestAnalyteMapping = () => {
    if (Stores.testAnalyteMappingStore.testAnalyteMapping) {
      if (
        !Stores.testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
        !Stores.testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
      ) {
        Stores.testAnalyteMappingStore.testAnalyteMappingService
          .addTestAnalyteMapping({
            ...Stores.testAnalyteMappingStore.testAnalyteMapping,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Test analyte mapping created.`,
            })
          })
      } else if (
        Stores.testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
        !Stores.testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
      ) {
        Stores.testAnalyteMappingStore.testAnalyteMappingService
          .versionUpgradeTestAnalyteMapping({
            ...Stores.testAnalyteMappingStore.testAnalyteMapping,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Test analyte version upgrade.`,
            })
          })
      } else if (
        !Stores.testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
        Stores.testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
      ) {
        Stores.testAnalyteMappingStore.testAnalyteMappingService
          .duplicateTestAnalyteMapping({
            ...Stores.testAnalyteMappingStore.testAnalyteMapping,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Test analyte duplicate created.`,
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
                        Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...Stores.testAnalyteMappingStore.testAnalyteMapping,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Test Code"
                    name="txtTestCode"
                    placeholder={
                      errors.testCode ? "Please Enter TestCode" : "Test Code"
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.testCode
                        ? "border-red-500  focus:border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.testCode}
                    disabled={true}
                    value={
                      Stores.testAnalyteMappingStore.testAnalyteMapping?.testCode
                    }
                  />
                )}
                name="testCode"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Test Name"
                    hasError={errors.testName}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.testName
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const testMasteritem = JSON.parse(e.target.value)
                        onChange(testMasteritem.testName)
                        setValue("testCode", testMasteritem.testCode)
                        Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...Stores.testAnalyteMappingStore.testAnalyteMapping,
                          testName: testMasteritem.testName,
                          testCode: testMasteritem.testCode,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {TestMasterStore.testMasterStore.listTestMaster &&
                        TestMasterStore.testMasterStore.listTestMaster.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.testName} - ${item.testCode}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="testName"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Analyte Code"
                    hasError={errors.analyteCode}
                  >
                    <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
                      placeholder={
                        errors.analyteCode
                          ? "Please Enter Analyte Code And Analyte Name"
                          : "Search by analyte name or analyte code"
                      }
                      hasError={errors.analyteCode}
                      data={{
                        defulatValues: [],
                        list:
                          AnalyteMasterStore.masterAnalyteStore.listMasterAnalyte ||
                          [],
                        displayKey: ["analyteName", "analyteCode"],
                        findKey: ["analyteName", "analyteCode"],
                      }}
                      onUpdate={(items) => {
                        onChange(items)
                        const analyteCode: string[] = []
                        const analyteName: string[] = []
                        items.filter((item: any) => {
                          analyteCode.push(item.analyteCode)
                          analyteName.push(item.analyteName)
                        })
                        console.log({ analyteName, analyteCode })
                        Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...Stores.testAnalyteMappingStore.testAnalyteMapping,
                          analyteName,
                          analyteCode,
                        })
                      }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="analyteCode"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Analyte Name"
                    placeholder={
                      errors.analyteName
                        ? "Please Enter AnalyteName"
                        : "Analyte Name"
                    }
                    hasError={errors.analyteName}
                    disabled={true}
                    value={
                      typeof Stores.testAnalyteMappingStore.testAnalyteMapping
                        ?.analyteName !== "string"
                        ? Stores.testAnalyteMappingStore.testAnalyteMapping?.analyteName?.join(
                            ","
                          )
                        : Stores.testAnalyteMappingStore.testAnalyteMapping
                            ?.analyteName
                    }
                  />
                )}
                name="analyteName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={3}
                    label="Description"
                    name="txtDescription"
                    placeholder={
                      errors.description ? "Please Enter description" : "Description"
                    }
                    hasError={errors.description}
                    value={
                      Stores.testAnalyteMappingStore.testAnalyteMapping?.description
                    }
                    onChange={(description) => {
                      onChange(description)
                      Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                        ...Stores.testAnalyteMappingStore.testAnalyteMapping,
                        description,
                      })
                    }}
                  />
                )}
                name="description"
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
                      value={
                        Stores.testAnalyteMappingStore.testAnalyteMapping?.status
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...Stores.testAnalyteMappingStore.testAnalyteMapping,
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
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Bill"
                    id="modeBill"
                    hasError={errors.bill}
                    value={Stores.testAnalyteMappingStore.testAnalyteMapping?.bill}
                    onChange={(bill) => {
                      onChange(bill)
                      Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                        ...Stores.testAnalyteMappingStore.testAnalyteMapping,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter UserID" : "Entered By"
                    }
                    hasError={errors.userId}
                    value={LoginStore.loginStore.login?.userId}
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   Stores.masterAnalyteStore.updateMasterAnalyte({
                    //     ...Stores.masterAnalyteStore.masterAnalyte,
                    //     analyteCode,
                    //   })
                    // }}
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
                    value={LibraryUtils.moment
                      .unix(
                        Stores.testAnalyteMappingStore.testAnalyteMapping
                          ?.dateCreation || 0
                      )
                      .format("YYYY-MM-DD")}
                    disabled={true}
                    // onChange={(e) => {
                    //   const schedule = new Date(e.target.value)
                    //   const formatDate = LibraryUtils.moment(schedule).format(
                    //     "YYYY-MM-DD HH:mm"
                    //   )
                    //   Stores.masterAnalyteStore.updateMasterAnalyte({
                    //     ...Stores.masterAnalyteStore.masterAnalyte,
                    //     schedule: new Date(formatDate),
                    //   })
                    // }}
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
                    hasError={errors.dateActiveFrom}
                    placeholder={
                      errors.dateActiveFrom
                        ? "Please Enter dateActiveFrom"
                        : "Date Active"
                    }
                    value={LibraryUtils.moment
                      .unix(
                        Stores.testAnalyteMappingStore.testAnalyteMapping
                          ?.dateActiveFrom || 0
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
                      errors.dateActiveTo
                        ? "Please Enter dateActiveTo"
                        : "Date Expire"
                    }
                    value={LibraryUtils.moment
                      .unix(
                        Stores.testAnalyteMappingStore.testAnalyteMapping
                          ?.dateActiveTo || 0
                      )
                      .format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const schedule = new Date(e.target.value)
                      onChange(schedule)
                      Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                        ...Stores.testAnalyteMappingStore.testAnalyteMapping,
                        dateActiveTo: LibraryUtils.moment(schedule).unix(),
                      })
                    }}
                  />
                )}
                name="schedule"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Version"
                    hasError={errors.version}
                    placeholder={errors.version ? "Please Enter Version" : "Version"}
                    value={
                      Stores.testAnalyteMappingStore.testAnalyteMapping?.version
                    }
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   Stores.masterAnalyteStore.updateMasterAnalyte({
                    //     ...Stores.masterAnalyteStore.masterAnalyte,
                    //     analyteCode,
                    //   })
                    // }}
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
                    hasError={errors.keyNum}
                    placeholder={errors.keyNum ? "Please Enter keyNum" : "Key Num"}
                    value={Stores.testAnalyteMappingStore.testAnalyteMapping?.keyNum}
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   Stores.masterAnalyteStore.updateMasterAnalyte({
                    //     ...Stores.masterAnalyteStore.masterAnalyte,
                    //     analyteCode,
                    //   })
                    // }}
                  />
                )}
                name="keyNum"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={
                        Stores.testAnalyteMappingStore.testAnalyteMapping
                          ?.environment
                      }
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
                        Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...Stores.testAnalyteMappingStore.testAnalyteMapping,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.testAnalyteMappingStore.testAnalyteMapping
                              ?.environment}
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

              {/* <LibraryComponents.Atoms.Grid cols={5}> */}

              {/* </LibraryComponents.Atoms.Grid> */}
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitTestAnalyteMapping)}
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
          <FeatureComponents.Molecules.TestAnalyteMappingList
            data={Stores.testAnalyteMappingStore.listTestAnalyteMapping || []}
            totalSize={Stores.testAnalyteMappingStore.listTestAnalyteMappingCount}
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
              Stores.testAnalyteMappingStore.fetchTestAnalyteMapping(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.testAnalyteMappingStore.testAnalyteMappingService
                .deleteTestAnalyteMapping(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testAnalyteMappingStore.fetchTestAnalyteMapping()
                  }
                })
            } else if (type === "Update") {
              Stores.testAnalyteMappingStore.testAnalyteMappingService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testAnalyteMappingStore.fetchTestAnalyteMapping()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
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

export default TestAnalyteMapping
