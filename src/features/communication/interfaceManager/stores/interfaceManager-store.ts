import { ignore, version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

interface UpdateItem {
  value: string | boolean | undefined | any[]
  dataField: string
  id: string
}

@version(0.1)
export class InterfaceManagerStore {
  @ignore @observable interfaceManager!: Models.InterfaceManager
  @observable listInterfaceManager: Models.InterfaceManager[]
  @observable listInterfaceManagerCount: number
  @ignore @observable updateItem!: UpdateItem

  constructor() {
    this.listInterfaceManager = []
    this.listInterfaceManagerCount = 0
    makeObservable<InterfaceManagerStore, any>(this, {
      interfaceManager: observable,
      listInterfaceManager: observable,
      listInterfaceManagerCount: observable,
      updateItem: observable,
    })
  }

  @computed get interfaceManagerService() {
    return new Services.InterfaceManagerService()
  }

  @action fetchEncodeCharacter(page?, limit?) {
    this.interfaceManagerService.listInterfaceManager(page, limit)
  }

  @action updateInterfaceManagerList(res: any) {
    if (!res.interfaceManagers.success) return alert(res.interfaceManagers.message)
    this.listInterfaceManager = res.interfaceManagers.data
    this.listInterfaceManagerCount = res.interfaceManagers.paginatorInfo.count
  }

  @action updateInterfaceManager = (value: Models.InterfaceManager) => {
    this.interfaceManager = value
  }
  @action changeUpdateItem = (item: UpdateItem) => {
    this.updateItem = item
  }
}
