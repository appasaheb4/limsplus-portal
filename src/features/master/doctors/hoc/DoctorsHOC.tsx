/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {getDefaultLookupItem} from "@/library/utils"

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
            status: getDefaultLookupItem(
                routerStore.lookupItems,
                "STATUS"
              ),
          })
         doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          environment:getDefaultLookupItem(
            routerStore.lookupItems,
            "ENVIRONMENT"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          title:getDefaultLookupItem(
            routerStore.lookupItems,
            "TITLE"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          speciality:getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          salesTerritoRy:getDefaultLookupItem(
            routerStore.lookupItems,
            "SPECIALITY"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          deliveryType:getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_TYPE"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          deliveryMethod:getDefaultLookupItem(
            routerStore.lookupItems,
            "DELIVERY_METHOD"
          ),
        })
        doctorsStore.updateDoctors({
          ...doctorsStore.doctors,
          registrationLocation:getDefaultLookupItem(
            routerStore.lookupItems,
            "STATUS"
          ),
        })

      },[loginStore.login,routerStore.lookupItems])
      return <Component {...props} />
    }
  )
}
