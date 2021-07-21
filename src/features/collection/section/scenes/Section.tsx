/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import {SectionList} from '../components/molecules'

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"

const Section = observer(() => {
  const [errors, setErrors] = useState<Models.Section>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
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
          Stores.sectionStore.updateSection({
            ...Stores.sectionStore.section,
            status: status.code,
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
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "shown" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Department Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const departmentCode = e.target.value as string
                    setErrors({
                      ...errors,
                      departmentCode: Utils.validate.single(
                        departmentCode,
                        Utils.section.departmentCode
                      ),
                    })
                    Stores.sectionStore.updateSection({
                      ...Stores.sectionStore.section,
                      departmentCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment &&
                    DepartmentStore.departmentStore.listDepartment.map(
                      (item: any, key: number) => (
                        <option key={key} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={Stores.sectionStore.section?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Utils.validate.single(code, Utils.section.code),
                  })
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    code,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Name"
                placeholder="Name"
                value={Stores.sectionStore.section?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Utils.validate.single(name, Utils.section.name),
                  })
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    name,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Short Name"
                placeholder="Short Name"
                value={Stores.sectionStore.section?.shortName}
                onChange={(shortName) => {
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    shortName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Section In Charge"
                placeholder="Section In Charge"
                value={Stores.sectionStore.section?.sectionInCharge}
                onChange={(sectionInCharge) => {
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    sectionInCharge,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                type="number"
                label="Mobile No"
                placeholder="Mobile No"
                value={Stores.sectionStore.section?.mobieNo}
                onChange={(mobieNo) => {
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    mobieNo,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                type="number"
                label="Contact No"
                placeholder="Contact No"
                value={Stores.sectionStore.section?.contactNo}
                onChange={(contactNo) => {
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    contactNo,
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
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="FYI line"
                placeholder="FYI line"
                value={Stores.sectionStore.section?.fyiLine}
                onChange={(fyiLine) => {
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    fyiLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Work line"
                placeholder="Work line"
                value={Stores.sectionStore.section?.workLine}
                onChange={(workLine) => {
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    workLine,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  value={Stores.sectionStore.section?.status}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.sectionStore.updateSection({
                      ...Stores.sectionStore.section,
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
                  Stores.sectionStore.section,
                  Utils.section
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  
                  Stores.sectionStore.sectionService
                    .addSection(Stores.sectionStore.section)
                    .then((res) => {
                      
                      if (res.status === 200) {
                        LibraryComponents.Atoms.ToastsStore.success(
                          `Section created.`
                        )
                      } else {
                        LibraryComponents.Atoms.ToastsStore.error("Please try again")
                      }
                    })
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.ToastsStore.warning(
                    "Please enter all information!"
                  )
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
        <div className="p-2 rounded-lg shadow-xl">
          <SectionList
            data={Stores.sectionStore.listSection || []}
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
                body: `Update Section!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.sectionStore.sectionService
                .deleteSection(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Section deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sectionStore.fetchSections()
                  }
                })
            } else if (type === "Update") {
              
              Stores.sectionStore.sectionService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Section updated.`,
                    })
                    setModalConfirm({ show: false })
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
                  }  
                })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default Section
