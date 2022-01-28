/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

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
          usageType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "USAGE_TYPE"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          libraryType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "LIBRARY_TYPE"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          commentType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "COMMENT_TYPE"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          commentsTarget: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "COMMENTS_TARGET"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          parameter: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PARAMETER"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          action: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ACTION"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          results: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "RESULTS"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          sex: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SEX"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          sexAction: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SEX_ACTION"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
          environment: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        libraryStore.updateLibrary({
          ...libraryStore.library,
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
