import { ignore, version } from "mobx-sync"
import { action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
//import { Stores } from "@lp/features/login/stores"


@version(0.1)
class InterfaceManagerStore {
  @ignore @observable encodeCharacter?: Models.EncodeCharacter
  @observable listEncodeCharacter?: Models.EncodeCharacter[] = []
  @ignore @observable updateItem?: Models.UpdateItem

  @action fetchEncodeCharacter() {
    this.encodeCharacterService.listInterfaceManager().then((listEncode) => {
      this.listEncodeCharacter = listEncode
    })
  }

  @computed get encodeCharacterService() {
    return new Services.CommunicationService()
  }

  @action updateEncodeCharacter = (encode: Models.EncodeCharacter) => {
    this.encodeCharacter = encode
  }
  @action changeUpdateItem = (item: Models.UpdateItem) => {
    this.updateItem = item
  }
}

export default InterfaceManagerStore
