/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const SalesTeamHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, salesTeamStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          salesTeamStore.updateSalesTeam({
            ...salesTeamStore.salesTeam,
            environment: loginStore.login.environment,
          })
        }
        salesTeamStore.updateSalesTeam({
          ...salesTeamStore.salesTeam,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
          salesHierarchy: getDefaultLookupItem(
            routerStore.lookupItems,
            "SALES_HIERARCHY"
          ),
        })
        
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
