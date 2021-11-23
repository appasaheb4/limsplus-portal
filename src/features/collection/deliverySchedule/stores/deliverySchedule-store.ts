import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

export class DeliveryScheduleStore {
  deliverySchedule!: Models.DeliverySchedule
  listDeliverySchedule: Models.DeliverySchedule[]
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
      pStartTime: LibraryUtils.moment().format("hh:mm a"),
      pEndTime: LibraryUtils.moment().format("hh:mm a"),
      cutofTime: LibraryUtils.moment().format("hh:mm a"),
      secoundCutofTime: LibraryUtils.moment().format("hh:mm a"),
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
    return new Services.DeliveryScheduleService()
  }
  
  fetchDeliverySchedule(page?, limit?) {
    this.deliveryScheduleService.listDeliverySchdule(page, limit)
  }

  updateDeliveryScheduleList(res: any) {
    if (!res.deliverySchdules.success) return alert(res.deliverySchdules.message)
    this.listDeliverySchedule = res.deliverySchdules.data
    this.listDeliveryScheduleCount = res.deliverySchdules.paginatorInfo.count
  }

  filterDeliveryScheduleList(res: any){
    this.listDeliverySchedule = res.filterDeliverySchdule.data
    this.listDeliveryScheduleCount = res.filterDeliverySchdule.paginatorInfo.count
  }  
  
  updateDeliverySchedule(deliverySchedule: Models.DeliverySchedule) {
    this.deliverySchedule = deliverySchedule
  }

  updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
