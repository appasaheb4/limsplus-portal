/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const SampleTypeHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, sampleTypeStore, routerStore } = useStores()
      useEffect(() => {
        
        sampleTypeStore.updateSampleType({
          ...sampleTypeStore.sampleType,
          environment: getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          sampleTypeStore.updateSampleType({
            ...sampleTypeStore.sampleType,
            environment: loginStore.login.environment,
          })
        }
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
