import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class DeliveryScheduleStore {
  @ignore @observable deliverySchedule?: Models.DeliverySchedule
  @observable listDeliverySchedule?: Models.DeliverySchedule[] = []
  @observable listDeliveryScheduleCount: number = 0
  @ignore @observable checkExistsEnvCode?: boolean = false

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

  @action fetchDeliverySchedule(page?,limit?) {
    this.deliveryScheduleService.listDeliverySchdule(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listDeliverySchedule = res.data.deliverySchdule
      this.listDeliveryScheduleCount = res.data.count
    })
  }

  @action updateDeliverySchedule(deliverySchedule: Models.DeliverySchedule) {
    this.deliverySchedule = deliverySchedule
  }

  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}

export default DeliveryScheduleStore
