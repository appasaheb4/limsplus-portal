import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import { SalesTeamService } from "../services"

@version(0.1)
export class SalesTeamStore {
  @observable listSalesTeam!: Models.SalesTeam[]
  @ignore @observable salesTeam!: Models.SalesTeam
  @observable listSalesTeamCount: number = 0
  @ignore @observable checkExistsEnvCode?: boolean = false
  
  constructor() {
    this.listSalesTeam = []
    makeObservable<SalesTeamStore, any>(this, {
      listSalesTeam: observable,
      salesTeam: observable,
      listSalesTeamCount: observable,
      checkExistsEnvCode: observable
    })
  }

  @computed get salesTeamService() {
    return new SalesTeamService()
  }

  @action fetchSalesTeam(page?, limit?) {
    this.salesTeamService.listSalesTeam(page, limit)
  }

  @action updateSalesTeamList(res: any){
    if (!res.salesTeams.success) return alert(res.salesTeams.message)
    this.listSalesTeam = res.salesTeams.data
    this.listSalesTeamCount = res.salesTeams.paginatorInfo.count
  }

  @action updateSalesTeam(team: Models.SalesTeam) {
    this.salesTeam = team
  }

  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
