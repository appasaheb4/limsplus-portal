/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const SampleType = observer(() => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()
  const { loginStore, sampleTypeStore, routerStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      sampleTypeStore.updateSampleType({
        ...sampleTypeStore.sampleType,
        environment: loginStore.login.environment,
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])
  useEffect(()=>{
    const environment = routerStore.lookupItems.find((fileds)=>{
      return fileds.fieldName === 'ENVIRONMENT'
    })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
    if(environment){
      sampleTypeStore && sampleTypeStore.updateSampleType({
        ...sampleTypeStore.sampleType,
        environment: environment.code as string
      })
      setValue("environment",environment.code as string)
    }
  },[routerStore.lookupItems])
  const onSubmitSampleType = () => {
    if (!sampleTypeStore.checkExitsEnvCode) {
      sampleTypeStore.sampleTypeService
        .addSampleType({ input: { ...sampleTypeStore.sampleType } })
        .then((res) => {
          if (res.createSampleType.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createSampleType.message}`,
            })
            sampleTypeStore.fetchSampleTypeList()
          }
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
                    value={sampleTypeStore.sampleType?.sampleCode}
                    onChange={(sampleCode) => {
                      onChange(sampleCode)
                      sampleTypeStore.updateSampleType({
                        ...sampleTypeStore.sampleType,
                        sampleCode: sampleCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      sampleTypeStore.sampleTypeService
                        .checkExitsEnvCode({
                          input: {
                            code,
                            env: sampleTypeStore.sampleType?.environment,
                          },
                        })
                        .then((res) => {
                          if (res.checkSampleTypeExistsRecord.success) {
                            sampleTypeStore.updateExitsEnvCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkSampleTypeExistsRecord.message}`,
                            })
                          } else sampleTypeStore.updateExitsEnvCode(false)
                        })
                    }}
                  />
                )}
                name="sampleCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {sampleTypeStore.checkExitsEnvCode && (
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
                    value={sampleTypeStore.sampleType?.sampleType}
                    onChange={(sampleType) => {
                      onChange(sampleType)
                      sampleTypeStore.updateSampleType({
                        ...sampleTypeStore.sampleType,
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
                    value={sampleTypeStore.sampleType?.sampleGroup}
                    onChange={(sampleGroup) => {
                      onChange(sampleGroup)
                      sampleTypeStore.updateSampleType({
                        ...sampleTypeStore.sampleType,
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
                    value={sampleTypeStore.sampleType?.descriptions}
                    onChange={(descriptions) => {
                      onChange(descriptions)
                      sampleTypeStore.updateSampleType({
                        ...sampleTypeStore.sampleType,
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
                      value={sampleTypeStore.sampleType?.environment}
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
                        sampleTypeStore.updateSampleType({
                          ...sampleTypeStore.sampleType,
                          environment,
                        })
                        sampleTypeStore.sampleTypeService
                          .checkExitsEnvCode({
                            input: {
                              code: sampleTypeStore.sampleType?.sampleCode,
                              env: environment,
                            },
                          })
                          .then((res) => {
                            if (res.checkSampleTypeExistsRecord.success) {
                              sampleTypeStore.updateExitsEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkSampleTypeExistsRecord.message}`,
                              })
                            } else sampleTypeStore.updateExitsEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : sampleTypeStore.sampleType?.environment || `Select`}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.SampleTypeList
            data={sampleTypeStore.listSampleType || []}
            totalSize={sampleTypeStore.listSampleTypeCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
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
            onPageSizeChange={(page, limit) => {
              sampleTypeStore.fetchSampleTypeList(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              sampleTypeStore.sampleTypeService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              sampleTypeStore.sampleTypeService
                .deleteSampleType({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeSampleType.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeSampleType.message}`,
                    })
                    setModalConfirm({ show: false })
                    sampleTypeStore.fetchSampleTypeList()
                  }
                })
            } else if (type === "Update") {
              sampleTypeStore.sampleTypeService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateSampleType.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateSampleType.message}`,
                    })
                    setModalConfirm({ show: false })
                    sampleTypeStore.fetchSampleTypeList()
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
