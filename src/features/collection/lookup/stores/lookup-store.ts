import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import { LookupService } from "../services"

export class LookupStore {  
  listLookup!: Models.Lookup[]
  listLookupCount: number = 0
  lookup!: Models.Lookup
  globalSettings!: Models.GlobalSettings
  localInput!: Models.LocalInput
  flagUpperCase: boolean
   
  constructor() {
    this.listLookup = []
    this.localInput = new Models.LocalInput({})
    this.flagUpperCase = true
    makeObservable<LookupStore, any>(this, {
      listLookup: observable,
      listLookupCount: observable,
      lookup: observable,
      globalSettings: observable,
      localInput: observable,
      flagUpperCase: observable,

      LookupService: computed,
      fetchListLookup: action,
      updateLookupList: action,
      updateLookup: action,
      updateGlobalSettings: action,
      updateLocalInput: action,
      updateFlagUppperCase: action,
      filterLookupList: action
    })
  }  

  get LookupService() {
    return new LookupService()
  }

  fetchListLookup(page?, limit?) {
    this.LookupService.listLookup(page, limit)
  }

  updateLookupList(res: any) {
    if (!res.lookups.success) return alert(res.lookups.message)
    this.listLookup = res.lookups.data
    this.listLookupCount = res.lookups.paginatorInfo.count
  }

  filterLookupList(res: any){
    this.listLookup = res.filterLookups.data
    this.listLookupCount = res.filterLookups.paginatorInfo.count
  }

  updateLookup = (Lookup: Models.Lookup) => {
    this.lookup = Lookup
  }

  updateGlobalSettings = (values: Models.GlobalSettings) => {
    this.globalSettings = values
  }

  updateLocalInput(input: Models.LocalInput) {
    this.localInput = input
  }

  updateFlagUppperCase(flag: boolean) {
    this.flagUpperCase = flag
  }
}
