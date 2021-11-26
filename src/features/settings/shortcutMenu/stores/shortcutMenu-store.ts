import { makeObservable, action, observable, computed } from "mobx"
import * as Services from "../services"

export class ShortcutMenuStore {
  shortcutMenuList: any[]
  isDragDropList: boolean

  constructor() {
    this.shortcutMenuList = []
    this.isDragDropList = false
    makeObservable<ShortcutMenuStore, any>(this, {
      shortcutMenuList: observable,
      isDragDropList: observable,

      ShortcutMenuService: computed,
      updateShortcutMenu: action,
      updateDragDrop: action,
    })
  }

  get ShortcutMenuService() {
    return new Services.ShortcutMenuService()
  }

  updateShortcutMenu = (shortcut: any) => {
    this.shortcutMenuList = shortcut
  }
  updateDragDrop(status: boolean) {
    this.isDragDropList = status
  }
}
