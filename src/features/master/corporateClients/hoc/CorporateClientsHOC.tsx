/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const CorporateClientsHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, corporateClientsStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          corporateClientsStore.updateCorporateClients({
            ...corporateClientsStore.corporateClients,
            environment: loginStore.login.environment,
          })
        }  
        corporateClientsStore.updateCorporateClients({
            ...corporateClientsStore.corporateClients,
            status: getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
              environment:getDefaultLookupItem(
                routerStore.lookupItems,
                "ENVIRONMENT"
              ),
              salesTerritoRy:getDefaultLookupItem(
                routerStore.lookupItems,
                "SPECIALITY"
              ),
              deliveryMethod:getDefaultLookupItem(
                routerStore.lookupItems,
                "DELIVERY_METHOD"
              ),
              deliveryType:getDefaultLookupItem(
                routerStore.lookupItems,
                "DELIVERY_TYPE"
              ),
              category:getDefaultLookupItem(
                routerStore.lookupItems,
                "CATEGORY"
              ),
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
