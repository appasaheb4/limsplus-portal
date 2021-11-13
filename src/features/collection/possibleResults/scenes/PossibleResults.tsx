/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { PossibleResultsList } from "../components/molecules"
import { Container } from "reactstrap"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

let router = dashboardRoutes

export const PossibleResults = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const {
    loginStore,
    possibleResultsStore,
    masterAnalyteStore,
    routerStore,
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLookup, setHideAddLookup] = useState<boolean>(true)

  useEffect(() => {
    router = router.filter((item: any) => {
      if (item.name !== "Dashboard") {
        item.toggle = false
        item.title = item.name
        item = item.children.filter((childernItem) => {
          childernItem.title = childernItem.name
          childernItem.toggle = false
          return childernItem
        })
        return item
      }
    })
  }, [])
  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      possibleResultsStore.updatePossibleResults({
        ...possibleResultsStore.possibleResults,
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
      possibleResultsStore && possibleResultsStore.updatePossibleResults({
        ...possibleResultsStore.possibleResults,
        environment: environment.code as string
      })
      setValue("environment",environment.code as string)
    }
  },[routerStore.lookupItems])

  const onSubmitPossibleResult = () => {
    if (!possibleResultsStore.checkExistsEnvCode) {
      possibleResultsStore.possibleResultsService
        .addPossibleResults({ input: { ...possibleResultsStore.possibleResults } })
        .then((res) => {
          if (res.createPossibleResult.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createPossibleResult.message}`,
            })
          }
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please use diff code`,
      })
    }
  }

  return (
    <>
      <Container>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={routerStore.selectedComponents?.title || ""}
          />
          <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddLookup}
            onClick={() => setHideAddLookup(!hideAddLookup)}
          />
        )}
        <div className="mx-auto">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddLookup ? "hidden" : "shown")
            }
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
                      label="Analyte Code"
                      hasError={errors.analyte}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.analyte ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const analyte = JSON.parse(e.target.value)
                          onChange(analyte)
                          possibleResultsStore.updatePossibleResults({
                            ...possibleResultsStore.possibleResults,
                            analyteCode: analyte.analyteCode,
                            analyteName: analyte.analyteName,
                          })
                          possibleResultsStore.possibleResultsService
                            .checkExistsEnvCode({
                              input: {
                                code: analyte.analyteCode,
                                env:
                                  possibleResultsStore.possibleResults?.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkPossibleResultExistsRecord.success) {
                                possibleResultsStore.updateExistsEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPossibleResultExistsRecord.message}`,
                                })
                              } else possibleResultsStore.updateExistsEnvCode(false)
                            })
                        }}
                      >
                        <option selected>Select</option>
                        {masterAnalyteStore.listMasterAnalyte &&
                          masterAnalyteStore.listMasterAnalyte.map(
                            (item: any, index: number) => (
                              <option key={index} value={JSON.stringify(item)}>
                                {`${item.analyteCode} - ${item.analyteName}`}
                              </option>
                            )
                          )}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="analyte"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {possibleResultsStore.checkExistsEnvCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      disabled={true}
                      label="Analyte Name"
                      placeholder={
                        errors.analyteName
                          ? "Please Enter Analyte Name"
                          : "Analyte Name"
                      }
                      hasError={errors.analyteName}
                      value={possibleResultsStore.possibleResults?.analyteName}
                    />
                  )}
                  name="analyteName"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                      <select
                        value={possibleResultsStore.possibleResults?.environment}
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
                          possibleResultsStore.updatePossibleResults({
                            ...possibleResultsStore.possibleResults,
                            environment,
                          })
                          possibleResultsStore.possibleResultsService
                            .checkExistsEnvCode({
                              input: {
                                code:
                                  possibleResultsStore.possibleResults.analyteCode,
                                env: environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkPossibleResultExistsRecord.success) {
                                possibleResultsStore.updateExistsEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPossibleResultExistsRecord.message}`,
                                })
                              } else possibleResultsStore.updateExistsEnvCode(false)
                            })
                        }}
                      >
                        <option selected>
                          {loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? `Select`
                            : possibleResultsStore.possibleResults?.environment ||
                              `Select`}
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Conclusion Value">
                  <LibraryComponents.Atoms.Grid cols={5}>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          placeholder={
                            errors.result ? "Please Enter Result" : "Result"
                          }
                          hasError={errors.result}
                          value={possibleResultsStore.possibleResults?.result}
                          onChange={(result) => {
                            onChange(result)
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              result,
                            })
                          }}
                        />
                      )}
                      name="result"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          placeholder={
                            errors.possibleValue
                              ? "Please Enter Possible Value"
                              : "Possible Value"
                          }
                          hasError={errors.possibleValue}
                          value={possibleResultsStore.possibleResults?.possibleValue}
                          onChange={(possibleValue) => {
                            onChange(possibleValue)
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              possibleValue,
                            })
                          }}
                        />
                      )}
                      name="possibleValue"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Toggle
                          label="AbNormal"
                          hasError={errors.abNormal}
                          value={possibleResultsStore.possibleResults?.abNormal}
                          onChange={(abNormal) => {
                            onChange(abNormal)
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              abNormal,
                            })
                          }}
                        />
                      )}
                      name="abNormal"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Toggle
                          hasError={errors.critical}
                          label="Critical"
                          value={possibleResultsStore.possibleResults?.critical}
                          onChange={(critical) => {
                            onChange(critical)
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              critical,
                            })
                          }}
                        />
                      )}
                      name="critical"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <div className="mt-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {
                          const result = possibleResultsStore.possibleResults?.result
                          const possibleValue =
                            possibleResultsStore.possibleResults?.possibleValue
                          let conclusionResult =
                            possibleResultsStore.possibleResults?.conclusionResult ||
                            []
                          if (result === undefined || possibleValue === undefined)
                            return alert("Please enter value and code.")
                          if (result !== undefined) {
                            conclusionResult !== undefined
                              ? conclusionResult.push({
                                  result,
                                  possibleValue,
                                  abNormal:
                                    possibleResultsStore.possibleResults.abNormal,
                                  critical:
                                    possibleResultsStore.possibleResults.critical,
                                })
                              : (conclusionResult = [
                                  {
                                    result,
                                    possibleValue,
                                    abNormal:
                                      possibleResultsStore.possibleResults.abNormal,
                                    critical:
                                      possibleResultsStore.possibleResults.critical,
                                  },
                                ])
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              conclusionResult,
                            })
                            possibleResultsStore.updatePossibleResults({
                              ...possibleResultsStore.possibleResults,
                              conclusionResult,
                              result: "",
                              possibleValue: "",
                              abNormal: false,
                              critical: false,
                            })
                          }
                        }}
                      >
                        <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                        {`Add`}
                      </LibraryComponents.Atoms.Buttons.Button>
                    </div>
                    <div className="clearfix"></div>
                  </LibraryComponents.Atoms.Grid>
                  <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {possibleResultsStore.possibleResults?.conclusionResult?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  possibleResultsStore.possibleResults?.conclusionResult?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  possibleResultsStore.possibleResults?.conclusionResult?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ] as typeof possibleResultsStore.possibleResults.conclusionResult
                                possibleResultsStore.updatePossibleResults({
                                  ...possibleResultsStore.possibleResults,
                                  conclusionResult: finalArray,
                                })
                              }}
                            >
                              {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AbNormal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
                </LibraryComponents.Atoms.Form.InputWrapper>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      hasError={errors.defaulItem}
                      label="Default Conclusion"
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.defaultLab ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          let defaultConclusion = JSON.parse(e.target.value)
                          defaultConclusion = {
                            result: defaultConclusion.result,
                            possibleValue: defaultConclusion.possibleValue,
                            abNormal: defaultConclusion.abNormal,
                            critical: defaultConclusion.critical,
                          }
                          onChange(defaultConclusion)
                          possibleResultsStore.updatePossibleResults({
                            ...possibleResultsStore.possibleResults,
                            defaultConclusion,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {possibleResultsStore.possibleResults &&
                          possibleResultsStore.possibleResults.conclusionResult &&
                          possibleResultsStore.possibleResults.conclusionResult.map(
                            (item: any, index: number) => (
                              <option key={item.name} value={JSON.stringify(item)}>
                                {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AbNormal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                              </option>
                            )
                          )}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="defaulItem"
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
                onClick={handleSubmit(onSubmitPossibleResult)}
              >
                Save
              </LibraryComponents.Atoms.Buttons.Button>
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Atoms.Icon.Remove}
                onClick={() => {
                  //rootStore.LookupStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Atoms.Buttons.Button>
            </LibraryComponents.Atoms.List>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl overflow-scroll">
            <PossibleResultsList
              data={possibleResultsStore.listPossibleResults || []}
              totalSize={possibleResultsStore.listPossibleResultsCount}
              extraData={{
                listMasterAnalyte: masterAnalyteStore.listMasterAnalyte,
                possibleResults: possibleResultsStore.possibleResults,
                lookupItems: routerStore.lookupItems,
                possibleResultsStore,
              }}
              updatePossibleResults={(values)=>{
                possibleResultsStore.updatePossibleResults(values)
              }}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                "Delete"
              )}
              isEditModify={RouterFlow.checkPermission(
                routerStore.userPermission,
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
                  body: `Update Lookup!`,
                })
              }}
              onPageSizeChange={(page, limit) => {
                possibleResultsStore.fetchListPossibleResults(page, limit)
              }}
            />
          </div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                possibleResultsStore.possibleResultsService
                  .deletePossibleResults({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removePossibleResult.success) {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 ${res.removePossibleResult.message}`,
                      })
                      setModalConfirm({ show: false })
                      possibleResultsStore.fetchListPossibleResults()
                    }
                  })
              } else if (type === "Update") {
                possibleResultsStore.possibleResultsService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updatePossibleResult.success) {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 ${res.updatePossibleResult.message}`,
                      })
                      setModalConfirm({ show: false })
                      possibleResultsStore.fetchListPossibleResults()
                    }
                  })
              }
            }}
            onClose={() => setModalConfirm({ show: false })}
          />
        </div>
      </Container>
    </>
  )
})

export default PossibleResults
