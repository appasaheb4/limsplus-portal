import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"

@version(0.1)
class ShortcutMenuStore {
  @ignore @observable shortcutMenuList?: any[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @computed get ShortcutMenuService() {
    return new Services.ShortcutMenuService()
  }

  @action updateShortcutMenu = (shortcut: any) => {
    this.shortcutMenuList = shortcut
  }
}
export default ShortcutMenuStore
