/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const MasterPanelHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, masterPanelStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          masterPanelStore.updateMasterPanel({
            ...masterPanelStore.masterPanel,
            rLab: loginStore.login.lab,
            pLab: loginStore.login.lab,
            environment: loginStore.login.environment,
          })
          
        }
        
        masterPanelStore &&   masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          status: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "STATUS"
          ),
        })
        
        masterPanelStore &&   masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          environment: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })

        masterPanelStore &&   masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          serviceType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SERVICE_TYPE"
          ),
        })
        masterPanelStore &&   masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          processing: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PROCESSING"
          ),
        })
        masterPanelStore &&   masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          category: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "CATEGORY"
          ),
        })
        masterPanelStore &&   masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          sex: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SEX"
          ),
        })
        masterPanelStore &&   masterPanelStore.updateMasterPanel({
          ...masterPanelStore.masterPanel,
          panelType: LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "PANEL_TYPE"
          ),
        })
        

      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
