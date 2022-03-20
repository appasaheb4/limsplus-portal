/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const RolesHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, roleStore, routerStore } = useStores()
      useEffect(() => {
        
        roleStore.updateRole({
          ...roleStore.role,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          roleStore.updateRole({
            ...roleStore.role,
            environment: loginStore.login.environment,
          })
        }
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
