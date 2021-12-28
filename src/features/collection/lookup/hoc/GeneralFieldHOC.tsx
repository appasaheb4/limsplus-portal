/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const GeneralFieldHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, lookupStore, routerStore } = useStores()
      useEffect(()=>{
          lookupStore &&
          lookupStore.updateGlobalSettings({
            ...lookupStore.globalSettings,
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
