import { version, ignore } from "mobx-sync"
import { makeAutoObservable,action, observable } from "mobx"
import * as Models from "../models"
import {ConvertTo} from '../../models'
import {InterfaceManager} from '../../interfaceManager/models'


@version(0.1)
export class HostCommunicationStore {
  @observable hostCommuication!: Models.HostCommunication
  @ignore @observable convertTo!: ConvertTo
  @ignore @observable selectedInterfaceManager?: InterfaceManager
  constructor() {
    makeAutoObservable(this)
}

  @action updateHostCommuication = (
    hostCommunication: Models.HostCommunication
  ) => {
    this.hostCommuication = hostCommunication
  }  
  @action updateConvertTo(convertTo: ConvertTo) {
    this.convertTo = convertTo
  }
  @action updateSelectedInterfaceManager(interfaceManager: InterfaceManager) {
    console.log({ interfaceManager })
    this.selectedInterfaceManager = interfaceManager
  }
}


