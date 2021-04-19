import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Util from "../util"
import * as Services from "../services"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Lab = observer(() => {
  const [errors, setErrors] = useState<Models.Labs>()
  const [deleteItem, setDeleteItem] = useState<any>({})
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  // const permssion = async () => {
  //   const permission = await RouterFlow.getPermission(
  //     RootStore.routerStore.userRouter,
  //     "Collection",
  //     "Lab"
  //   )
  //   RootStore.routerStore.updateUserPermission(permission)
  // }
  // useEffect(() => {
  //   permssion()
  // }, [RootStore.routerStore.userRouter, []])

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title="Lab"
          subTitle="Add, Edit & Delete Lab"
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
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
              <LibraryComponents.Atoms.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={Stores.labStore.labs?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(code, Util.constraintsLabs.code),
                  })
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    code,
                  })
                }}
                onBlur={(code) => {
                  Stores.labStore.LabService.checkExitsCode(code).then((res) => {
                    console.log({ res })
                    if (res)
                      if (res.length > 0) Stores.labStore.setExitsCode(true)
                      else Stores.labStore.setExitsCode(false)
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              {Stores.labStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Name"
                name="name"
                placeholder="Name"
                value={Stores.labStore.labs?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Util.validate.single(name, Util.constraintsLabs.name),
                  })
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
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
                  Util.validate(Stores.labStore.labs, Util.constraintsLabs) ===
                    undefined &&
                  !Stores.labStore.checkExitsCode
                ) {
                  RootStore.rootStore.setProcessLoading(true)
                  Services.addLab(Stores.labStore.labs).then(() => {
                    RootStore.rootStore.setProcessLoading(false)
                    LibraryComponents.Atoms.ToastsStore.success(`Lab created.`)
                    Stores.labStore.fetchListLab()
                    Stores.labStore.clear()
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
              icon={LibraryComponents.Atoms.Icons.Remove}
              onClick={() => {
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.LabList
            isDelete={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Edit/Modify"
            )}
            onDelete={(selectedItem) => {
              setDeleteItem(selectedItem)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...deleteItem}
          click={() => {
            RootStore.rootStore.setProcessLoading(true)
            Services.deleteLab(deleteItem.id).then((res: any) => {
              RootStore.rootStore.setProcessLoading(false)
              if (res.status === 200) {
                LibraryComponents.Atoms.ToastsStore.success(`Lab deleted.`)
                setDeleteItem({ show: false })
                Stores.labStore.fetchListLab()
              }
            })
          }}
          onClose={() => {
            setDeleteItem({ show: false })
          }}
        />
      </div>
    </>
  )
})

export default Lab
