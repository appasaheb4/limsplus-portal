import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Util from "../util"
import * as Services from "../services"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Deginisation = observer(() => {
  const [errors, setErrors] = useState<Models.IDeginisation>()
  const [deleteItem, setDeleteItem] = useState<any>({})
  const [hideAddDeginisation, setHideAddDeginisation] = useState<boolean>(true)

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title="Deginisation"
          subTitle="Add, Edit & Delete Deginisation"
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddDeginisation}
          onClick={() => setHideAddDeginisation(!hideAddDeginisation)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddDeginisation ? "hidden" : "shown")
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
                value={Stores.deginisationStore.deginisation?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(
                      code,
                      Util.constraintsDeginisation.code
                    ),
                  })
                  Stores.deginisationStore.updateDescription({
                    ...Stores.deginisationStore.deginisation,
                    code,
                  })
                }}
                onBlur={(code) => {
                  Stores.deginisationStore.DeginisationService.checkExitsCode(
                    code
                  ).then((res) => {
                    console.log({ res })
                    if (res)
                      if (res.length > 0) Stores.deginisationStore.setExitsCode(true)
                      else Stores.deginisationStore.setExitsCode(false)
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              {Stores.deginisationStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Description"
                name="description"
                placeholder="description"
                value={Stores.deginisationStore.deginisation?.description}
                onChange={(description) => {
                  setErrors({
                    ...errors,
                    description: Util.validate.single(
                      description,
                      Util.constraintsDeginisation.description
                    ),
                  })
                  Stores.deginisationStore.updateDescription({
                    ...Stores.deginisationStore.deginisation,
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
              icon={LibraryComponents.Atoms.Icons.Save}
              onClick={() => {
                if (
                  Util.validate(
                    Stores.deginisationStore.deginisation,
                    Util.constraintsDeginisation
                  ) === undefined &&
                  !Stores.deginisationStore.checkExitsCode
                ) {
                  RootStore.rootStore.setProcessLoading(true)
                  Services.addDeginisation(
                    Stores.deginisationStore.deginisation
                  ).then((res) => {
                    RootStore.rootStore.setProcessLoading(false)
                    if (res.status === 200) {
                      LibraryComponents.Atoms.ToastsStore.success(
                        `Deginisation created.`
                      )
                      Stores.deginisationStore.fetchListDeginisation()
                      Stores.deginisationStore.clear()
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
              icon={LibraryComponents.Atoms.Icons.Remove}
              onClick={() => {
                //rootStore.deginisationStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <FeatureComponents.Molecules.DeginisationList
            isDelete={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Edit/Modify"
            )}
            onDelete={(selectedItem) => setDeleteItem(selectedItem)}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...deleteItem}
          click={() => {
            RootStore.rootStore.setProcessLoading(true)
            Services.deleteDeginisation(deleteItem.id).then((res: any) => {
              RootStore.rootStore.setProcessLoading(false)
              if (res.status === 200) {
                LibraryComponents.Atoms.ToastsStore.success(`Deginisation deleted.`)
                setDeleteItem({ show: false })
                Stores.deginisationStore.fetchListDeginisation()
              }
            })
          }}
          onClose={() => setDeleteItem({ show: false })}
        />
      </div>
    </>
  )
})

export default Deginisation
