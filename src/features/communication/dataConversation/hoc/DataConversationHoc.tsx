/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const DataConversationHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, dataConversationStore, routerStore } = useStores()
      useEffect(() => {
        
        dataConversationStore.updateDataConversation({
          ...dataConversationStore.dataConversation,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          dataConversationStore.updateDataConversation({
            ...dataConversationStore.dataConversation,
            environment: loginStore.login.environment,
          })
        }
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
