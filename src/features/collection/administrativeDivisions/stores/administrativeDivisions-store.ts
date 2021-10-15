import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
interface LocalState {
   state: string
}
@version(0.1)
class AdministrativeDivisionsStore {
  @ignore @observable administrativeDiv!: Models.AdministrativeDivisions
  @observable listAdministrativeDivCount: number = 0
  @observable listAdministrativeDiv: Models.AdministrativeDivisions[] = []
  @ignore @observable  localState!: LocalState 
  constructor() {
    makeAutoObservable(this)
  }

  @computed get administrativeDivisionsService() {
    return new Services.AdministrativeDivisionsService()
  }

  @action fetchAdministrativeDiv(page?, limit?) {
    this.administrativeDivisionsService
      .listAdministrativeDivisions(page, limit)
      .then((res) => {
        if (!res.administrativeDivisions.success)
          return alert(res.administrativeDivisions.message)
        this.listAdministrativeDivCount =
          res.administrativeDivisions.paginatorInfo.count
        this.listAdministrativeDiv = res.administrativeDivisions.data
      })
  }

  @action updateAdministrativeDiv(administrative: Models.AdministrativeDivisions) {
    this.administrativeDiv = administrative
  }
  @action updateLoclaState(state: LocalState){
    this.localState = state
  }
}

export default AdministrativeDivisionsStore
