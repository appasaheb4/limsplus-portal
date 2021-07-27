// import React from 'react'
import { stores } from "@lp/library/stores"
const elem: any = document.body
export const openFullscreen = ()=> {
  stores.appStore.updateApplicationSetting({
    ...stores.appStore.applicationSetting,
    isExpandScreen: true,
  })
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen()
  }
}
export const closeFullscreen = ()=>{
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          stores.appStore.updateApplicationSetting({
            ...stores.appStore.applicationSetting,
            isExpandScreen: false,
          })
          document.exitFullscreen()
        }
      }
}
