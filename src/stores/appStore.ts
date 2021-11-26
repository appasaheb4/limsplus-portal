import { makeObservable, action, observable } from "mobx"
interface ApplicationSetting {
  sideBarColor?: string
  shortCutBarColor?: string
  imageSideBarBgImage?: string
  isSideBarBgImage?: boolean
  isExpandScreen?: boolean
}

export class AppStore {
  applicationSetting!: ApplicationSetting
  loadApi: { count: number; path?: string }

  constructor() {
    this.loadApi = { count: 0 }
    this.applicationSetting = {
      ...this.applicationSetting,
      isExpandScreen: false,
    }
    makeObservable<AppStore, any>(this, {
      applicationSetting: observable,
      loadApi: observable,

      updateApplicationSetting: action,
      updateLoadApi: action,
    })
  }

  updateApplicationSetting(setting: ApplicationSetting) {
    this.applicationSetting = setting
  }
  
  updateLoadApi = (value: { count, path? }) => {
    this.loadApi = value
  }
}
