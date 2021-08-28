import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import {LookupService} from "../services"

@version(0.1)
class LookupStore {
  @observable listLookup: Models.Lookup[] = []
  @observable listLookupCount: number = 0
  @ignore @observable lookup!: Models.Lookup
  @ignore @observable globalSettings!: Models.GlobalSettings

  constructor() {
    makeAutoObservable(this)
  }

  @computed get LookupService() {
    return new LookupService()
  }

  @action fetchListLookup(page?, limit?) {
    this.LookupService.listLookup(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listLookup = res.data.lookup
      this.listLookupCount = res.data.count
    })
  }

  @action updateLookup = (Lookup: Models.Lookup) => {
    this.lookup = Lookup
  }

  @action updateGlobalSettings = (values: Models.GlobalSettings) => {
    this.globalSettings = values
  }
}

export default LookupStore
