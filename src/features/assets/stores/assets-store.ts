import { version } from "mobx-sync"
import { computed } from "mobx"
import * as Services from "../services"

@version(0.1)
class AssetsStore {
  @computed get assetsService() {
    return new Services.AssetsService()
  }
}

export default AssetsStore
