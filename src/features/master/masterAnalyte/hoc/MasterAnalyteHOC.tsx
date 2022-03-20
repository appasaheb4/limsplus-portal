/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import * as LibraryUtils from "@/library/utils"

export const MasterAnalyteHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, masterAnalyteStore, routerStore } = useStores()
      useEffect(()=>{
        
        masterAnalyteStore && masterAnalyteStore.updateMasterAnalyte({
            ...masterAnalyteStore.masterAnalyte,
            lab: loginStore.login.lab,
            status: LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
              environment:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
              usage:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "USAGE"
              ),
              units:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "UNITS"
              ),
              analyteType:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "ANALYTE_TYPE"
              ),
              resultType:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "RESULT_TYPE"
              ),
          })
          if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
            masterAnalyteStore.updateMasterAnalyte({
              ...masterAnalyteStore.masterAnalyte,
              environment: loginStore.login.environment,
            })
          }  

      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
