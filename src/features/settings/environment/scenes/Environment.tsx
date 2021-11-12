/* eslint-disable */
import React, {  useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"

import { useStores } from "@lp/stores"
   
import { EnvironmentVariable } from "./EnvironmentVariable"
import { EnvironmentSettings } from "./EnvironmentSettings"

const Environment = observer(() => {
  const { loginStore, environmentStore, routerStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />   
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      <Accordion>
        {[{ title: "Environment Variable" }, { title: "Environment Setting" }].map(
          (item) => {
            return (
              <AccordionItem
                title={`${item.title}`}
                expanded={item.title === "Environment Setting"}
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
            environmentStore.EnvironmentService.deleteRecord({
              input: { id: modalConfirm.id },
            }).then((res: any) => {
              if (res.removeEnviroment.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.removeEnviroment.message}`,
                })
                setModalConfirm({ show: false })
                environmentStore.fetchEnvironment({ type: "environmentVariable" })
                environmentStore.fetchEnvironment({ type: "environmentSettings" })
              }
            })
          } else if (type === "update") {
            environmentStore.EnvironmentService.updateSingleFiled({
              input: {
                _id: modalConfirm.data.id,
                [modalConfirm.data.dataField]: modalConfirm.data.value,
              },
            }).then((res: any) => {
              if (res.updateEnviroment.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.updateEnviroment.message}`,
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
