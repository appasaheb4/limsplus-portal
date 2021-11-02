import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import { LookupService } from "../services"


@version(0.1)
export class LookupStore {
  @observable listLookup!: Models.Lookup[]
  @observable listLookupCount: number = 0
  @ignore @observable lookup!: Models.Lookup
  @ignore @observable globalSettings!: Models.GlobalSettings
  localInput!: Models.LocalInput;
   
  constructor() {
    this.listLookup = []
    this.localInput= new Models.LocalInput({});
    makeObservable<LookupStore, any>(this, {
      listLookup: observable,
      listLookupCount: observable,
      lookup: observable,
      globalSettings: observable,
      localInput:observable
    })
  }

  @computed get LookupService() {
    return new LookupService()
  }

  @action fetchListLookup(page?, limit?) {
    this.LookupService.listLookup(page, limit)
  }   

  @action updateLookupList(res: any) {
    if (!res.lookups.success) return alert(res.lookups.message)
    this.listLookup = res.lookups.data
    this.listLookupCount = res.lookups.paginatorInfo.count
  }

  @action updateLookup = (Lookup: Models.Lookup) => {
    this.lookup = Lookup
  }

  @action updateGlobalSettings = (values: Models.GlobalSettings) => {
    this.globalSettings = values
  }

  @action updateLocalInput(input: Models.LocalInput){
    this.localInput = input
  }
}
