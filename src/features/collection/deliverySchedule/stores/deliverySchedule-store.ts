import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class DeliveryScheduleStore {
  @ignore @observable deliverySchedule?: Models.DeliverySchedule
  @observable listDeliverySchedule?: Models.DeliverySchedule[] = []

  constructor() {
    makeAutoObservable(this)
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
  }

  @computed get deliveryScheduleService() {
    return new Services.DeliveryScheduleService(
    )
  }

  fetchDeliverySchedule() {
    this.deliveryScheduleService.listDeliverySchdule().then((res) => {
      this.listDeliverySchedule = res
    })
  }

  @action updateDeliverySchedule(deliverySchedule: Models.DeliverySchedule) {
    this.deliverySchedule = deliverySchedule
  }
}

export default DeliveryScheduleStore
