/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

export const DeliveryScheduleHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, deliveryScheduleStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          deliveryScheduleStore.updateDeliverySchedule({
            ...deliveryScheduleStore.deliverySchedule,
            environment: loginStore.login.environment,
          })
        }
        deliveryScheduleStore.updateDeliverySchedule({
          ...deliveryScheduleStore.deliverySchedule,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        deliveryScheduleStore.updateDeliverySchedule({
          ...deliveryScheduleStore.deliverySchedule,
          processingType: getDefaultLookupItem(
            routerStore.lookupItems,
            "PROCESSING_TYPE"
          ),
        })
        deliveryScheduleStore.updateDeliverySchedule({
          ...deliveryScheduleStore.deliverySchedule,
          dynamicTU: getDefaultLookupItem(
            routerStore.lookupItems,
            "DYNAMIC_TU"
          ),
        })
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
