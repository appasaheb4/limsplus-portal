/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import {Toast,Header,PageHeading,PageHeadingLabDetails,ModalConfirm} 
  from "@/library/components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@/library/assets/css/accordion.css"

import { useStores } from "@/stores"

import { EnvironmentVariable } from "./EnvironmentVariable"
import { EnvironmentSettings } from "./EnvironmentSettings"

const Environment = observer(() => {
  const { loginStore, environmentStore, routerStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  return (
    <>
      <Header>
        <PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
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
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          if (type === "delete") {
            environmentStore.EnvironmentService.deleteRecord({
              input: { id: modalConfirm.id },
            }).then((res: any) => {
              if (res.removeEnviroment.success) {
                Toast.success({
                  message: `😊 ${res.removeEnviroment.message}`,
                })
                setModalConfirm({ show: false })
                environmentStore.fetchEnvironment({
                  documentType: "environmentVariable",
                })
                environmentStore.fetchEnvironment({
                  documentType: "environmentSettings",
                })
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
                Toast.success({
                  message: `😊 ${res.updateEnviroment.message}`,
                })
                setModalConfirm({ show: false })
                environmentStore.updateSelectedItems(undefined)
                // setTimeout(() => {   
                //   window.location.reload()
                // }, 2000)
                environmentStore.fetchEnvironment({ documentType: "environmentVariable" })
                environmentStore.fetchEnvironment({ documentType: "environmentSettings" })
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
