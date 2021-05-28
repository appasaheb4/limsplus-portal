import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import { Stores as LoginStores } from "@lp/features/login/stores"

@version(0.1)
class ShortcutMenuStore {
  @ignore @observable shortcutMenuList?: any[] = []
  @ignore @observable isDragDropList: boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  @computed get ShortcutMenuService() {
    return new Services.ShortcutMenuService(LoginStores.loginStore.login?.accessToken)
  }

  @action updateShortcutMenu = (shortcut: any) => {
    this.shortcutMenuList = shortcut
  }
  @action updateDragDrop(status: boolean) {
    this.isDragDropList = status
  }
}
export default ShortcutMenuStore
