/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const UsersHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, userStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          userStore.updateUser({
            ...userStore.user,
            environment: loginStore.login.environment,
          })
        }  
        userStore.updateUser({
            ...userStore.user,
            status: getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
         userStore.updateUser({
          ...userStore.user,
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
