import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
interface LocalState {
  state: string
  district: string
  city: string
  area: string
  postalCode: string
}
@version(0.1)
export class AdministrativeDivisionsStore {
  @ignore @observable administrativeDiv!: Models.AdministrativeDivisions
  @observable listAdministrativeDivCount: number = 0
  @observable listAdministrativeDiv!: Models.AdministrativeDivisions[]
  @ignore @observable localState!: LocalState

  constructor() {
    this.listAdministrativeDiv = []
    makeObservable<AdministrativeDivisionsStore, any>(this, {
      administrativeDiv: observable,
      listAdministrativeDivCount: observable,
      listAdministrativeDiv: observable,
      localState: observable,
    })
  }

  @computed get administrativeDivisionsService() {
    return new Services.AdministrativeDivisionsService()
  }

  @action fetchAdministrativeDiv(page?, limit?) {
    this.administrativeDivisionsService.listAdministrativeDivisions(page, limit)
  }

  @action updateAdministrativeDivList(res: any) {
    if (!res.administrativeDivisions.success)
      return alert(res.administrativeDivisions.message)
    this.listAdministrativeDivCount = res.administrativeDivisions.paginatorInfo.count
    this.listAdministrativeDiv = res.administrativeDivisions.data
  }

  @action updateAdministrativeDiv(administrative: Models.AdministrativeDivisions) {
    this.administrativeDiv = administrative
  }
  @action updateLocalState(state: LocalState) {
    this.localState = state
  }
  @action updateLocalDistrict(district: LocalState) {
    this.localState = district
  }
  @action updateLocalCity(city: LocalState) {
    this.localState = city
  }
  @action updateLocalArea(area: LocalState) {
    this.localState = area
  }
  @action updateLocalPostalCode(postalCode: LocalState) {
    this.localState = postalCode
  }
}
