/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const ReferenceRangesHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, refernceRangesStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          refernceRangesStore.updateReferenceRanges({
            ...refernceRangesStore.referenceRanges,
            lab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
        }
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          species: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIES"
          ),
        })
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          sex: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SEX"
          ),
        })
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          rangType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "RANG_TYPE"
          ),
        })
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          rangeSetOn: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "RANGE_SET_ON"
          ),
        })
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          ageUnit: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "AGE_UNIT"
          ),
        })
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          intervalUnit: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "INTERVAL_UNIT"
          ),
        })
       
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          environment: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
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
