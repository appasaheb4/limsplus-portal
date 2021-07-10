import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
  
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
    }
  }

  @computed get deliveryScheduleService() {
    return new Services.DeliveryScheduleService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchDeliverySchedule() {
    this.deliveryScheduleService.listTestPanelMapping().then((res) => {
      this.listDeliverySchedule = res
    })
  }

  @action updateDeliverySchedule(deliverySchedule: Models.DeliverySchedule) {
    this.deliverySchedule = deliverySchedule
  }
}

export default DeliveryScheduleStore
