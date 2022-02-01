import { makeObservable, action, observable, computed } from "mobx"
import { PossibleResults } from "../models"
import {PossibleResultsService} from "../services"

export class PossibleResultsStore {
  listPossibleResults: PossibleResults[]
  listPossibleResultsCount: number
  possibleResults!: PossibleResults
  checkExistsEnvCode!: boolean

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

      possibleResultsService: computed,
      fetchListPossibleResults: action,
      updatePossibleResultList: action,
      updatePossibleResults: action,
      updateExistsEnvCode: action,
    })
  }
 
  get possibleResultsService() {
    return new PossibleResultsService()
  }
  
  fetchListPossibleResults(page?, limit?) {
    this.possibleResultsService.listPossibleResults(page, limit)
  }

  updatePossibleResultList(res: any) {
    if (!res.possibleResults.success) return alert(res.possibleResults.message)
    this.listPossibleResults = res.possibleResults.data
    this.listPossibleResultsCount = res.possibleResults.paginatorInfo.count
  }

  filterPossibleResult(res: any){
    this.listPossibleResults = res.filterPossibleResult.data
    this.listPossibleResultsCount = res.filterPossibleResult.paginatorInfo.count
  }

  updatePossibleResults = (results: PossibleResults) => {
    this.possibleResults = results
  }

  updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
