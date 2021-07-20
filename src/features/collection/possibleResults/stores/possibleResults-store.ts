import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
export class PossibleResultsStore {
  @observable listPossibleResults: Models.PossibleResults[] = []
  @ignore @observable possibleResults?: Models.PossibleResults
    
  constructor() {
    makeAutoObservable(this)
  }

  @computed get possibleResultsService() {
    return new Services.PossibleResultsService(
    )
  }

  @action fetchListPossibleResults() {
    this.possibleResultsService.listLookup().then((res) => {
      this.listPossibleResults = res
    })
  }
   
  @action updatePossibleResults = (results: Models.PossibleResults) => {
    this.possibleResults = results
  }
}
