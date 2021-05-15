/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import * as Utils from "../utils"
import * as Models from "../models"

import SessionManagement from "./SessionManagement"

import { Stores } from "../stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const EnvironmentSettings = observer(() => {
  const [modalConfirm, setModalConfirm] = useState<any>()
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      <Accordion allowMultiple>
        {[{ title: "Session" }].map((item) => {
          return (
            <AccordionItem
              title={`${item.title}`}
              expanded={item.title === "Session"}
            >
              {item.title === "Session" && (
                <>
                  <SessionManagement
                    onModalConfirm={(item) => setModalConfirm(item)}
                  />
                </>
              )}
            </AccordionItem>
          )
        })}
      </Accordion>
      <LibraryComponents.Molecules.ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          if (type === "Delete") {
            RootStore.rootStore.setProcessLoading(true)
            Stores.enviromentSettingsStore.EnvironmentSettingsService.deleteEnvironmentSettings(
              modalConfirm.id
            ).then((res: any) => {
              console.log({ res })

              if (res.status === 200) {
                RootStore.rootStore.setProcessLoading(false)
                LibraryComponents.Atoms.ToastsStore.success(`Items deleted.`)
                setModalConfirm({ show: false })
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              }
            })
          } else if (type === "Update") {
            // RootStore.rootStore.setProcessLoading(true)
            // Stores.userStore.UsersService.updateSingleFiled(modalConfirm.data).then(
            //   (res: any) => {
            //     RootStore.rootStore.setProcessLoading(false)
            //     if (res.status === 200) {
            //       LibraryComponents.Atoms.ToastsStore.success(`User updated.`)
            //       setModalConfirm({ show: false })
            //       setTimeout(() => {
            //         window.location.reload()
            //       }, 1000)
            //     }
            //   }
            // )
          }
        }}
        onClose={() => setModalConfirm({ show: false })}
      />
    </>
  )
})

export default EnvironmentSettings
