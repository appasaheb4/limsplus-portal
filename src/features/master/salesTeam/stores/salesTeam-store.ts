import { makeObservable, action, observable, computed } from "mobx"
import { SalesTeam } from "../models"
import { SalesTeamService } from "../services"

export class SalesTeamStore {
  listSalesTeam!: SalesTeam[]
  listSalesTeamCopy!: SalesTeam[]
  salesTeam!: SalesTeam
  listSalesTeamCount: number = 0
  checkExistsEnvCode?: boolean = false

  constructor() {
    this.listSalesTeam = []
    makeObservable<SalesTeamStore, any>(this, {
      listSalesTeam: observable,
      salesTeam: observable,
      listSalesTeamCount: observable,
      checkExistsEnvCode: observable,

      salesTeamService: computed,
      fetchSalesTeam: action,
      updateSalesTeamList: action,
      updateSalesTeam: action,
      updateExistsEnvCode: action,
      filterSalesTeamList: action,
    })
  }

  get salesTeamService() {
    return new SalesTeamService()
  }

  fetchSalesTeam(page?, limit?) {
    this.salesTeamService.listSalesTeam(page, limit)
  }

  updateSalesTeamList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.salesTeams.success) return alert(res.salesTeams.message)
      this.listSalesTeam = res.salesTeams.data
      this.listSalesTeamCopy = res.salesTeams.data
      this.listSalesTeamCount = res.salesTeams.paginatorInfo.count
    } else {
      this.listSalesTeam = res
    }
  }

  filterSalesTeamList(res: any) {
    this.listSalesTeam = res.filterSalesTeams.data
    this.listSalesTeamCount = res.filterSalesTeams.paginatorInfo.count
  }

  updateSalesTeam(team: SalesTeam) {
    this.salesTeam = team
  }

  updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
