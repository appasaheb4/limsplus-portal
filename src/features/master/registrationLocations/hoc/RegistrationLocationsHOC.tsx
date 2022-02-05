/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

export const RegistrationLocationHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, registrationLocationsStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          registrationLocationsStore.updateRegistrationLocations({
            ...registrationLocationsStore.registrationLocations,
            environment: loginStore.login.environment,
          })
        }  
        registrationLocationsStore.updateRegistrationLocations({
            ...registrationLocationsStore.registrationLocations,
            status: getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
         registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          environment:getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          acClass:getDefaultLookupItem(
            routerStore.lookupItems,
            "AC_CLASS"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          accountType:getDefaultLookupItem(
            routerStore.lookupItems,
            "ACCOUNT_TYPE"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          salesTerritoRy:getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          methodColn:getDefaultLookupItem(
            routerStore.lookupItems,
            "METHOD_COLN"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          deliveryMethod:getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_METHOD"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          deliveryType:getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_TYPE"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          category:getDefaultLookupItem(
            routerStore.lookupItems,
            "CATEGORY"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          customerGroup:getDefaultLookupItem(
            routerStore.lookupItems,
            "CUSTOMER_GROUP"
          ),
        })
      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
