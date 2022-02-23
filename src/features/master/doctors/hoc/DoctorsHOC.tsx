/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import { getDefaultLookupItem } from "@/library/utils"

export const DoctorsHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, doctorsStore, routerStore } = useStores()
      useEffect(() => {
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          status: getDefaultLookupItem(routerStore.lookupItems, "STATUS"),
          environment: getDefaultLookupItem(routerStore.lookupItems, "ENVIRONMENT"),
          title: getDefaultLookupItem(routerStore.lookupItems, "TITLE"),
          speciality: getDefaultLookupItem(routerStore.lookupItems, "SPECIALITY"),
          salesTerritoRy: getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
          deliveryType: getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_TYPE"
          ),
          deliveryMethod: getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_METHOD"
          ),
          registrationLocation: getDefaultLookupItem(
            routerStore.lookupItems,
            "STATUS"
          ),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          doctorsStore.updateDoctors({
            ...doctorsStore.doctors,
            environment: loginStore.login.environment,
          })
        }
      }, [loginStore.login, routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
