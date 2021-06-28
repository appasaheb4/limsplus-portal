import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class DoctorsStore {
  @ignore @observable methods?: Models.Doctors
  @observable listMethods?: Models.Doctors[] = []

  constructor() {
    makeAutoObservable(this)
  }
   
  @computed get doctorsService() {
    return new Services.DoctorsService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchMethods() {
    this.doctorsService.listMethods().then((res) => {
      this.listMethods = res
    })
  }

  @action updateMethods(methods: Models.Doctors) {
    this.methods = methods
  }
}

export default DoctorsStore
