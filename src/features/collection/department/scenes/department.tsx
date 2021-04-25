import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Container } from "reactstrap"

import * as Models from "../models"
import * as Util from "../util"
import * as Services from "../services"

import { Stores } from "../stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Department = observer(() => {
  const [errors, setErrors] = useState<Models.IDepartment>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddDepartment, setHideAddDepartment] = useState<boolean>(true)
  return (
    <>
      <Container>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={RootStore.routerStore.selectedComponents?.title || ""}
            subTitle="Add, Edit & Delete"
          />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddDepartment}
            onClick={() => setHideAddDepartment(!hideAddDepartment)}
          />
        )}
        <div className="mx-auto">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddDepartment ? "hidden" : "shown")
            }
          >
            <LibraryComponents.Atoms.Grid cols={2}>
              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="lab">
                  <select
                    name="lab"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value
                      setErrors({
                        ...errors,
                        lab: Util.validate.single(
                          lab,
                          Util.constraintsDepartment.lab
                        ),
                      })
                      Stores.departmentStore.updateDepartment({
                        ...Stores.departmentStore.department,
                        lab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LabStore.labStore.listLabs.map((item: any) => (
                      <option key={item.name} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>

                <LibraryComponents.Atoms.Form.Input
                  label="Code"
                  id="code"
                  placeholder="Code"
                  value={Stores.departmentStore.department?.code}
                  onChange={(code) => {
                    setErrors({
                      ...errors,
                      code: Util.validate.single(
                        code,
                        Util.constraintsDepartment.code
                      ),
                    })
                    Stores.departmentStore.updateDepartment({
                      ...Stores.departmentStore.department,
                      code,
                    })
                  }}
                  onBlur={(code) => {
                    Stores.departmentStore.DepartmentService.checkExitsCode(
                      code
                    ).then((res) => {
                      console.log({ res })
                      if (res)
                        if (res.length > 0) Stores.departmentStore.setExitsCode(true)
                        else Stores.departmentStore.setExitsCode(false)
                    })
                  }}
                />
                {errors?.code && (
                  <span className="text-red-600 font-medium relative">
                    {errors.code}
                  </span>
                )}
                {Stores.departmentStore.checkExitsCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
                <LibraryComponents.Atoms.Form.Input
                  label="Name"
                  name="name"
                  placeholder="Name"
                  value={Stores.departmentStore.department?.name}
                  onChange={(name) => {
                    setErrors({
                      ...errors,
                      name: Util.validate.single(
                        name,
                        Util.constraintsDepartment.name
                      ),
                    })
                    Stores.departmentStore.updateDepartment({
                      ...Stores.departmentStore.department,
                      name,
                    })
                  }}
                />

                {errors?.name && (
                  <span className="text-red-600 font-medium relative">
                    {errors.name}
                  </span>
                )}
              </LibraryComponents.Atoms.List>
            </LibraryComponents.Atoms.Grid>
            <br />

            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icons.Save}
                onClick={() => {
                  if (
                    Util.validate(
                      Stores.departmentStore.department,
                      Util.constraintsDepartment
                    ) === undefined
                  ) {
                    RootStore.rootStore.setProcessLoading(true)
                    Services.adddepartment(Stores.departmentStore.department).then(
                      () => {
                        RootStore.rootStore.setProcessLoading(false)
                        LibraryComponents.Atoms.ToastsStore.success(
                          `Department created.`
                        )
                        Stores.departmentStore.fetchListDepartment()
                        Stores.departmentStore.clear()
                      }
                    )
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
                icon={LibraryComponents.Atoms.Icons.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Atoms.Buttons.Button>
            </LibraryComponents.Atoms.List>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl">
            <FeatureComponents.Molecules.DepartmentList
              data={Stores.departmentStore.listDepartment || []}
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
                  body: `Update department!`,
                })
              }}
            />
          </div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                RootStore.rootStore.setProcessLoading(true)
                Stores.departmentStore.DepartmentService.deletedepartment(
                  modalConfirm.id
                ).then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(
                      `Department deleted.`
                    )
                    setModalConfirm({ show: false })
                    Stores.departmentStore.fetchListDepartment()
                  }
                })
              } else if (type === "Update") {
                RootStore.rootStore.setProcessLoading(true)
                Stores.departmentStore.DepartmentService.updateSingleFiled(
                  modalConfirm.data
                ).then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(
                      `Department updated.`
                    )
                    setModalConfirm({ show: false })
                    Stores.departmentStore.fetchListDepartment()
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

export default Department
