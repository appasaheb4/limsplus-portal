/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const TestPanelMappingHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, testPanelMappingStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          testPanelMappingStore.updateTestPanelMapping({
            ...testPanelMappingStore.testPanelMapping,
            lab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
          
        }
        
          testPanelMappingStore &&
            testPanelMappingStore.updateTestPanelMapping({
              ...testPanelMappingStore.testPanelMapping,
              status:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ), 
            })
          
        
        
          testPanelMappingStore &&
            testPanelMappingStore.updateTestPanelMapping({
              ...testPanelMappingStore.testPanelMapping,
              environment:LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
            })
          
        
      }, [loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
