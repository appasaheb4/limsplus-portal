import { version } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
//import * as Services from "../services"

@version(0.1)
class CommunicationStore {
  @observable hostCommuication?: Models.IHostCommunication

  @action updateHostCommuication = (
    hostCommunication: Models.IHostCommunication
  ) => {
    this.hostCommuication = hostCommunication
  }
}

export default CommunicationStore
