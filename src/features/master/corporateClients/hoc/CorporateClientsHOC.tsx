/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

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
          })
         corporateClientsStore.updateCorporateClients({
          ...corporateClientsStore.corporateClients,
          environment:getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        corporateClientsStore.updateCorporateClients({
          ...corporateClientsStore.corporateClients,
          salesTerritoRy:getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
        })
        corporateClientsStore.updateCorporateClients({
          ...corporateClientsStore.corporateClients,
          deliveryMethod:getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_METHOD"
          ),
        })
        corporateClientsStore.updateCorporateClients({
          ...corporateClientsStore.corporateClients,
          deliveryType:getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_TYPE"
          ),
        })
        corporateClientsStore.updateCorporateClients({
          ...corporateClientsStore.corporateClients,
          category:getDefaultLookupItem(
            routerStore.lookupItems,
            "CATEGORY"
          ),
        })
        corporateClientsStore.updateCorporateClients({
          ...corporateClientsStore.corporateClients,
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
