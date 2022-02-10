/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const PriceListHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, priceListStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          priceListStore.updatePriceList({
            ...priceListStore.priceList,
            lab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
        }
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          priority: getDefaultLookupItem(
            routerStore.lookupItems,
            "PRIORIITY"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          priceGroup: getDefaultLookupItem(
            routerStore.lookupItems,
            "PRICE_GROUP"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          speicalScheme: getDefaultLookupItem(
            routerStore.lookupItems,
            "SPEICAL_SCHEME"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          status: getDefaultLookupItem(
            routerStore.lookupItems,
            "STATUS"
          ),
        })
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
