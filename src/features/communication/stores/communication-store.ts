import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"

//import * as Services from "../services"

@version(0.1)
class CommunicationStore {
  @observable hostCommuication?: Models.IHostCommunication
  @ignore @observable convertTo?: Models.ConvertTo

  @action updateHostCommuication = (
    hostCommunication: Models.IHostCommunication
  ) => {
    this.hostCommuication = hostCommunication
  }
  @action updateConvertTo(convertTo: Models.ConvertTo) {
    this.convertTo = convertTo
  }
}

export default CommunicationStore
