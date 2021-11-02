import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class RegistrationLocationsStore {
  @ignore @observable registrationLocations?: Models.RegistrationLocations
  @observable listRegistrationLocations?: Models.RegistrationLocations[] = []
  @observable listRegistrationLocationsCount: number = 0
  @ignore @observable checkExitsLabEnvCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.registrationLocations = {
      ...this.registrationLocations,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      confidential: false,
      printLabel: false,
      neverBill: false,
      urgent: false,
    }
  }

  @computed get registrationLocationsService() {
    return new Services.RegistrationLocationsService()
  }

  @action fetchRegistrationLocations(page?, limit?) {
    this.registrationLocationsService
      .listRegistrationLocations(page, limit)
      .then((res) => {
        if (!res.success) return alert(res.message)
        this.listRegistrationLocationsCount = res.data.count
        this.listRegistrationLocations = res.data.registrationLocations
      })
  }
   
  @action updateRegistrationLocations(locations: Models.RegistrationLocations) {
    this.registrationLocations = locations
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}

export default RegistrationLocationsStore
