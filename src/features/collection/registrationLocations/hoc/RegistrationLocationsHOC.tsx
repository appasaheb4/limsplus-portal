/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

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
            status: LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
         registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          environment:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          acClass:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "AC_CLASS"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          accountType:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ACCOUNT_TYPE"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          salesTerritoRy:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          methodColn:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "METHOD_COLN"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          deliveryMethod:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_METHOD"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          deliveryType:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_TYPE"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          category:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "CATEGORY"
          ),
        })
        registrationLocationsStore.updateRegistrationLocations({
          ...registrationLocationsStore.registrationLocations,
          customerGroup:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "CUSTOMER_GROUP"
          ),
        })
      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
