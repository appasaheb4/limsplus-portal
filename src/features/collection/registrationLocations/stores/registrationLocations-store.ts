import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class RegistrationLocationsStore {
  @ignore @observable registrationLocations?: Models.RegistrationLocations
  @observable listRegistrationLocations?: Models.RegistrationLocations[] = []

  constructor() {
    makeAutoObservable(this)
    this.registrationLocations ={
      ...this.registrationLocations,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,  
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
      confidential:false,
      urgent:false
    }
  }
   
  @computed get registrationLocationsService() {
    return new Services.RegistrationLocationsService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchDoctors() {
    this.registrationLocationsService.listDoctors().then((res) => {
      this.listRegistrationLocations = res
    })
  }

  @action updateRegistrationLocations(locations: Models.RegistrationLocations) {
    this.registrationLocations = locations
  }
}

export default RegistrationLocationsStore
