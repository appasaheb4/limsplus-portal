import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class DoctorsStore {
  @ignore @observable doctors?: Models.Doctors
  @observable listDoctors?: Models.Doctors[] = []
  @observable listDoctorsCount: number = 0

  constructor() {
    makeAutoObservable(this)
    this.doctors ={
      ...this.doctors,
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
   
  @computed get doctorsService() {
    return new Services.DoctorsService(
    )
  }

  @action fetchDoctors(page?,limit?) {
    this.doctorsService.listDoctors(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listDoctors = res.data.doctors
      this.listDoctorsCount = res.data.count
    })
  }

  @action updateDoctors(methods: Models.Doctors) {
    this.doctors = methods
  }
}

export default DoctorsStore
