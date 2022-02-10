/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const MethodsHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, methodsStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          methodsStore.updateMethods({
            ...methodsStore.methods,
            environment: loginStore.login.environment,
          })
        }  
        methodsStore.updateMethods({
            ...methodsStore.methods,
            status: getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
         methodsStore.updateMethods({
          ...methodsStore.methods,
          environment:getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
