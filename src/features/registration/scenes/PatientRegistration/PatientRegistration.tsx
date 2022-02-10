/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import {Header,
  PageHeading,PageHeadingLabDetails}
   from "@/library/components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@/library/assets/css/accordion.css"

import {
  PatientManager,
  PatientVisit,
  PatientOrder,
  PatientSample,
  InformationGroup,
  PatientResult,
  SpecialResult,
  PatientTest
} from "../index"
import { useStores } from "@/stores"
import { stores } from "@/stores"
const PatientRegistation = observer(() => {
  const { loginStore } = useStores()
  return (
    <>
      <Header>
        <PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div>
        <Accordion>
          {[
            { title: "PATIENT MANAGER" },
            { title: "PATIENT VISIT" }, 
            { title: "PATIENT ORDER" },
            { title: "PATIENT TEST" },
            { title: "PATIENT RESULT" },
            { title: "PATIENT SAMPLE" },
          ].map((item) => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === "PATIENT MANAGER"}
              >  
                {item.title === "PATIENT MANAGER" && <PatientManager />}
                {item.title === "PATIENT VISIT" && <PatientVisit />}
                {item.title === "PATIENT ORDER" && <PatientOrder />}
                {item.title === "PATIENT TEST" && <PatientTest/>}
                {item.title === "PATIENT RESULT" && <PatientResult />}
                {item.title === "PATIENT SAMPLE" && <PatientSample />}
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
    </>
  )
})

export default PatientRegistation
