import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Services from "../services"

@version(0.1)
export class ShortcutMenuStore {
  @ignore @observable shortcutMenuList: any[]
  @ignore @observable isDragDropList: boolean
  
  constructor() {
    this.shortcutMenuList = []
    this.isDragDropList = false
    makeObservable<ShortcutMenuStore, any>(this, {
      shortcutMenuList: observable,
      isDragDropList: observable,
    })
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
