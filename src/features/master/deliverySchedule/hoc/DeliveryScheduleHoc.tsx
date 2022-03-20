/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const DeliveryScheduleHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, deliveryScheduleStore, routerStore } = useStores()
      useEffect(() => {
        
        deliveryScheduleStore.updateDeliverySchedule({
          ...deliveryScheduleStore.deliverySchedule,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
          processingType: getDefaultLookupItem(
            routerStore.lookupItems,
            "PROCESSING_TYPE"
          ),
          dynamicTU: getDefaultLookupItem(
            routerStore.lookupItems,
            "DYNAMIC_TU"
          ),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          deliveryScheduleStore.updateDeliverySchedule({
            ...deliveryScheduleStore.deliverySchedule,
            environment: loginStore.login.environment,
          })
        }
        
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
