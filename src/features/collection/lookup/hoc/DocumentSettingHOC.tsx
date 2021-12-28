/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const DocumentSettingHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, lookupStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          lookupStore.updateLookup({
            ...lookupStore.lookup,
            environment: loginStore.login.environment,
          })
        }
          lookupStore &&
          lookupStore.updateLookup({
            ...lookupStore.lookup,
            environment: LibraryUtils.getDefaultLookupItem(
              routerStore.lookupItems,
              "ENVIRONMENT"
            ),
          })
      },[loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
