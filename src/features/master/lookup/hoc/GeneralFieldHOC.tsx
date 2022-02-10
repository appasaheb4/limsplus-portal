/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const GeneralFieldHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, lookupStore, routerStore } = useStores()
      useEffect(()=>{
          lookupStore &&
          lookupStore.updateGlobalSettings({
            ...lookupStore.globalSettings,
            environment: getDefaultLookupItem(
              routerStore.lookupItems,
              "ENVIRONMENT"
            ),
          })
      },[loginStore.login,routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
