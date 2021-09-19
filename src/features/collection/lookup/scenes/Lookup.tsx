/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { Accordion, AccordionItem } from "react-sanfona"

import { useForm, Controller } from "react-hook-form"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Container } from "reactstrap"

import { dashboardRouter as dashboardRoutes } from "@lp/routes"
import { useStores } from "@lp/stores"
import { Stores } from "../stores"
import { stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
let router = dashboardRoutes

import { NewField } from "./NewField"
import { GeneralField } from "./GeneralField"

const Lookup = observer(() => {
  const { loginStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
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
          <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddLookup}
            onClick={() => setHideAddLookup(!hideAddLookup)}
          />
        )}

        <Accordion>
          {[{ title: "DOCUMENT SETTING" }, { title: "GENERAL SETTING" }].map(
            (item) => {
              return (
                <AccordionItem
                  title={`${item.title}`}
                  expanded={item.title === "DOCUMENT SETTING"}
                >
                  {item.title === "DOCUMENT SETTING" && (
                    <>
                      <NewField />
                    </>
                  )}
                  {item.title === "GENERAL SETTING" && (
                    <>
                      <GeneralField />
                    </>
                  )}
                </AccordionItem>
              )
            }
          )}
        </Accordion>

        <div className="mx-auto">
          <br />
          <div className="p-2 rounded-lg shadow-xl overflow-scroll">
            <FeatureComponents.Molecules.LookupList
              data={Stores.lookupStore.listLookup || []}
              totalSize={Stores.lookupStore.listLookupCount}
              extraData={{
                lookup: Stores.lookupStore.lookup,
                updateLookup: Stores.lookupStore.updateLookup,
                lookupItems: stores.routerStore.lookupItems,
              }}
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
              onPageSizeChange={(page, size) => {
                // console.log({page,size})
                Stores.lookupStore.fetchListLookup(page, size)
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
