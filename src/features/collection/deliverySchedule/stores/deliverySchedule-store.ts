import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
export class DeliveryScheduleStore {
  @ignore @observable deliverySchedule!: Models.DeliverySchedule
  @observable listDeliverySchedule: Models.DeliverySchedule[]
  @observable listDeliveryScheduleCount: number
  @ignore @observable checkExistsEnvCode: boolean

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
    })
  }

  @computed get deliveryScheduleService() {
    return new Services.DeliveryScheduleService()
  }

  @action fetchDeliverySchedule(page?, limit?) {
    this.deliveryScheduleService.listDeliverySchdule(page, limit)
  }

  @action updateDeliveryScheduleList(res: any) {
    if (!res.deliverySchdules.success) return alert(res.deliverySchdules.message)
    this.listDeliverySchedule = res.deliverySchdules.data
    this.listDeliveryScheduleCount = res.deliverySchdules.paginatorInfo.count
  }

  @action updateDeliverySchedule(deliverySchedule: Models.DeliverySchedule) {
    this.deliverySchedule = deliverySchedule
  }

  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
