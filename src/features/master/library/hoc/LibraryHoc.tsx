/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import { getDefaultLookupItem } from "@/library/utils"

export const LibraryHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, libraryStore, routerStore } = useStores()
      useEffect(() => {
        libraryStore.updateLibrary({
          ...libraryStore.library,
          lab: loginStore.login.lab,
          usageType: getDefaultLookupItem(routerStore.lookupItems, "USAGE_TYPE"),
          libraryType: getDefaultLookupItem(routerStore.lookupItems, "LIBRARY_TYPE"),
          commentType: getDefaultLookupItem(routerStore.lookupItems, "COMMENT_TYPE"),
          commentsTarget: getDefaultLookupItem(
            routerStore.lookupItems,
            "COMMENTS_TARGET"
          ),
          parameter: getDefaultLookupItem(routerStore.lookupItems, "PARAMETER"),
          action: getDefaultLookupItem(routerStore.lookupItems, "ACTION"),
          results: getDefaultLookupItem(routerStore.lookupItems, "RESULTS"),
          sex: getDefaultLookupItem(routerStore.lookupItems, "SEX"),
          sexAction: getDefaultLookupItem(routerStore.lookupItems, "SEX_ACTION"),
          environment: getDefaultLookupItem(routerStore.lookupItems, "ENVIRONMENT"),
          status: getDefaultLookupItem(routerStore.lookupItems, "STATUS"),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          libraryStore.updateLibrary({
            ...libraryStore.library,
            environment: loginStore.login.environment,
          })
        }
      }, [loginStore.login, routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
