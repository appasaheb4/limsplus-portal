/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

export const ReferenceRangesHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, refernceRangesStore, routerStore } = useStores()
      useEffect(() => {
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          refernceRangesStore.updateReferenceRanges({
            ...refernceRangesStore.referenceRanges,
            lab: loginStore.login.lab,
          })
        }
        refernceRangesStore.updateReferenceRanges({
          ...refernceRangesStore.referenceRanges,
          species: getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIES"
          ),
          rangeSetOn: getDefaultLookupItem(
            routerStore.lookupItems,
            "RANGE_SET_ON"
          ),
        })
      }, [loginStore.login, routerStore.lookupItems])

      return <Component {...props} />
    }
  )
}
