import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import { PossibleResults } from "../models"
import * as Services from "../services"

@version(0.1)
export class PossibleResultsStore {
  @observable listPossibleResults: PossibleResults[]
  @observable listPossibleResultsCount: number
  @ignore @observable possibleResults!: PossibleResults
  @ignore @observable checkExistsEnvCode!: boolean

  constructor() {
    this.listPossibleResults = []
    this.listPossibleResultsCount = 0
    this.checkExistsEnvCode = false
    this.possibleResults = {
      ...this.possibleResults,
      abNormal: false,
      critical: false,
    }

    makeObservable<PossibleResultsStore, any>(this, {
      listPossibleResults: observable,
      listPossibleResultsCount: observable,
      possibleResults: observable,
      checkExistsEnvCode: observable,
    })
  }

  @computed get possibleResultsService() {
    return new Services.PossibleResultsService()
  }

  @action fetchListPossibleResults(page?, limit?) {
    this.possibleResultsService.listPossibleResults(page, limit)
  }

  @action updatePossibleResultList(res: any) {
    if (!res.possibleResults.success) return alert(res.possibleResults.message)
    this.listPossibleResults = res.possibleResults.data
    this.listPossibleResultsCount = res.possibleResults.paginatorInfo.count
  }
  
  @action updatePossibleResults = (results: PossibleResults) => {
    this.possibleResults = results
  }

  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
