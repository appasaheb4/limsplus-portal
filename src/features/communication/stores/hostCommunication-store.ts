import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"

//import * as Services from "../services"

@version(0.1)
class HostCommunicationStore {
  @observable hostCommuication?: Models.IHostCommunication
  @ignore @observable convertTo?: Models.ConvertTo
  @ignore @observable selectedInterfaceManager?: Models.EncodeCharacter

  @action updateHostCommuication = (
    hostCommunication: Models.IHostCommunication
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
