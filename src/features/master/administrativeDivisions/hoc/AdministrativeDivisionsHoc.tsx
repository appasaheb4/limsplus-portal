/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const AdministrativeDivisionsHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, administrativeDivisions, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          administrativeDivisions.updateAdministrativeDiv({
            ...administrativeDivisions.administrativeDiv,
            environment: loginStore.login.environment,
          })
        }
        administrativeDivisions.updateAdministrativeDiv({
          ...administrativeDivisions.administrativeDiv,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
          zone: getDefaultLookupItem(
            routerStore.lookupItems,
            "ZONE"
          ),
          sbu: getDefaultLookupItem(
            routerStore.lookupItems,
            "SBU"
          ),
        })
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
