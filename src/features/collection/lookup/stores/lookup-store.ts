import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class LookupStore {
  @observable listLookup: Models.ILookup[] = []
  @ignore @observable Lookup?: Models.ILookup
  @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  private init() {
    return {
      lab: "",
      code: "",
      name: "",
    }
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }
  @computed get LookupService() {
    return new Services.LookupService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchListLookup() {
    this.LookupService.listLookup().then((res) => {
      //console.log({ Lookup: res });
      this.listLookup = res
    })
  }

  @action updateLookup = (Lookup: Models.ILookup) => {
    this.Lookup = Lookup
  }

  @action clear() {
    this.Lookup = this.init()
  }
}

export default LookupStore
