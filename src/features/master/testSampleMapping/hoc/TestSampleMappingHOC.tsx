/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {getDefaultLookupItem} from "@lp/library/utils"

export const TestSampleMappingHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, testSampleMappingStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          testSampleMappingStore.updateSampleType({
            ...testSampleMappingStore.testSampleMapping,
            environment: loginStore.login.environment,
          })
        }  
        testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          repentionUnits:getDefaultLookupItem(
            routerStore.lookupItems,
            "RETENTION_UNITS"
          ),
        })
        testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          minDrawVolUnit:getDefaultLookupItem(
            routerStore.lookupItems,
            "MIN_DRAW_VOL_UNIT"
          ),
        })
        testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          minTestVolUnit:getDefaultLookupItem(
            routerStore.lookupItems,
            "MIN_TEST_VOL_UNIT"
          ),
        })
         testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          environment:getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })

      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
