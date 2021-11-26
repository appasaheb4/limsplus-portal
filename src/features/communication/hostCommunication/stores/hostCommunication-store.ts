import { makeObservable, action, observable } from "mobx"
import * as Models from "../models"
import { ConvertTo } from "../../models"
import { InterfaceManager } from "../../interfaceManager/models"

export class HostCommunicationStore {
  hostCommuication!: Models.HostCommunication
  convertTo!: ConvertTo
  selectedInterfaceManager?: InterfaceManager
  constructor() {
    makeObservable<HostCommunicationStore, any>(this, {
      hostCommuication: observable,
      convertTo: observable,
      selectedInterfaceManager: observable,

      updateHostCommuication: action,
      updateConvertTo: action,
      updateSelectedInterfaceManager: action,
    })
  }

  updateHostCommuication = (hostCommunication: Models.HostCommunication) => {
    this.hostCommuication = hostCommunication
  }
  updateConvertTo(convertTo: ConvertTo) {
    this.convertTo = convertTo
  }
  updateSelectedInterfaceManager(interfaceManager: InterfaceManager) {
    console.log({ interfaceManager })
    this.selectedInterfaceManager = interfaceManager
  }
}
