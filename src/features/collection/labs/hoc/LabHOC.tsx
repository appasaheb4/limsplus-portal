/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const LabHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, labStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          labStore.updateLabs({
            ...labStore.labs,
            environment: loginStore.login.environment,
          })
          
        }
        
          labStore &&
            labStore.updateLabs({
              ...labStore.labs,
              status:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
            })
        
       
          labStore &&
            labStore.updateLabs({
              ...labStore.labs,
              environment: LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
            })
        
      }, [loginStore.login, routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
