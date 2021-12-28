/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const TestAnalyteMappingHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, testAnalyteMappingStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          testAnalyteMappingStore.updateTestAnalyteMapping({
            ...testAnalyteMappingStore.testAnalyteMapping,
            lab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
        }  
        testAnalyteMappingStore.updateTestAnalyteMapping({
            ...testAnalyteMappingStore.testAnalyteMapping,
            status: LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
         testAnalyteMappingStore.updateTestAnalyteMapping({
          ...testAnalyteMappingStore.testAnalyteMapping,
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
