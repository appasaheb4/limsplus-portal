import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

@version(0.1)
export class DoctorsStore {
  @ignore @observable doctors!: Models.Doctors
  @observable listDoctors: Models.Doctors[]
  @observable listDoctorsCount: number
  @ignore @observable checkExitsLabEnvCode: boolean

  constructor() {
    this.listDoctors = []
    this.listDoctorsCount = 0
    this.checkExitsLabEnvCode = false
    this.doctors = {
      ...this.doctors,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      confidential: false,
      urgent: false,
    }
    makeObservable<DoctorsStore, any>(this, {
      doctors: observable,
      listDoctors: observable,
      listDoctorsCount: observable,
      checkExitsLabEnvCode: observable,
    })
  }

  @computed get doctorsService() {
    return new Services.DoctorsService()
  }

  @action fetchDoctors(page?, limit?) {
    this.doctorsService.listDoctors(page, limit)
  }

  @action updateDoctorsList(res: any) {
    if (!res.doctors.success) return alert(res.message)
    this.listDoctors = res.doctors.data
    this.listDoctorsCount = res.doctors.paginatorInfo.count
  }

  @action updateDoctors(methods: Models.Doctors) {
    this.doctors = methods
  }
  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
