/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"

import {
  PatientManager,
  PatientVisit,
  PatientOrder,
  PatientSample,
  InformationGroup,
  PatientResult,
  SpecialResult,
} from "../PatientRegistration"
import { useStores } from "@lp/stores"
import { stores } from "@lp/stores"
const PatientRegistation = observer(() => {
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
      <div>
        <Accordion>
          {[
            { title: "PATIENT MANAGER" },
            { title: "PATIENT VISIT" },
            { title: "PATIENT ORDER" },
            { title: "PATIENT SAMPLE" },
            { title: "PATIENT RESULT" },
          ].map((item) => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === "PATIENT MANAGER"}
              >
                {item.title === "PATIENT MANAGER" && <PatientManager />}
                {item.title === "PATIENT VISIT" && <PatientVisit />}
                {item.title === "PATIENT ORDER" && <PatientOrder />}
                {item.title === "PATIENT SAMPLE" && <PatientSample />}
                {item.title === "PATIENT RESULT" && <PatientResult />}
              </AccordionItem>
            )
          })}
        </Accordion>  
      </div>

      <div className="flex flex-row items-center justify-center mb-20">
        <h4>SPECIMEN AND TEST DETAILS</h4>
      </div>
      <div>
        <Accordion>
          {[
            { title: "INFORMATION GROUP" },
            { title: "SPECIAL RESULT" },
            { title: "SAMPLE" },
            { title: "PANEL" },
            { title: "TEST" },
            { title: "ANALYTE" },
          ].map((item) => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === "Patient Manager"}
              >
                {item.title === "INFORMATION GROUP" && <InformationGroup />},
                {item.title === "SPECIAL RESULT" && <SpecialResult />}
                {item.title === "SAMPLE" && <></>}
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      <LibraryComponents.Molecules.ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          // if (type === "Delete") {
          //
          //   Stores.enviromentSettingsStore.EnvironmentSettingsService.deleteEnvironmentSettings(
          //     modalConfirm.id
          //   ).then((res: any) => {
          //     console.log({ res })
          //     if (res.status === 200) {
          //
          //       LibraryComponents.Atoms.ToastsStore.success(`Items deleted.`)
          //       setModalConfirm({ show: false })
          //       setTimeout(() => {
          //         window.location.reload()
          //       }, 2000)
          //     }
          //   })
          // } else if (type === "Update") {
          //
          //   Stores.enviromentSettingsStore.EnvironmentSettingsService.updateSingleFiled(
          //     modalConfirm.data
          //   ).then((res: any) => {
          //
          //     if (res.status === 200) {
          //       LibraryComponents.Atoms.ToastsStore.success(`Item updated.`)
          //       setModalConfirm({ show: false })
          //       setTimeout(() => {
          //         window.location.reload()
          //       }, 1000)
          //     }
          //   })
          //}
        }}
        onClose={() => setModalConfirm({ show: false })}
      />
    </>
  )
})

export default PatientRegistation
