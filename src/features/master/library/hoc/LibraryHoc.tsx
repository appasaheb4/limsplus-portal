/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

export const LibraryHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, libraryStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          libraryStore.updateLibrary({
            ...libraryStore.library,
            lab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
        }
        libraryStore.updateLibrary({
          ...libraryStore.library,
          usageType: getDefaultLookupItem(
            routerStore.lookupItems,
            "USAGE_TYPE"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          libraryType: getDefaultLookupItem(
            routerStore.lookupItems,
            "LIBRARY_TYPE"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          commentType: getDefaultLookupItem(
            routerStore.lookupItems,
            "COMMENT_TYPE"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          commentsTarget: getDefaultLookupItem(
            routerStore.lookupItems,
            "COMMENTS_TARGET"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          parameter: getDefaultLookupItem(
            routerStore.lookupItems,
            "PARAMETER"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          action: getDefaultLookupItem(
            routerStore.lookupItems,
            "ACTION"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          results: getDefaultLookupItem(
            routerStore.lookupItems,
            "RESULTS"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          sex: getDefaultLookupItem(
            routerStore.lookupItems,
            "SEX"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          sexAction: getDefaultLookupItem(
            routerStore.lookupItems,
            "SEX_ACTION"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
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
