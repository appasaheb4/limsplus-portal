import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

@version(0.1)
export class RegistrationLocationsStore {
  @ignore @observable registrationLocations!: Models.RegistrationLocations
  @observable listRegistrationLocations: Models.RegistrationLocations[]
  @observable listRegistrationLocationsCount: number
  @ignore @observable checkExitsLabEnvCode: boolean

  constructor() {
    this.listRegistrationLocations = []
    this.listRegistrationLocationsCount = 0
    this.checkExitsLabEnvCode = false
    this.registrationLocations = {
      ...this.registrationLocations,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      confidential: false,
      printLabel: false,
      neverBill: false,
      urgent: false,
    }

    makeObservable<RegistrationLocationsStore, any>(this, {
      registrationLocations: observable,
      listRegistrationLocations: observable,
      listRegistrationLocationsCount: observable,
      checkExitsLabEnvCode: observable,
    })
  }

  @computed get registrationLocationsService() {
    return new Services.RegistrationLocationsService()
  }

  @action fetchRegistrationLocations(page?, limit?) {
    this.registrationLocationsService.listRegistrationLocations(page, limit)
  }

  @action updateRegistrationLocationsList(res: any) {
    if (!res.registrationLocations.success) return alert(res.registrationLocations.message)
    this.listRegistrationLocationsCount = res.registrationLocations.paginatorInfo.count
    this.listRegistrationLocations = res.registrationLocations.data
  }

  @action updateRegistrationLocations(locations: Models.RegistrationLocations) {
    this.registrationLocations = locations
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
