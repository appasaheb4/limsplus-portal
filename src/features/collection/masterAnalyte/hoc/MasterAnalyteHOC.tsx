/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const MasterAnalyteHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, masterAnalyteStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          masterAnalyteStore.updateMasterAnalyte({
            ...masterAnalyteStore.masterAnalyte,
            lab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
        }  
        masterAnalyteStore && masterAnalyteStore.updateMasterAnalyte({
            ...masterAnalyteStore.masterAnalyte,
            status: LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
        masterAnalyteStore && masterAnalyteStore.updateMasterAnalyte({
          ...masterAnalyteStore.masterAnalyte,
          environment:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
