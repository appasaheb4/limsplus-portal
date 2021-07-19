import { makeAutoObservable, action, observable } from "mobx"
import {version} from "mobx-sync"
interface ApplicationSetting{
    sideBarColor?: string
    shortCutBarColor?: string
    imageSideBarBgImage?: string
} 
// console.log()
@version(1.0)
class AppStore {
    @observable applicationSetting?: ApplicationSetting
    constructor(){
        makeAutoObservable(this)
    }
    @action updateApplicationSetting(setting: ApplicationSetting){
        this.applicationSetting = setting
        // console.log('Value Checking.......',this.applicationSetting.sideBarColor)
    }
    
}
export default AppStore;