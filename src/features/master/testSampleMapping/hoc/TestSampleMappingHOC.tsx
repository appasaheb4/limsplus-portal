/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

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
          repentionUnits:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "RETENTION_UNITS"
          ),
        })
        testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          minDrawVolUnit:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "MIN_DRAW_VOL_UNIT"
          ),
        })
        testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          minTestVolUnit:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "MIN_TEST_VOL_UNIT"
          ),
        })
         testSampleMappingStore.updateSampleType({
          ...testSampleMappingStore.testSampleMapping,
          environment:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })

      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
