/* eslint-disable */
import React, { useCallback, useEffect, useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
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
      let labId: any
      useMemo(() => {
        labId = parseFloat(
          LibraryUtils.uuidv4(appStore.environmentValues?.LABID_LENGTH?.value || 4)
        )
      }, [appStore.environmentValues?.LABID_AUTO_GENERATE])
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
          labId:
            appStore.environmentValues?.LABID_AUTO_GENERATE?.value.toLowerCase() !==
            "no"
              ? labId
              : "",
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
      }, [loginStore.login, routerStore.lookupItems, appStore.environmentValues])

      useEffect(() => {
        // get Environment value
        //if (!_.isBoolean(appStore.environmentValues.LABID_AUTO_GENERATE.allLabs)) {
        environmentStore.EnvironmentService.findValue({
          input: {
            filter: {
              variable: ["LABID_AUTO_GENERATE", "LABID_LENGTH"],
              lab: loginStore.login.lab,
            },
          },
        }).then((res) => {
          if (!res.getEnviromentValue.success) return
          appStore.updateEnvironmentValue({
            ...appStore.environmentValues,
            LABID_AUTO_GENERATE: {
              ...appStore.environmentValues?.LABID_AUTO_GENERATE,
              allLabs: res.getEnviromentValue.enviromentValues.filter(
                (item) => item.variable === "LABID_AUTO_GENERATE"
              )[0].data[0].allLabs,
              value: res.getEnviromentValue.enviromentValues.filter(
                (item) => item.variable === "LABID_AUTO_GENERATE"
              )[0].data[0].value,
            },
            LABID_LENGTH: {
              ...appStore.environmentValues?.LABID_LENGTH,
              allLabs: res.getEnviromentValue.enviromentValues.filter(
                (item) => item.variable === "LABID_LENGTH"
              )[0].data[0].allLabs,
              value: res.getEnviromentValue.enviromentValues.filter(
                (item) => item.variable === "LABID_LENGTH"
              )[0].data[0].value,
            },
          })
        })
        //}
      }, [loginStore.login])
      return <Component {...props} />
    }
  )
}
