import { version } from "mobx-sync"
import { makeAutoObservable, computed } from "mobx"
import * as Services from "../services"

@version(0.1)
class AssetsStore {
  constructor() {
    makeAutoObservable(this)
  }
  @computed get assetsService() {
    return new Services.AssetsService()
  }
}

export default AssetsStore
