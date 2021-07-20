import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"

@version(0.1)
class ShortcutMenuStore {
  @ignore @observable shortcutMenuList?: any[] = []
  @ignore @observable isDragDropList: boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  @computed get ShortcutMenuService() {
    return new Services.ShortcutMenuService()
  }

  @action updateShortcutMenu = (shortcut: any) => {
    this.shortcutMenuList = shortcut
  }
  @action updateDragDrop(status: boolean) {
    this.isDragDropList = status
  }
}
export default ShortcutMenuStore
