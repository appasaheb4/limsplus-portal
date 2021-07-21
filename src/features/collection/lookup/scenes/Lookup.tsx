/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Container } from "reactstrap"

import * as Models from "../models"
import * as Util from "../util"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"

import { Stores } from "../stores"
//import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

let router = dashboardRoutes

const Lookup = observer(() => {
  const [errors, setErrors] = useState<Models.Lookup>()
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Document Name">
                  <LibraryComponents.Molecules.AutocompleteGroupBy
                    data={router}
                    onChange={async (item: any, children: any) => {
                      const documentName = {
                        name: item.name,
                        title: item.title,
                        path: item.path,
                        children,
                      }
                      setErrors({
                        ...errors,
                        documentName: Util.validate.single(
                          documentName,
                          Util.lookup.documentName
                        ),
                      })
                      Stores.lookupStore.updateLookup({
                        ...Stores.lookupStore.lookup,
                        documentName,
                      })
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>
                <LibraryComponents.Atoms.Form.Input
                  label="Field Name"
                  placeholder="Field Name"
                  value={Stores.lookupStore.lookup?.fieldName}
                  onChange={(fieldName) => {
                    Stores.lookupStore.updateLookup({
                      ...Stores.lookupStore.lookup,
                      fieldName:fieldName.toUpperCase(),
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.InputWrapper label="Code & Value">
                  <LibraryComponents.Atoms.Grid cols={3}>
                    <LibraryComponents.Atoms.Form.Input
                      placeholder="Code"
                      value={Stores.lookupStore.lookup?.code}
                      onChange={(code) => {
                        Stores.lookupStore.updateLookup({
                          ...Stores.lookupStore.lookup,
                          code:code.toUpperCase(),
                        })
                      }}
                    />
                    <LibraryComponents.Atoms.Form.Input
                      placeholder="Value"
                      value={Stores.lookupStore.lookup?.value}
                      onChange={(value) => {
                        Stores.lookupStore.updateLookup({
                          ...Stores.lookupStore.lookup,
                          value,
                        })
                      }}
                    />
                    <div className="mt-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {
                          const value = Stores.lookupStore.lookup?.value
                          const code = Stores.lookupStore.lookup?.code
                          let arrValue = Stores.lookupStore.lookup?.arrValue || []
                          if (value === undefined || code === undefined)
                            return alert("Please enter value and code.")
                          if (value !== undefined) {
                            console.log({ len: arrValue.length })
                            arrValue !== undefined
                              ? arrValue.push({
                                  value,
                                  code,
                                })
                              : (arrValue = [
                                  {
                                    value,
                                    code,
                                  },
                                ])
                            Stores.lookupStore.updateLookup({
                              ...Stores.lookupStore.lookup,
                              arrValue,
                            })
                            Stores.lookupStore.updateLookup({
                              ...Stores.lookupStore.lookup,
                              value: "",
                              code: "",
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
                      {Stores.lookupStore.lookup?.arrValue?.map((item, index) => (
                        <div className="mb-2" key={index}>
                          <LibraryComponents.Atoms.Buttons.Button
                            size="medium"
                            type="solid"
                            icon={LibraryComponents.Atoms.Icon.Remove}
                            onClick={() => {
                              const firstArr =
                                Stores.lookupStore.lookup?.arrValue?.slice(
                                  0,
                                  index
                                ) || []
                              const secondArr =
                                Stores.lookupStore.lookup?.arrValue?.slice(
                                  index + 1
                                ) || []
                              const finalArray = [...firstArr, ...secondArr]
                              Stores.lookupStore.updateLookup({
                                ...Stores.lookupStore.lookup,
                                arrValue: finalArray,
                              })
                            }}
                          >
                            {`${item.value} - ${item.code}`}
                          </LibraryComponents.Atoms.Buttons.Button>
                        </div>
                      ))}
                    </div>
                  </LibraryComponents.Atoms.List>
                </LibraryComponents.Atoms.Form.InputWrapper>
              </LibraryComponents.Atoms.List>

              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Form.MultilineInput
                  rows={4}
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
                    Util.validate(Stores.lookupStore.lookup, Util.lookup) ===
                      undefined &&
                    Stores.lookupStore.lookup?.value === "" &&
                    Stores.lookupStore.lookup.value === ""
                  ) {
                    console.log({ sotre: Stores.lookupStore.lookup })

                    
                    Stores.lookupStore.LookupService.addLookup(
                      Stores.lookupStore.lookup
                    ).then(() => {
                      
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Lookup created.`,
                      })
                      Stores.lookupStore.fetchListLookup()
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
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl overflow-scroll">
            <FeatureComponents.Molecules.LookupList
              data={Stores.lookupStore.listLookup || []}
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
                
                Stores.lookupStore.LookupService.deleteLookup(modalConfirm.id).then(
                  (res: any) => {
                    
                    if (res.status === 200) {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Lookup deleted.`,
                      })
                      setModalConfirm({ show: false })
                      Stores.lookupStore.fetchListLookup()
                    }
                  }
                )
              } else if (type === "Update") {
                
                Stores.lookupStore.LookupService.updateSingleFiled(
                  modalConfirm.data
                ).then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Lookup updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.lookupStore.fetchListLookup()
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

export default Lookup
