import { makeObservable, action, observable, computed } from "mobx"
import {InterfaceManager} from "../models"
import {InterfaceManagerService} from "../services"

interface UpdateItem {
  value: string | boolean | undefined | any[]
  dataField: string
  id: string
}

export class InterfaceManagerStore {
  interfaceManager!: InterfaceManager
  listInterfaceManager: InterfaceManager[]
  listInterfaceManagerCopy: InterfaceManager[]
  listInterfaceManagerCount: number
  updateItem!: UpdateItem

  constructor() {
    this.listInterfaceManager = []
    this.listInterfaceManagerCopy = []
    this.listInterfaceManagerCount = 0
    makeObservable<InterfaceManagerStore, any>(this, {
      interfaceManager: observable,
      listInterfaceManager: observable,
      listInterfaceManagerCopy: observable,
      listInterfaceManagerCount: observable,
      updateItem: observable,

      interfaceManagerService: computed,
      fetchEncodeCharacter: action,
      updateInterfaceManagerList: action,
      updateInterfaceManager: action,
      changeUpdateItem: action,
    })
  }

  get interfaceManagerService() {
    return new InterfaceManagerService()
  }
  
  fetchEncodeCharacter(page?, limit?) {
    this.interfaceManagerService.listInterfaceManager(page, limit)
  }

  updateInterfaceManagerList(res: any) {
    if(!Array.isArray(res)){
      if (!res.interfaceManagers.success) return alert(res.interfaceManagers.message)
      this.listInterfaceManager = res.interfaceManagers.data
      this.listInterfaceManagerCopy = res.interfaceManagers.data
      this.listInterfaceManagerCount = res.interfaceManagers.paginatorInfo.count
    }else{
      this.listInterfaceManager = res;
    }
  }

  filterInterfaceManager(res: any){
    this.listInterfaceManager = res.filterInterfaceManagers.data
    this.listInterfaceManagerCount = res.filterInterfaceManagers.paginatorInfo.count
  }
  
  updateInterfaceManager = (value: InterfaceManager) => {
    this.interfaceManager = value
  }
  changeUpdateItem = (item: UpdateItem) => {
    this.updateItem = item
  }
}
