/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import { getDefaultLookupItem } from "@/library/utils"

export const TestMasterHOC = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, testMasterStore, routerStore } = useStores()
      useEffect(() => {
        testMasterStore &&
          testMasterStore.updateTestMaster({
            ...testMasterStore.testMaster,
            rLab: loginStore.login.lab,
            status: getDefaultLookupItem(routerStore.lookupItems, "STATUS"),
            environment: getDefaultLookupItem(
              routerStore.lookupItems,
              "ENVIRONMENT"
            ),
            sufix: getDefaultLookupItem(routerStore.lookupItems, "SUFIX"),
            prefix: getDefaultLookupItem(routerStore.lookupItems, "PREFIX"),
            testType: getDefaultLookupItem(routerStore.lookupItems, "TEST_TYPE"),
            category: getDefaultLookupItem(routerStore.lookupItems, "CATEGORY"),
            disease: getDefaultLookupItem(routerStore.lookupItems, "DISEASE"),
            workflow: getDefaultLookupItem(routerStore.lookupItems, "WORKFLOW"),
          })
          if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
            testMasterStore.updateTestMaster({
               ...testMasterStore.testMaster,
               environment: loginStore.login.environment,
             })
           }
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
