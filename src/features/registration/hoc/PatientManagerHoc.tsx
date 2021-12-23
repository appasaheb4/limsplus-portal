/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const PatientManagerHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, patientManagerStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          patientManagerStore.updatePatientManager({
            ...patientManagerStore.patientManger,
            extraData: {
              ...patientManagerStore.patientManger?.extraData,
              environment: loginStore.login.environment,
            },
          })
        }
        patientManagerStore.updatePatientManager({
          ...patientManagerStore.patientManger,
          species: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PATIENT MANAGER - SPECIES"
          ),
          breed:
            LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT MANAGER - SPECIES"
            ) === "H"
              ? null
              : undefined,
          extraData: {  
            ...patientManagerStore.patientManger?.extraData,
            bloodGroup: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT VISIT - BLOOD_GROUP"
            ),
            enteredBy: loginStore.login.userId,
            status: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT MANAGER - STATUS"
            ),
            environment: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "PATIENT MANAGER - ENVIRONMENT"
            ),
          },
        })
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
