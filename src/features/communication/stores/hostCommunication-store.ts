import { version, ignore } from "mobx-sync"
import { makeAutoObservable,action, observable } from "mobx"
import * as Models from "../models"


@version(0.1)
class HostCommunicationStore {
  @observable hostCommuication!: Models.HostCommunication
  @ignore @observable convertTo!: Models.ConvertTo
  @ignore @observable selectedInterfaceManager?: Models.EncodeCharacter
  constructor() {
    makeAutoObservable(this)
}

  @action updateHostCommuication = (
    hostCommunication: Models.HostCommunication
  ) => {
    this.hostCommuication = hostCommunication
  }  
  @action updateConvertTo(convertTo: Models.ConvertTo) {
    this.convertTo = convertTo
  }
  @action updateSelectedInterfaceManager(interfaceManager: Models.EncodeCharacter) {
    console.log({ interfaceManager })
    this.selectedInterfaceManager = interfaceManager
  }
}

export default HostCommunicationStore
