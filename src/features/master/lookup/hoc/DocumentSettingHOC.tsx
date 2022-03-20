/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const DocumentSettingHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, lookupStore, routerStore } = useStores()
      useEffect(()=>{
        
          lookupStore &&
          lookupStore.updateLookup({
            ...lookupStore.lookup,
            environment: getDefaultLookupItem(
              routerStore.lookupItems,
              "ENVIRONMENT"
            ),
          })
          if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
            lookupStore.updateLookup({
              ...lookupStore.lookup,
              environment: loginStore.login.environment,
            })
          }
      },[loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
