import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Container } from "reactstrap"

//import * as Models from "../models"
import * as Util from "../util"

import { Stores } from "../stores"
//import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Lookup = observer(() => {
  //const [errors, setErrors] = useState<Models.Lookup>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLookup, setHideAddLookup] = useState<boolean>(true)
  return (
    <>
      <Container>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={RootStore.routerStore.selectedComponents?.title || ""}
          />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Document Name">
                  <select
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const documentName = e.target.value as string
                      Stores.lookupStore.updateLookup({
                        ...Stores.lookupStore.lookup,
                        documentName,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {["Document Name 1"].map((item: any) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>

                <LibraryComponents.Atoms.Form.Input
                  label="Field Name"
                  placeholder="Field Name"
                  value={Stores.lookupStore.lookup?.fieldName}
                  onChange={(fieldName) => {
                    Stores.lookupStore.updateLookup({
                      ...Stores.lookupStore.lookup,
                      fieldName,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Input
                  label="Code"
                  placeholder="Code"
                  value={Stores.lookupStore.lookup?.code}
                  onChange={(code) => {
                    Stores.lookupStore.updateLookup({
                      ...Stores.lookupStore.lookup,
                      code,
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
                  label="Value"
                  placeholder="Value"
                  value={Stores.lookupStore.lookup?.value}
                  onChange={(value) => {
                    Stores.lookupStore.updateLookup({
                      ...Stores.lookupStore.lookup,
                      value,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.MultilineInput
                  rows={3}
                  label="Description"
                  name="txtDescription"
                  placeholder="Description"
                  value={Stores.lookupStore.lookup?.description}
                  onChange={(description) => {
                    Stores.lookupStore.updateLookup({
                      ...Stores.lookupStore.lookup,
                      description,
                    })
                  }}
                />
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
                      Stores.lookupStore.lookup,
                      Util.constraintsLookup
                    ) === undefined
                  ) {
                    RootStore.rootStore.setProcessLoading(true)
                    Stores.lookupStore.LookupService.addLookup(
                      Stores.lookupStore.lookup
                    ).then(() => {
                      RootStore.rootStore.setProcessLoading(false)
                      LibraryComponents.Atoms.ToastsStore.success(`Lookup created.`)
                      Stores.lookupStore.fetchListLookup()
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
                  //rootStore.LookupStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Atoms.Buttons.Button>
            </LibraryComponents.Atoms.List>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl">
            <FeatureComponents.Molecules.LookupList
              data={Stores.lookupStore.listLookup || []}
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
                  body: `Update Lookup!`,
                })
              }}
            />
          </div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                RootStore.rootStore.setProcessLoading(true)
                Stores.lookupStore.LookupService.deleteLookup(modalConfirm.id).then(
                  (res: any) => {
                    RootStore.rootStore.setProcessLoading(false)
                    if (res.status === 200) {
                      LibraryComponents.Atoms.ToastsStore.success(`Lookup deleted.`)
                      setModalConfirm({ show: false })
                      Stores.lookupStore.fetchListLookup()
                    }
                  }
                )
              } else if (type === "Update") {
                RootStore.rootStore.setProcessLoading(true)
                Stores.lookupStore.LookupService.updateSingleFiled(
                  modalConfirm.data
                ).then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(`Lookup updated.`)
                    setModalConfirm({ show: false })
                    Stores.lookupStore.fetchListLookup()
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

export default Lookup
