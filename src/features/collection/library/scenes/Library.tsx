/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { LibraryList } from "../components/molecules"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { stores } from "@lp/library/stores"
import { Stores as PanelMasterStore } from "@lp/features/collection/masterPanel/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

export const Library = observer(() => {
  const [errors, setErrors] = useState<Models.Library>()
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
          Stores.libraryStore.updateLibrary({
            ...Stores.libraryStore.library,
            status: status.code as string,
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
          title={stores.routerStore.selectedComponents?.title || ""}
        />
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
          <LibraryComponents.Atoms.Grid cols={3}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                label="Code"
                placeholder="Code"
                value={Stores.libraryStore.library?.code}
                onChange={(code) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    code,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                placeholder="Description"
                value={Stores.libraryStore.library?.description}
                onChange={(description) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    description,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Usage Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const usageType = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      usageType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "USAGE_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Library Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const libraryType = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      libraryType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "LIBRARY_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Comment Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const commentType = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      commentType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "COMMENT_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      lab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs &&
                    LabStores.labStore.listLabs.map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.code} - ${item.name}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Department">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const department = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      department,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment &&
                    DepartmentStore.departmentStore.listDepartment.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Comments Target">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const commentsTarget = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      commentsTarget,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "COMMENTS_TARGET").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Details"
                placeholder="Detials"
                value={Stores.libraryStore.library?.details}
                onChange={(details) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    details,
                  })
                }}
              />
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Parameter">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const parameter = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      parameter,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "PARAMETER").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Action">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const action = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      action,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "ACTION").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Results">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const results = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      results,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "RESULTS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Value"
                placeholder="Value"
                value={Stores.libraryStore.library?.value}
                onChange={(value) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    value,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Reflex">
                <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
                  placeholder="Search by panel name or panel code"
                  data={{
                    defulatValues: [],
                    list: PanelMasterStore.masterPanelStore.listMasterPanel || [],
                    displayKey: ["panelName", "panelCode"],
                    findKey: ["panelName", "panelCode"],
                  }}
                  onUpdate={(items) => {
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      reflex: items,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Analyte"
                placeholder="Analyte"
                value={Stores.libraryStore.library?.analyte}
                onChange={(analyte) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    analyte,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Rule"
                placeholder="Rule"
                value={Stores.libraryStore.library?.rule}
                onChange={(rule) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    rule,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Toggle
                label="AB Normal"
                value={Stores.libraryStore.library?.abNormal}
                onChange={(abNormal) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    abNormal,
                  })
                }}
              />
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                label="Organism Group"
                placeholder="Organism Group"
                value={Stores.libraryStore.library?.organismGroup}
                onChange={(organismGroup) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    organismGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Organism Class"
                placeholder="Organism Class"
                value={Stores.libraryStore.library?.organismClass}
                onChange={(organismClass) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    organismClass,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="LO Age"
                placeholder="LO Age"
                value={Stores.libraryStore.library?.loAge}
                onChange={(loAge) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    loAge,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="HI Age"
                placeholder="HI Age"
                value={Stores.libraryStore.library?.hiAge}
                onChange={(hiAge) => {
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    hiAge,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Sex">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sex = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      sex,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SEX").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Sex Action">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sexAction = e.target.value
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      sexAction,
                    })
                  }}
                >  
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SEX_ACTION").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
                  Stores.libraryStore.library,
                  Utils.library
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  Stores.libraryStore.libraryService
                    .addAnalyteMaster(Stores.libraryStore.library)
                    .then(() => {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Library created.`,
                      })
                    })
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          {/* <LibraryList
            data={Stores.libraryStore.library || []}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
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
          /> */}
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.libraryStore.libraryService
                .deleteAnalyteMaster(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Library deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.libraryStore.fetchLibrary()
                  }
                })
            } else if (type === "Update") {
              Stores.libraryStore.libraryService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Library updated.`,
                    })
                    setModalConfirm({ show: false })
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

export default Library
