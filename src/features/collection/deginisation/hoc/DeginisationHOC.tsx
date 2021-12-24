/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const DeginisationHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, deginisationStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          deginisationStore.updateDescription({
            ...deginisationStore.deginisation,
            environment: loginStore.login.environment,
          })
        }
          deginisationStore && deginisationStore.updateDescription({
            ...deginisationStore.deginisation,
            environment: LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
          })
      },[loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
