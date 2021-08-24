import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class AdministrativeDivisionsStore {
  @ignore @observable administrativeDiv?: Models.AdministrativeDivisions
  @observable listAdministrativeDivCount: number = 0;
  @observable listAdministrativeDiv?: Models.AdministrativeDivisions[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @computed get administrativeDivisionsService() {
    return new Services.AdministrativeDivisionsService()
  }

  fetchAdministrativeDiv(page?,limit?) {
    this.administrativeDivisionsService.listAdministrativeDivisions(page,limit).then((res) => {
      this.listAdministrativeDiv = res
    })
  }

  @action updateAdministrativeDiv(administrative: Models.AdministrativeDivisions) {
    this.administrativeDiv = administrative
  }
}

export default AdministrativeDivisionsStore
