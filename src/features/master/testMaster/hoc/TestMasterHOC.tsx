/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

export const TestMasterHOC = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, testMasterStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          testMasterStore.updateTestMaster({
            ...testMasterStore.testMaster,
            rLab: loginStore.login.lab,
            pLab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
          
        }
          testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              status: getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
            })
          
        
        
          testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              environment:getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
            })
            testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              sufix:getDefaultLookupItem(
                routerStore.lookupItems,
                "SUFIX"
              ),
            })
            testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              prefix:getDefaultLookupItem(
                routerStore.lookupItems,
                "PREFIX"
              ),
            })
            testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              testType:getDefaultLookupItem(
                routerStore.lookupItems,
                "TEST_TYPE"
              ),
            })
            testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              category:getDefaultLookupItem(
                routerStore.lookupItems,
                "CATEGORY"
              ),
            })
            testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              disease:getDefaultLookupItem(
                routerStore.lookupItems,
                "DISEASE"
              ),
            })
            testMasterStore &&
            testMasterStore.updateTestMaster({
              ...testMasterStore.testMaster,
              workflow:getDefaultLookupItem(
                routerStore.lookupItems,
                "WORKFLOW"
              ),
            })
      }, [loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
