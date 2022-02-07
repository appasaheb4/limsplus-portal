/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

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
              status:getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
            })
        
       
          labStore &&
            labStore.updateLabs({
              ...labStore.labs,
              environment: getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
            })
            labStore &&
            labStore.updateLabs({
              ...labStore.labs,
              deliveryType: getDefaultLookupItem(
                routerStore.lookupItems,
                "DELIVERY_TYPE"
              ),
            })
            labStore &&
            labStore.updateLabs({
              ...labStore.labs,
              labType: getDefaultLookupItem(
                routerStore.lookupItems,
                "LAB_TYPE"
              ),
            })
        
      }, [loginStore.login, routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
