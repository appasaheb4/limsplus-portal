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

  @action fetchAdministrativeDiv(page?,limit?) {
    this.administrativeDivisionsService.listAdministrativeDivisions(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listAdministrativeDivCount = res.data.count
      this.listAdministrativeDiv = res.data.administrativeDivisions
    })
  }

  @action updateAdministrativeDiv(administrative: Models.AdministrativeDivisions) {
    this.administrativeDiv = administrative
  }
}

export default AdministrativeDivisionsStore
