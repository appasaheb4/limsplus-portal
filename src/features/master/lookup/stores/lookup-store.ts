import { makeObservable, action, observable, computed } from "mobx"
import {LocalInput,Lookup,GlobalSettings} from "../models"
import { LookupService } from "../services"

export class LookupStore {  
  listLookup!: Lookup[]
  listLookupCount: number = 0
  lookup!: Lookup
  globalSettings!: GlobalSettings
  localInput!: LocalInput
  flagUpperCase: boolean
   
  constructor() {
    this.listLookup = []
    this.localInput = new LocalInput({})
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

  updateLookup = (Lookup: Lookup) => {
    this.lookup = Lookup
  }

  updateGlobalSettings = (values: GlobalSettings) => {
    this.globalSettings = values
  }

  updateLocalInput(input: LocalInput) {
    this.localInput = input
  }

  updateFlagUppperCase(flag: boolean) {
    this.flagUpperCase = flag
  }
}
