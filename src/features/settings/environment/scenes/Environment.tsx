/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import * as Utils from "../utils"
import * as Models from "../models"

import { useStores } from "@lp/stores"
import { Stores } from "../stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

import { EnvironmentVariable } from "./EnvironmentVariable"
import { EnvironmentSettings } from "./EnvironmentSettings"

const Environment = observer(() => {
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      <Accordion>
        {[{ title: "Environment Variable" }, { title: "Environment Setting" }].map(
          (item) => {
            return (
              <AccordionItem
                title={`${item.title}`}
                expanded={item.title === "Environment Variable"}
              >
                {item.title === "Environment Variable" && (
                  <>
                    <EnvironmentVariable
                      onModalConfirm={(item) => setModalConfirm(item)}
                    />
                  </>
                )}
                {item.title === "Environment Setting" && (
                  <>
                    <EnvironmentSettings
                      onModalConfirm={(item) => setModalConfirm(item)}
                    />
                  </>
                )}
              </AccordionItem>
            )
          }
        )}
      </Accordion>
      <LibraryComponents.Molecules.ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          if (type === "delete") {
            Stores.enviromentStore.EnvironmentService.deleteRecord({
              input: { id: modalConfirm.id },
            }).then((res: any) => {
              if (res.deleteEnvironment.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.deleteEnvironment.message}`,
                })
                setModalConfirm({ show: false })
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              }
            })
          } else if (type === "update") {
            Stores.enviromentStore.EnvironmentService.updateSingleFiled({
              input: {
                ...modalConfirm.data,
                value: JSON.stringify(modalConfirm.data.value),
              },
            }).then((res: any) => {
              if (res.updateSingleFiledEnvironment.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.updateSingleFiledEnvironment.message}`,
                })
                setModalConfirm({ show: false })
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              }
            })
          }
        }}
        onClose={() => setModalConfirm({ show: false })}
      />
    </>
  )
})

export default Environment
