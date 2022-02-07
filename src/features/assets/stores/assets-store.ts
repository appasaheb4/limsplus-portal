import { version } from "mobx-sync"
import { makeAutoObservable, computed } from "mobx"
import {AssetsService} from "../services"

@version(0.1)
class AssetsStore {
  constructor() {
    makeAutoObservable(this)
  }
  @computed get AssetsService() {
    return new AssetsService()
  }
}  

export default AssetsStore
