import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import {SalesTeamService} from "../services"

@version(0.1)
export class SalesTeamStore {
  @ignore @observable salesTeam?: Models.SalesTeam
  @observable listSalesTeam?: Models.SalesTeam[] = []
  @observable listSalesTeamCount: number = 0

  constructor() {
    makeAutoObservable(this)
  }
   
  @computed get salesTeamService() {
    return new SalesTeamService(
    )
  }

 @action fetchSalesTeam(page?,limit?) {
    this.salesTeamService.listSalesTeam(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listSalesTeam = res.data.salesTeam
      this.listSalesTeamCount = res.data.count
    })
  }

  @action updateSalesTeam(team: Models.SalesTeam) {
    this.salesTeam = team
  }
}
