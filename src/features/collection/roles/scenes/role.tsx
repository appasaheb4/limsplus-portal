import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Util from "../util"


import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Role = observer(() => {
  const [errors, setErrors] = useState<Models.IRole>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddRole, setHideAddRole] = useState<boolean>(true)

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddRole}
          onClick={() => setHideAddRole(!hideAddRole)}
        />
      )}
      <div className=" mx-auto  flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl overflow-auto " +
            (hideAddRole ? "hidden" : "shown")
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
                value={Stores.roleStore.role?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(code, Util.constraintsRole.code),
                  })
                  Stores.roleStore.updateRole({
                    ...Stores.roleStore.role,
                    code,
                  })
                }}
                onBlur={(code) => {
                  Stores.roleStore.RoleService.checkExitsCode(code).then((res) => {
                    console.log({ res })
                    if (res)
                      if (res.length > 0) Stores.roleStore.setExitsCode(true)
                      else Stores.roleStore.setExitsCode(false)
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              {Stores.roleStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Description"
                name="description"
                placeholder="Description"
                value={Stores.roleStore.role?.description}
                onChange={(description) => {
                  setErrors({
                    ...errors,
                    description: Util.validate.single(
                      description,
                      Util.constraintsRole.description
                    ),
                  })
                  Stores.roleStore.updateRole({
                    ...Stores.roleStore.role,
                    description,
                  })
                }}
              />

              {errors?.description && (
                <span className="text-red-600 font-medium relative">
                  {errors.description}
                </span>
              )}
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
                  Util.validate(Stores.roleStore.role, Util.constraintsRole) ===
                    undefined &&
                  !Stores.roleStore.checkExitsCode
                ) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.roleStore.RoleService.addrole(Stores.roleStore.role).then(
                    () => {
                      RootStore.rootStore.setProcessLoading(false)
                      LibraryComponents.Atoms.ToastsStore.success(`Role created.`)
                      Stores.roleStore.fetchListRole()
                      Stores.roleStore.clear()
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
              icon={LibraryComponents.Atoms.Icon.Remove}
              onClick={() => {
                //rootStore.roleStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <FeatureComponents.Molecules.RoleList
            data={Stores.roleStore.listRole || []}
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
                body: `Update role!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.roleStore.RoleService.deleterole(modalConfirm.id).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(`Role deleted.`)
                    setModalConfirm({ show: false })
                    Stores.roleStore.fetchListRole()
                  }
                }
              )
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.roleStore.RoleService.updateSingleFiled(modalConfirm.data).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(`Role updated.`)
                    setModalConfirm({ show: false })
                    Stores.roleStore.fetchListRole()
                  }
                }
              )
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default Role
