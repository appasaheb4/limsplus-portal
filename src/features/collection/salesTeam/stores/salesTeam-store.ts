import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import { SalesTeamService } from "../services"

@version(0.1)
export class SalesTeamStore {
  @ignore @observable salesTeam?: Models.SalesTeam
  @observable listSalesTeam?: Models.SalesTeam[] = []
  @observable listSalesTeamCount: number = 0
  @ignore @observable checkExistsEnvCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  @computed get salesTeamService() {
    return new SalesTeamService()
  }

  @action fetchSalesTeam(page?, limit?) {
    this.salesTeamService.listSalesTeam(page, limit).then((res) => {
      if (!res.salesTeams.success) return alert(res.salesTeams.message)
      this.listSalesTeam = res.salesTeams.data
      this.listSalesTeamCount = res.salesTeams.paginatorInfo.count
    })
  }

  @action updateSalesTeam(team: Models.SalesTeam) {
    this.salesTeam = team
  }

  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
