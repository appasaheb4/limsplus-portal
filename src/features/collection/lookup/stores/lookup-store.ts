import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { RouterFlow } from "@lp/flows"

import { stores } from "@lp/library/stores"

@version(0.1)
class LookupStore {
  @observable listLookup: Models.Lookup[] = []
  @ignore @observable lookup!: Models.Lookup

  constructor() {
    makeAutoObservable(this)
  }

  @computed get LookupService() {
    return new Services.LookupService()
  }

  @action fetchListLookup() {
    this.LookupService.listLookup().then((res) => {
        RouterFlow.getLookupValues(res.data.lookup).then((items) => {
          //console.log({ items })
          stores.routerStore.updateLookupItems(items);
        })
      this.listLookup = res.data.lookup
    })
  }
  
  @action updateLookup = (Lookup: Models.Lookup) => {
    this.lookup = Lookup
  }
}

export default LookupStore
