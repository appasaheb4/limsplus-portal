/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

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
              status:getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ), 
              environment:getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
            })
          
        
        
          
          
        
      }, [loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
