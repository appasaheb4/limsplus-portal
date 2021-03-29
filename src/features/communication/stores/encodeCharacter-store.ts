import { ignore, version } from "mobx-sync"
import { action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
//import { Stores } from "@lp/features/login/stores"

@version(0.1)
class EncodeCharacterStore {
  @ignore @observable encodeCharacter?: Models.EncodeCharacter
  @observable listEncodeCharacter?: Models.EncodeCharacter[] = []

  @action fetchEncodeCharacter() {
    this.encodeCharacterService.listEncodeCharacter().then((listEncode) => {
      this.listEncodeCharacter = listEncode
    })
  }

  @computed get encodeCharacterService() {
    //Stores.loginStore.login?.token as string
    return new Services.CommunicationService()
  }

  @action updateEncodeCharacter = (encode: Models.EncodeCharacter) => {
    this.encodeCharacter = encode
  }
}

export default EncodeCharacterStore
