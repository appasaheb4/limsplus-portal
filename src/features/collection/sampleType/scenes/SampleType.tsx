/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/stores"
import { Stores } from "../stores"
import { stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const SampleType = observer(() => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.sampleTypeStore.updateSampleType({
        ...Stores.sampleTypeStore.sampleType,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
  const onSubmitSampleType = () => {
    if (!Stores.sampleTypeStore.checkExitsEnvCode) {
      Stores.sampleTypeStore.sampleTypeService
        .addSampleType(Stores.sampleTypeStore.sampleType)
        .then(() => {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 Sample type created.`,
          })
          Stores.sampleTypeStore.fetchSampleTypeList()
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔Please enter diff code",
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Sample Code"
                    hasError={errors.sampleCode}
                    placeholder={
                      errors.sampleCode ? "Please Enter Sample Code" : "Sample Code"
                    }
                    value={Stores.sampleTypeStore.sampleType?.sampleCode}
                    onChange={(sampleCode) => {
                      onChange(sampleCode)
                      Stores.sampleTypeStore.updateSampleType({
                        ...Stores.sampleTypeStore.sampleType,
                        sampleCode: sampleCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      Stores.sampleTypeStore.sampleTypeService
                        .checkExitsEnvCode(
                          code,
                          Stores.sampleTypeStore.sampleType?.environment || ""
                        )
                        .then((res) => {
                          if (res.success) {
                            Stores.sampleTypeStore.updateExitsEnvCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.message}`,
                            })
                          } else Stores.sampleTypeStore.updateExitsEnvCode(false)
                        })
                    }}
                  />
                )}
                name="sampleCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {Stores.sampleTypeStore.checkExitsEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Sample Type"
                    hasError={errors.sampleType}
                    placeholder={
                      errors.sampleType ? "Please Enter Sample Type" : "Sample Type"
                    }
                    value={Stores.sampleTypeStore.sampleType?.sampleType}
                    onChange={(sampleType) => {
                      onChange(sampleType)
                      Stores.sampleTypeStore.updateSampleType({
                        ...Stores.sampleTypeStore.sampleType,
                        sampleType: sampleType.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="sampleType"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Sample Group"
                    placeholder={
                      errors.sampleGroup
                        ? "Please Enter sampleGroup"
                        : "Sample Group"
                    }
                    hasError={errors.sampleGroup}
                    value={Stores.sampleTypeStore.sampleType?.sampleGroup}
                    onChange={(sampleGroup) => {
                      onChange(sampleGroup)
                      Stores.sampleTypeStore.updateSampleType({
                        ...Stores.sampleTypeStore.sampleType,
                        sampleGroup: sampleGroup.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="sampleGroup"
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
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={5}
                    label="Descriptions"
                    placeholder={
                      errors.descriptions
                        ? "Please Enter descriptions"
                        : "Descriptions"
                    }
                    hasError={errors.descriptions}
                    value={Stores.sampleTypeStore.sampleType?.descriptions}
                    onChange={(descriptions) => {
                      onChange(descriptions)
                      Stores.sampleTypeStore.updateSampleType({
                        ...Stores.sampleTypeStore.sampleType,
                        descriptions,
                      })
                    }}
                  />
                )}
                name="descriptions"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={Stores.sampleTypeStore.sampleType?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment
                          ? "border-red-500  "
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
                        Stores.sampleTypeStore.updateSampleType({
                          ...Stores.sampleTypeStore.sampleType,
                          environment,
                        })
                        Stores.sampleTypeStore.sampleTypeService
                          .checkExitsEnvCode(
                            Stores.sampleTypeStore.sampleType?.sampleCode || "",
                            environment
                          )
                          .then((res) => {
                            if (res.success) {
                              Stores.sampleTypeStore.updateExitsEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.message}`,
                              })
                            } else Stores.sampleTypeStore.updateExitsEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.sampleTypeStore.sampleType?.environment ||
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
              onClick={handleSubmit(onSubmitSampleType)}
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
          <FeatureComponents.Molecules.SampleTypeList
            data={Stores.sampleTypeStore.listSampleType || []}
            totalSize={Stores.sampleTypeStore.listSampleTypeCount}
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
            onPageSizeChange={(page, limit) => {
              Stores.sampleTypeStore.fetchSampleTypeList(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.sampleTypeStore.sampleTypeService
                .deleteSampleType(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Sample type deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sampleTypeStore.fetchSampleTypeList()
                  }
                })
            } else if (type === "Update") {
              Stores.sampleTypeStore.sampleTypeService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Sample type updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sampleTypeStore.fetchSampleTypeList()
                    window.location.reload()
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

export default SampleType
