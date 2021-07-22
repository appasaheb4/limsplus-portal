import { makeAutoObservable, action, observable } from "mobx"
import {version} from "mobx-sync"
interface ApplicationSetting{
    sideBarColor?: string
    shortCutBarColor?: string
    imageSideBarBgImage?: string
    isSideBarBgImage?: boolean
    isExpandScreen?: boolean
}   
// console.log()
@version(1.0)
class AppStore {
    @observable applicationSetting?: ApplicationSetting
    constructor(){
        makeAutoObservable(this)
        this.applicationSetting = {  
            ...this.applicationSetting,
            isExpandScreen:false
        }
    }
    @action updateApplicationSetting(setting: ApplicationSetting){
        this.applicationSetting = setting
    }
    
}
export default AppStore;