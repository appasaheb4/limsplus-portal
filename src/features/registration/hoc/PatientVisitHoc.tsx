/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const PatientVisitHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const {
        loginStore,
        patientVisitStore,
        routerStore,
        environmentStore,
        appStore,
      } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          patientVisitStore.updatePatientVisit({
            ...patientVisitStore.patientVisit,
            extraData: {
              ...patientVisitStore.patientVisit.extraData,
              environment: loginStore.login.environment,
            },
          })
        }
        patientVisitStore.updatePatientVisit({
          ...patientVisitStore.patientVisit,
          rLab: loginStore.login.lab,
          deliveryType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PATIENT VISIT - DELIVERY_TYPE"
          ),
          ageUnits: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PATIENT VISIT - AGE_UNITS"
          ),
          status: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PATIENT VISIT - STATUS"
          ),
          extraData: {
            ...patientVisitStore.patientVisit.extraData,
            enteredBy: loginStore.login.userId,
            accountType: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - ACCOUNT_TYPE"
            ),
            deliveryMethod: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - DELIVERY_METHOD"
            ),
            environment: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - ENVIRONMENT"
            ),
            methodCollection: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - METHOD_COLLECTION"
            ),
            approvalStatus: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - APPROVAL_STATUS"
            ),
            reportStatus: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - REPORT_STATUS"
            ),
            loginInterface:
              loginStore.login.systemInfo?.device !== "Desktop" ? "M" : "D",
            registrationInterface: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - REGISTRATION_INTERFACE"
            ),
            billingMethod: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - BILLING_METHOD"
            ),
            archieve: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - ARCHIVED"
            ),
          },
        })
      }, [loginStore.login, routerStore.lookupItems])

      useEffect(() => {
        // get Environment value
        environmentStore.EnvironmentService.findValue({
          input: {
            filter: {
              variable: "LABID_AUTO_GENERATE",
              lab: loginStore.login.lab,
            },
          },
        }).then((res) => {
          if (!res.getEnviromentValue.success) return
          appStore.updateEnvironmentValue({
            ...appStore.environmentValues,
            LABID_AUTO_GENERATE: {
              ...appStore.environmentValues.LABID_AUTO_GENERATE,
              value: res.getEnviromentValue.data[0].value,
            },
          })
        })
      }, [loginStore.login])

      return <Component {...props} />
    }
  )
}
