import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Util from "../util"


import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Section = observer(() => {
  const [errors, setErrors] = useState<Models.Section>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "hidden" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={Stores.sectionStore.section?.code}
                onChange={(code) => {
                //   setErrors({
                //     ...errors,
                //     code: Util.validate.single(
                //       code,
                //       Util.constraintsSection.code
                //     ),
                //   })
                //   Stores.sectionStore.updateSection({
                //     ...Stores.sectionStore.section,
                //     code,
                //   })
                // }}
                // onBlur={(code) => {
                //   Stores.sectionStore.SectionService.checkExitsCode(
                //     code
                //   ).then((res) => {
                //     console.log({ res })
                //     if (res)
                //       if (res.length > 0) Stores.sectionStore.setExitsCode(true)
                //       else Stores.sectionStore.setExitsCode(false)
                //   })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              {/* {Stores.sectionStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )} */}
              <LibraryComponents.Atoms.Form.Input
                label="Description"
                name="description"
                placeholder="description"
                value={Stores.sectionStore.section?.description}
                onChange={(description) => {
                  // setErrors({
                  //   ...errors,
                  //   description: Util.validate.single(
                  //     description,
                  //     Util.constraintsSection.description
                  //   ),
                  // })
                  // Stores.sectionStore.updateDescription({
                  //   ...Stores.sectionStore.Section,
                  //   description,
                  // })
                }}
              />
              {/* {errors?.description && (
                <span className="text-red-600 font-medium relative">
                  {errors.description}
                </span>
              )} */}
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />

          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                if (
                  Util.validate(
                    Stores.sectionStore.section,
                    Util.constraintsSection
                  ) === undefined 
                ) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.sectionStore.SectionService.addSection(
                    Stores.sectionStore.section
                  ).then((res) => {
                    RootStore.rootStore.setProcessLoading(false)
                    if (res.status === 200) {
                      LibraryComponents.Atoms.ToastsStore.success(
                        `Section created.`
                      )
                      Stores.sectionStore.fetchListSection()
                      //Stores.sectionStore.clear()
                    } else {
                      LibraryComponents.Atoms.ToastsStore.error("Please try again")
                    }
                  })
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
                //rootStore.SectionStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <FeatureComponents.Molecules.SectionList
            data={Stores.sectionStore.listSection || []}
            isDelete={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
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
              RootStore.rootStore.setProcessLoading(true)
              Stores.sectionStore.SectionService.deleteSection(
                modalConfirm.id
              ).then((res: any) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.Atoms.ToastsStore.success(
                    `Section deleted.`
                  )
                  setModalConfirm({ show: false })
                  Stores.sectionStore.fetchListSection()
                }
              })
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.sectionStore.SectionService.updateSingleFiled(
                modalConfirm.data
              ).then((res: any) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.Atoms.ToastsStore.success(
                    `Section updated.`
                  )
                  setModalConfirm({ show: false })
                  Stores.sectionStore.fetchListSection()
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
