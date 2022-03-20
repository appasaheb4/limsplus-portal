/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const BannerHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, bannerStore, routerStore } = useStores()
      useEffect(() => {
       
        bannerStore.updateBanner({
          ...bannerStore.banner,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          bannerStore.updateBanner({
            ...bannerStore.banner,
            environment: loginStore.login.environment,
          })
        }
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
