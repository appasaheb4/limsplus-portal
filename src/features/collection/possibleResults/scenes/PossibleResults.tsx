/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import { PossibleResultsList } from "../components/molecules"
import { Container } from "reactstrap"

import * as Models from "../models"
import * as Utils from "../util"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"

import { Stores } from "../stores"
import { Stores as AnalyteStore } from "@lp/features/collection/masterAnalyte/stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

let router = dashboardRoutes

export const PossibleResults = observer(() => {
  const [errors, setErrors] = useState<Models.PossibleResults>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
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

  return (
    <>
      <Container>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={stores.routerStore.selectedComponents?.title || ""}
          />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddLookup}
            onClick={() => setHideAddLookup(!hideAddLookup)}
          />
        )}
        <div className="mx-auto">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddLookup ? "shown" : "shown")
            }
          >
            <LibraryComponents.Atoms.Grid cols={2}>
              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Form.InputWrapper label="Analyte Code">
                  <select
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const analyte = JSON.parse(e.target.value)
                      // setErrors({
                      //   ...errors,
                      //   analyteCode: Utils.validate.single(
                      //     analyteCode,
                      //     Utils.possibleResults.analyteCode
                      //   ),
                      // })
                      Stores.possibleResultsStore.updatePossibleResults({
                        ...Stores.possibleResultsStore.possibleResults,
                        analyteCode: analyte.analyteCode,
                        analyteName: analyte.analyteName,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {AnalyteStore.masterAnalyteStore.listMasterAnalyte &&
                      AnalyteStore.masterAnalyteStore.listMasterAnalyte.map(
                        (item: any, index: number) => (
                          <option key={index} value={JSON.stringify(item)}>
                            {`${item.analyteCode} - ${item.analyteName}`}
                          </option>
                        )
                      )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
                <LibraryComponents.Atoms.Form.Input
                  disabled={true}
                  label="Analyte Name"
                  placeholder="Analyte Name"
                  value={Stores.possibleResultsStore.possibleResults?.analyteName}
                />
                <LibraryComponents.Atoms.Form.InputWrapper label="Conclusion Value">
                  <LibraryComponents.Atoms.Grid cols={5}>
                    <LibraryComponents.Atoms.Form.Input
                      placeholder="Result"
                      value={Stores.possibleResultsStore.possibleResults?.result}
                      onChange={(result) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
                          result,
                        })
                      }}
                    />
                    <LibraryComponents.Atoms.Form.Input
                      placeholder="Possible Value"
                      value={
                        Stores.possibleResultsStore.possibleResults?.possibleValue
                      }
                      onChange={(possibleValue) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
                          possibleValue,
                        })
                      }}
                    />
                    <LibraryComponents.Atoms.Form.Toggle
                      label="AB Normal"
                      value={Stores.possibleResultsStore.possibleResults?.abNormal}
                      onChange={(abNormal) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
                          abNormal,
                        })
                      }}
                    />
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Critical"
                      value={Stores.possibleResultsStore.possibleResults?.critical}
                      onChange={(critical) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
                          critical,
                        })
                      }}
                    />
                    <div className="mt-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {
                          const result =
                            Stores.possibleResultsStore.possibleResults?.result
                          const possibleValue =
                            Stores.possibleResultsStore.possibleResults
                              ?.possibleValue
                          let conclusionResult =
                            Stores.possibleResultsStore.possibleResults
                              ?.conclusionResult || []
                          if (result === undefined || possibleValue === undefined)
                            return alert("Please enter value and code.")
                          if (result !== undefined) {
                            conclusionResult !== undefined
                              ? conclusionResult.push({
                                  result,
                                  possibleValue,
                                  abNormal: false,
                                  critical: false,
                                })
                              : (conclusionResult = [
                                  {
                                    result,
                                    possibleValue,
                                    abNormal: false,
                                    critical: false,
                                  },
                                ])
                            Stores.possibleResultsStore.updatePossibleResults({
                              ...Stores.possibleResultsStore.possibleResults,
                              conclusionResult,
                            })
                            Stores.possibleResultsStore.updatePossibleResults({
                              ...Stores.possibleResultsStore.possibleResults,
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
                      {Stores.possibleResultsStore.possibleResults?.conclusionResult?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  Stores.possibleResultsStore.possibleResults?.conclusionResult?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  Stores.possibleResultsStore.possibleResults?.conclusionResult?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ] as typeof Stores.possibleResultsStore.possibleResults.conclusionResult
                                Stores.possibleResultsStore.updatePossibleResults({
                                  ...Stores.possibleResultsStore.possibleResults,
                                  conclusionResult: finalArray,
                                })
                              }}
                            >
                              {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AB Normal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
                </LibraryComponents.Atoms.Form.InputWrapper>
              </LibraryComponents.Atoms.List>
            </LibraryComponents.Atoms.Grid>
            <br />
            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icon.Save}
                onClick={() => {
                  const error = Utils.validate(
                    Stores.possibleResultsStore.possibleResults,
                    Utils.possibleResults
                  )
                  setErrorsMsg(error)
                  if (error === undefined) {
                    Stores.possibleResultsStore.possibleResultsService
                      .addPossibleResults(
                        Stores.possibleResultsStore.possibleResults
                      )
                      .then(() => {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Possible results created.`,
                        })
                        setTimeout(() => {
                          window.location.reload()
                        }, 2000)
                      })
                  } else {
                    LibraryComponents.Atoms.Toast.warning({
                      message: `😔 Please enter all information!`,
                    })
                  }
                }}
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
            <div>
              {errorsMsg &&
                Object.entries(errorsMsg).map((item, index) => (
                  <h6 className="text-red-700" key={index}>
                    {_.upperFirst(item.join(" : "))}
                  </h6>
                ))}
            </div>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl overflow-scroll">
            <PossibleResultsList
              data={Stores.possibleResultsStore.listPossibleResults || []}
              isDelete={RouterFlow.checkPermission(
                stores.routerStore.userPermission,
                "Delete"
              )}
              isEditModify={RouterFlow.checkPermission(
                stores.routerStore.userPermission,
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
            />
          </div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                Stores.possibleResultsStore.possibleResultsService
                  .deletePossibleResults(modalConfirm.id)
                  .then((res: any) => {
                    if (res.status === 200) {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Possible results deleted.`,
                      })
                      setModalConfirm({ show: false })
                      Stores.possibleResultsStore.fetchListPossibleResults()
                    }
                  })
              } else if (type === "Update") {
                Stores.possibleResultsStore.possibleResultsService
                  .updateSingleFiled(modalConfirm.data)
                  .then((res: any) => {
                    if (res.status === 200) {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Possible results updated.`,
                      })
                      setModalConfirm({ show: false })
                      Stores.possibleResultsStore.fetchListPossibleResults()
                      window.location.reload()
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
