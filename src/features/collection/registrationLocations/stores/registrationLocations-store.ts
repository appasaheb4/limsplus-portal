import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

export class RegistrationLocationsStore {
  registrationLocations!: Models.RegistrationLocations
  listRegistrationLocations: Models.RegistrationLocations[]
  listRegistrationLocationsCount: number
  checkExitsLabEnvCode: boolean
  
  constructor() {
    this.listRegistrationLocations = []
    this.listRegistrationLocationsCount = 0
    this.checkExitsLabEnvCode = false
    this.registrationLocations = {
      ...this.registrationLocations,
      dateCreation: new Date(),
      dateActive: new Date(),
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

      registrationLocationsService: computed,
      fetchRegistrationLocations: action,
      updateRegistrationLocationsList: action,
      updateRegistrationLocations: action,
      updateExistsLabEnvCode: action,
      filterRegistrationLocationList: action
    })
  }

  get registrationLocationsService() {
    return new Services.RegistrationLocationsService()
  }

  fetchRegistrationLocations(page?, limit?) {
    this.registrationLocationsService.listRegistrationLocations(page, limit)
  }

  updateRegistrationLocationsList(res: any) {
    if (!res.registrationLocations.success)
      return alert(res.registrationLocations.message)
    this.listRegistrationLocationsCount =
      res.registrationLocations.paginatorInfo.count
    this.listRegistrationLocations = res.registrationLocations.data
  }

  filterRegistrationLocationList(res: any){
    this.listRegistrationLocationsCount =
      res.filterRegistrationLocations.paginatorInfo.count
    this.listRegistrationLocations = res.filterRegistrationLocations.data
  }  

  updateRegistrationLocations(locations: Models.RegistrationLocations) {
    this.registrationLocations = locations
  }
  
  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
