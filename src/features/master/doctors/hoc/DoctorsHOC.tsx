/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryUtils from "@lp/library/utils"

export const DoctorsHoc = (Component: React.FC<any>) => {
  return observer(
    (props: any): JSX.Element => {
      const { loginStore, doctorsStore, routerStore } = useStores()
      useEffect(()=>{
        if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
          doctorsStore.updateDoctors({
            ...doctorsStore.doctors,
            environment: loginStore.login.environment,
          })
        }  
        doctorsStore.updateDoctors({
            ...doctorsStore.doctors,
            status: LibraryUtils.getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
         doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          environment:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          title:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "TITLE"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          speciality:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          salesTerritoRy:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          deliveryType:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_TYPE"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          deliveryMethod:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_METHOD"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          registrationLocation:LibraryUtils.getDefaultLookupItem(
            routerStore.lookupItems,
            "STATUS"
          ),
        })

      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
