/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
let router = dashboardRoutes
export const PossibleResultHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, possibleResultsStore, routerStore } = useStores()
      useEffect(() => {
        router = router.filter((item: any) => {
          if (item.name !== "Dashboard") {
            item.toggle = false
            item.title = item.name
            item = item.children.filter((childernItem) => {
              childernItem.title = childernItem.name
              childernItem.toggle = false
              return childernItem
            })
            return item
          }
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          possibleResultsStore.updatePossibleResults({
            ...possibleResultsStore.possibleResults,
            environment: loginStore.login.environment,
          })
        }
        possibleResultsStore.updatePossibleResults({
          ...possibleResultsStore.possibleResults,
          environment: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
