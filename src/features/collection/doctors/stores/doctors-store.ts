import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class DoctorsStore {
  @ignore @observable doctors?: Models.Doctors
  @observable listDoctors?: Models.Doctors[] = []

  constructor() {
    makeAutoObservable(this)
  }
   
  @computed get doctorsService() {
    return new Services.DoctorsService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchDoctors() {
    this.doctorsService.listMethods().then((res) => {
      this.listDoctors = res
    })
  }

  @action updateDoctors(methods: Models.Doctors) {
    this.doctors = methods
  }
}

export default DoctorsStore
