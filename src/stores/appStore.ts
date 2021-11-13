import { makeObservable, action, observable } from "mobx"
import { ignore, version } from "mobx-sync"
interface ApplicationSetting {
  sideBarColor?: string
  shortCutBarColor?: string
  imageSideBarBgImage?: string
  isSideBarBgImage?: boolean
  isExpandScreen?: boolean
}  
// console.log()
@version(1.0)
export class AppStore {
  @observable applicationSetting!: ApplicationSetting
  @ignore @observable loadApi: { count: number; path?: string }

  constructor() {
    this.loadApi = { count: 0 }
    this.applicationSetting = {
      ...this.applicationSetting,
      isExpandScreen: false,
    }
    makeObservable<AppStore, any>(this, {
      applicationSetting: observable,
      loadApi: observable
    })
  }

  @action updateApplicationSetting(setting: ApplicationSetting) {
    this.applicationSetting = setting
  }

  @action updateLoadApi = (value: { count; path? }) => {
    this.loadApi = value
  }
}
