import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import {PossibleResults} from "../models"
import * as Services from "../services"

@version(0.1)
export class PossibleResultsStore {
  @observable listPossibleResults: PossibleResults[] = []
  @observable listPossibleResultsCount: number = 0
  @ignore @observable possibleResults!: PossibleResults
  @ignore @observable checkExistsEnvCode?: boolean = false
    
  constructor() {
    makeAutoObservable(this)
  }

  @computed get possibleResultsService() {
    return new Services.PossibleResultsService(
    )
  }

  @action fetchListPossibleResults(page?,limit?) {
    this.possibleResultsService.listPossibleResults(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listPossibleResults = res.data.possibleResults
      this.listPossibleResultsCount = res.data.count
    })
  }
   
  @action updatePossibleResults = (results: PossibleResults) => {
    this.possibleResults = results
  }

  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
