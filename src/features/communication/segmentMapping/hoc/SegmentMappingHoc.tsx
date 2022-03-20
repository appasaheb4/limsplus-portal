/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const SegmentMappingHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, segmentMappingStore, routerStore } = useStores()
      useEffect(() => {
        
        segmentMappingStore.updateSegmentMapping({
          ...segmentMappingStore.segmentMapping,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          segmentMappingStore.updateSegmentMapping({
            ...segmentMappingStore.segmentMapping,
            environment: loginStore.login.environment,
          })
        }
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
