/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

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
          priority: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PRIORIITY"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          priceGroup: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PRICE_GROUP"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          speicalScheme: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SPEICAL_SCHEME"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          environment: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        priceListStore.updatePriceList({
          ...priceListStore.priceList,
          status: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "STATUS"
          ),
        })
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
