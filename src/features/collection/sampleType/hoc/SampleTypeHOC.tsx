/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const SampleTypeHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, sampleTypeStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          sampleTypeStore.updateSampleType({
            ...sampleTypeStore.sampleType,
            environment: loginStore.login.environment,
          })
        }
        sampleTypeStore.updateSampleType({
          ...sampleTypeStore.sampleType,
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
