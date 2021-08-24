import { ignore, version } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class InterfaceManagerStore {
  @ignore @observable encodeCharacter!: Models.EncodeCharacter
  @observable listEncodeCharacter?: Models.EncodeCharacter[] = []
  @observable listEncodeCharacterCount: number = 0
  @ignore @observable updateItem?: Models.UpdateItem
  
  constructor() {
    makeAutoObservable(this)
  }

  @computed get encodeCharacterService() {
    return new Services.CommunicationService()
  }

  @action fetchEncodeCharacter(page?,limit?) {
    this.encodeCharacterService.listInterfaceManager(page,limit).then((listEncode) => {
      this.listEncodeCharacter = listEncode
    })
  }

  

  @action updateEncodeCharacter = (encode: Models.EncodeCharacter) => {
    this.encodeCharacter = encode
  }
  @action changeUpdateItem = (item: Models.UpdateItem) => {
    this.updateItem = item
  }    
}

export default InterfaceManagerStore
