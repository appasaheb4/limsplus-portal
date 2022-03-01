import { makeObservable, action, observable, computed } from "mobx"
import {DeliverySchedule} from "../models"
import {DeliveryScheduleService} from "../services"
import dayjs from "dayjs"

export class DeliveryScheduleStore {
  deliverySchedule!: DeliverySchedule
  listDeliverySchedule: DeliverySchedule[]
  listDeliveryScheduleCopy!: DeliverySchedule[]
  listDeliveryScheduleCount: number
  checkExistsEnvCode: boolean

  constructor() {
    this.listDeliverySchedule = []
    this.listDeliveryScheduleCount = 0
    this.checkExistsEnvCode = false
    this.deliverySchedule = {
      ...this.deliverySchedule,
      sundayProcessing: false,
      holidayProcessing: false,
      sundayReporting: false,
      holidayReporting: false,
      onTime: false,
      pStartTime: dayjs().format("hh:mm a"),
      pEndTime: dayjs().format("hh:mm a"),
      cutofTime: dayjs().format("hh:mm a"),
      secoundCutofTime: dayjs().format("hh:mm a"),
    }
    makeObservable<DeliveryScheduleStore, any>(this, {
      deliverySchedule: observable,
      listDeliverySchedule: observable,
      listDeliveryScheduleCount: observable,
      checkExistsEnvCode: observable,

      deliveryScheduleService: computed,
      fetchDeliverySchedule: action,
      updateDeliveryScheduleList: action,
      updateDeliverySchedule: action,
      updateExistsEnvCode: action,
      filterDeliveryScheduleList: action
    })
  }

  get deliveryScheduleService() {
    return new DeliveryScheduleService()
  }
  
  fetchDeliverySchedule(page?, limit?) {
    this.deliveryScheduleService.listDeliverySchdule(page, limit)
  }

  updateDeliveryScheduleList(res: any) {
    if(!Array.isArray(res)){
      if (!res.deliverySchdules.success) return alert(res.deliverySchdules.message)
      this.listDeliverySchedule = res.deliverySchdules.data
      this.listDeliveryScheduleCopy = res.deliverySchdules.data
      this.listDeliveryScheduleCount = res.deliverySchdules.paginatorInfo.count
  }else{
    this.listDeliverySchedule = res
  }
    }
    

  filterDeliveryScheduleList(res: any){
    this.listDeliverySchedule = res.filterDeliverySchdule.data
    this.listDeliveryScheduleCount = res.filterDeliverySchdule.paginatorInfo.count
  }  
  
  updateDeliverySchedule(deliverySchedule: DeliverySchedule) {
    this.deliverySchedule = deliverySchedule
  }

  updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
