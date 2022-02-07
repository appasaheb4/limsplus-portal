/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

export const PatientOrderHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, patientOrderStore, routerStore } = useStores()
      useEffect(() => {
        patientOrderStore.updatePatientOrder({
          ...patientOrderStore.patientOrder,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "PATIENT ORDER - ENVIRONMENT"
          ),
        })
      }, [loginStore.login, routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
