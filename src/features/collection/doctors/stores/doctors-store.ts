import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

export class DoctorsStore {
  doctors!: Models.Doctors
  listDoctors: Models.Doctors[]
  listDoctorsCopy: Models.Doctors[]
  listDoctorsCount: number
  checkExitsLabEnvCode: boolean

  constructor() {
    this.listDoctors = []
    this.listDoctorsCopy = []
    this.listDoctorsCount = 0
    this.checkExitsLabEnvCode = false
    this.doctors = {
      ...this.doctors,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      confidential: false,
      urgent: false,
    }

    makeObservable<DoctorsStore, any>(this, {
      doctors: observable,
      listDoctors: observable,
      listDoctorsCopy: observable,
      listDoctorsCount: observable,
      checkExitsLabEnvCode: observable,

      doctorsService: computed,
      fetchDoctors: action,
      updateDoctorsList: action,
      updateDoctors: action,
      updateExistsLabEnvCode: action,
    })
  }

  get doctorsService() {
    return new Services.DoctorsService()
  }
  
  fetchDoctors(page?, limit?) {
    this.doctorsService.listDoctors(page, limit)
  }
   
  updateDoctorsList(res: any) {
    if(!Array.isArray(res)){
      if (!res.doctors.success) return alert(res.message)
      this.listDoctors = res.doctors.data
      this.listDoctorsCopy = res.doctors.data
      this.listDoctorsCount = res.doctors.paginatorInfo.count
    }else{
      this.listDoctors= res
    }

  }

  filterDoctorsList(res: any){
    this.listDoctors = res.filterDoctors.data
    this.listDoctorsCount = res.filterDoctors.paginatorInfo.count
  }

  updateDoctors(methods: Models.Doctors) {
    this.doctors = methods
  }
  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}  
