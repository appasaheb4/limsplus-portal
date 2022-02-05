/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

export const DeginisationHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, departmentStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          departmentStore.updateDepartment({
            ...departmentStore.department,
            lab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })       
        }
        
          departmentStore &&
            departmentStore.updateDepartment({
              ...departmentStore.department,
              status: getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
            })
          
          departmentStore &&
            departmentStore.updateDepartment({
              ...departmentStore.department,
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
