/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

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
              environment: getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
              deliveryType: getDefaultLookupItem(
                routerStore.lookupItems,
                "DELIVERY_TYPE"
              ),
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
