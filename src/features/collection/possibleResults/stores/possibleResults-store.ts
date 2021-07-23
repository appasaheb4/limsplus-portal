import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import {PossibleResults} from "../models"
import * as Services from "../services"

@version(0.1)
export class PossibleResultsStore {
  @observable listPossibleResults: PossibleResults[] = []
  @ignore @observable possibleResults!: PossibleResults
    
  constructor() {
    makeAutoObservable(this)
  }

  @computed get possibleResultsService() {
    return new Services.PossibleResultsService(
    )
  }

  @action fetchListPossibleResults() {
    this.possibleResultsService.listPossibleResults().then((res) => {
      this.listPossibleResults = res
    })
  }
   
  @action updatePossibleResults = (results: PossibleResults) => {
    this.possibleResults = results
  }
}
