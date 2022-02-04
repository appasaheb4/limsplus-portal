/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

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
        })
        administrativeDivisions.updateAdministrativeDiv({
          ...administrativeDivisions.administrativeDiv,
          zone: getDefaultLookupItem(
            routerStore.lookupItems,
            "ZONE"
          ),
        })
        administrativeDivisions.updateAdministrativeDiv({
          ...administrativeDivisions.administrativeDiv,
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
