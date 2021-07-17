import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import {SalesTeamService} from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
export class SalesTeamStore {
  @ignore @observable salesTeam?: Models.SalesTeam
  @observable listSalesTeam?: Models.SalesTeam[] = []

  constructor() {
    makeAutoObservable(this)
  }
   
  @computed get salesTeamService() {
    return new SalesTeamService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchSalesTeam() {
    this.salesTeamService.listSalesTeam().then((res) => {
      this.listSalesTeam = res
    })
  }

  @action updateSalesTeam(team: Models.SalesTeam) {
    this.salesTeam = team
  }
}
