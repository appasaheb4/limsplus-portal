/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const DeginisationHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, deginisationStore, routerStore } = useStores()
      useEffect(()=>{
        
          deginisationStore && deginisationStore.updateDescription({
            ...deginisationStore.deginisation,
            environment: getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
          })
          if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
            deginisationStore.updateDescription({
              ...deginisationStore.deginisation,
              environment: loginStore.login.environment,
            })
          }
      },[loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
