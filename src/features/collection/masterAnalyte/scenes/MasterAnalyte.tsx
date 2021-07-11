/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterAnalyte = observer(() => {
  const [errors, setErrors] = useState<Models.MasterAnalyte>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      if (items) {
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.masterAnalyteStore.updateMasterAnalyte({
            ...Stores.masterAnalyteStore.masterAnalyte,
            status: status.code
          })
        }
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(RootStore.routerStore.userPermission),
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
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder="Date Creation"
                value={LibraryUtils.moment
                  .unix(Stores.masterAnalyteStore.masterAnalyte?.dateCreation || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active From"
                placeholder="Date Active From"
                value={LibraryUtils.moment
                  .unix(Stores.masterAnalyteStore.masterAnalyte?.dateActiveFrom || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active To"
                placeholder="Date Active T0"
                value={LibraryUtils.moment
                  .unix(Stores.masterAnalyteStore.masterAnalyte?.dateActiveTo || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder="Version"
                value={Stores.masterAnalyteStore.masterAnalyte?.version}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder="Key Num"
                value={Stores.masterAnalyteStore.masterAnalyte?.keyNum}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder="Entered By"
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  value={Stores.masterAnalyteStore.masterAnalyte?.lab}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    setErrors({
                      ...errors,
                      lab: Utils.validate.single(lab, Utils.masterAnalyte.lab),
                    })
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      lab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              {errors?.lab && (
                <span className="text-red-600 font-medium relative">
                  {errors.lab}
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Analyte Code"
                name="txtAnalyteCode"
                placeholder="Analyte Code"
                value={Stores.masterAnalyteStore.masterAnalyte?.analyteCode}
                onChange={(analyteCode) => {
                  setErrors({
                    ...errors,
                    analyteCode: Utils.validate.single(
                      analyteCode,
                      Utils.masterAnalyte.analyteCode
                    ),
                  })
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    analyteCode:analyteCode.toUpperCase(),
                  })
                }}
              />
              {errors?.analyteCode && (
                <span className="text-red-600 font-medium relative">
                  {errors.analyteCode}
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Analyte Name"
                name="txtAnalyteName"
                placeholder="Analyte Name"
                value={Stores.masterAnalyteStore.masterAnalyte?.analyteName}
                onChange={(analyteName) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    analyteName:analyteName.toUpperCase(),
                  })
                }}
              />

              <LibraryComponents.Atoms.Grid cols={4}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Bill"
                  id="modeBill"
                  value={Stores.masterAnalyteStore.masterAnalyte?.bill}
                  onChange={(bill) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      bill,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="AutoRelease"
                  id="modeAutoRelease"
                  value={Stores.masterAnalyteStore.masterAnalyte?.autoRelease}
                  onChange={(autoRelease) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      autoRelease,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Hold OOS"
                  id="modeHoldOOS"
                  value={Stores.masterAnalyteStore.masterAnalyte?.holdOOS}
                  onChange={(holdOOS) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      holdOOS,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="InstantResult"
                  id="modeInstantResult"
                  value={Stores.masterAnalyteStore.masterAnalyte?.instantResult}
                  onChange={(instantResult) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      instantResult,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                name="txtDescription"
                placeholder="Description"
                value={Stores.masterAnalyteStore.masterAnalyte?.description}
                onChange={(description) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    description,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Short Name"
                name="txtShortName"
                placeholder="Short Name"
                value={Stores.masterAnalyteStore.masterAnalyte?.shortName}
                onChange={(shortName) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    shortName:shortName.toUpperCase()
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Price"
                name="txtPrice"
                placeholder="Price"
                type="number"
                value={Stores.masterAnalyteStore.masterAnalyte?.price}
                onChange={(price) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    price
                  })
                }}
              />
              {/* <LibraryComponents.Atoms.Form.InputDate
                label="Schedule"
                name="txtSchedule"
                placeholder="Schedule"
                value={LibraryUtils.moment
                  .unix(Stores.masterAnalyteStore.masterAnalyte?.schedule || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  const formatDate = LibraryUtils.moment(schedule).format(
                    "YYYY-MM-DD HH:mm"
                  )
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    schedule: LibraryUtils.moment(formatDate).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Tube Groups"
                name="txtTubeGroups"
                placeholder="Tube Groups"
                value={Stores.masterAnalyteStore.masterAnalyte?.tubeGroups}
                onChange={(tubeGroups) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    tubeGroups,
                  })
                }}
              /> */}
              <LibraryComponents.Atoms.Form.Input
                label="Analyte Method"
                name="txtAnalyteMethod"
                placeholder="Analyte Method"
                value={Stores.masterAnalyteStore.masterAnalyte?.analyteMethod}
                onChange={(analyteMethod) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    analyteMethod,
                  })
                }}
              />
              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Workflow">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      workflow,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "WORKFLOW"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Sample Type"
                id="optionSampleType"
              >
                <select
                  name="optionSampleTypes"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["sampleType1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper> */}

              <LibraryComponents.Atoms.Form.Input
                label="Calcy Name"
                name="txtCalcyName"
                placeholder="Calcy Name"
                value={Stores.masterAnalyteStore.masterAnalyte?.calcyName}
                onChange={(calcyName) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    calcyName:calcyName.toUpperCase()
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="High"
                name="txtHigh"
                placeholder="High"
                value={Stores.masterAnalyteStore.masterAnalyte?.high}
                onChange={(high) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    high:high.toUpperCase()
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Low"
                name="txtLow"
                placeholder="Low"
                value={Stores.masterAnalyteStore.masterAnalyte?.low}
                onChange={(low) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    low:low.toUpperCase()
                  })
                }}
              />
              <LibraryComponents.Atoms.Grid cols={5}>
               
                <LibraryComponents.Atoms.Form.Toggle
                  label="Method"
                  id="modeMethod"
                  value={Stores.masterAnalyteStore.masterAnalyte?.method}
                  onChange={(method) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      method,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Display"
                  id="modeDisplay"
                  value={Stores.masterAnalyteStore.masterAnalyte?.display}
                  onChange={(display) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      display,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Calculation Flag"
                  id="modeCalculationFlag"
                  value={Stores.masterAnalyteStore.masterAnalyte?.calculationFlag}
                  onChange={(calculationFlag) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      calculationFlag,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Repitation"
                  id="modeRepitation"
                  value={Stores.masterAnalyteStore.masterAnalyte?.repetition}
                  onChange={(repetition) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      repetition,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Picture"
                id="optionPicture"
              >
                <select
                  value={Stores.masterAnalyteStore.masterAnalyte?.picture}
                  name="optionPicture"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const picture = e.target.value as "0" | "1" | "2" | "3"
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      picture,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["0", "1", "2", "3"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Units">
                <select
                  value={Stores.masterAnalyteStore.masterAnalyte?.units}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const units = e.target.value as string
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      units
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "UNITS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Usage">
                <select
                  value={Stores.masterAnalyteStore.masterAnalyte?.usage}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const usage = e.target.value
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      usage,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "USAGE").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="CPT Code"
                name="txtCPTCode"
                placeholder="CPT Code"
                value={Stores.masterAnalyteStore.masterAnalyte?.cptCode}
                onChange={(cptCode) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    cptCode:cptCode.toUpperCase()
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  value={Stores.masterAnalyteStore.masterAnalyte?.status}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
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
                  Stores.masterAnalyteStore.masterAnalyte,
                  Utils.masterAnalyte
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  if (!Stores.masterAnalyteStore.masterAnalyte?.duplicateId) {
                    Stores.masterAnalyteStore.masterAnalyteService
                      .addAnalyteMaster({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        enteredBy: LoginStore.loginStore.login?._id,
                      })
                      .then(() => {
                        RootStore.rootStore.setProcessLoading(false)
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Analyte master created.`,
                        })  
                        Stores.masterAnalyteStore.fetchAnalyteMaster()
                      })
                  } else {
                    Stores.masterAnalyteStore.masterAnalyteService
                      .duplicateAnalyteMaster({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        enteredBy: LoginStore.loginStore.login?._id,
                      })
                      .then(() => {
                        RootStore.rootStore.setProcessLoading(false)
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Analyte master duplicate created.`,
                        })
                        Stores.masterAnalyteStore.fetchAnalyteMaster()
                      })
                  }
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
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
          <div>
            {errorsMsg &&
              Object.entries(errorsMsg).map((item, index) => (
                <h6 className="text-red-700" key={index}>{_.upperFirst(item.join(" : "))}</h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.MasterAnalyteList
            data={Stores.masterAnalyteStore.listMasterAnalyte || []}
            isDelete={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
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
            onDuplicate={(item) => {
              setModalConfirm({
                show: true,
                type: "Duplicate",
                data: item,
                title: "Are you duplicate?",
                body: `Duplicate this record`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.masterAnalyteStore.masterAnalyteService
                .deleteAnalyteMaster(modalConfirm.id)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Analyte master deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterAnalyteStore.fetchAnalyteMaster()
                  }
                })
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.masterAnalyteStore.masterAnalyteService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Analyte master updated.`,
                    })
                    setModalConfirm({ show: false })
                    window.location.reload()
                  }
                })
            } else if (type === "Duplicate") {
              Stores.masterAnalyteStore.updateMasterAnalyte({
                ...modalConfirm.data,
                _id:undefined,
                duplicateId: modalConfirm.data._id,
                version: modalConfirm.data.version + 1,
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

export default MasterAnalyte
