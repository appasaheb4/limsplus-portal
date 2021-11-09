import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

@version(0.1)
export class PriceListStore {
  @ignore @observable priceList!: Models.PriceList
  @observable listPriceList: Models.PriceList[]
  @observable listPriceListCount: number
  @ignore @observable checkExitsPriceGEnvLabCode: boolean

  constructor() {
    this.listPriceList = []
    this.listPriceListCount = 0
    this.checkExitsPriceGEnvLabCode = false
    this.priceList = {
      ...this.priceList,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      anyScheme: false,
      disOnScheme: false,
    }

    makeObservable<PriceListStore, any>(this, {
      priceList: observable,
      listPriceList: observable,
      listPriceListCount: observable,
      checkExitsPriceGEnvLabCode: observable,
    })
  }

  @computed get priceListService() {
    return new Services.PriceListService()
  }

  @action fetchListPriceList(page?, limit?) {
    this.priceListService.listPiceList(page, limit)
  }

  @action updatePriceListRecords(res: any) {
    if (!res.priceLists.success) return alert(res.priceLists.message)
    this.listPriceList = res.priceLists.data
    this.listPriceListCount = res.priceLists.paginatorInfo.count
  }

  @action updatePriceList(price: Models.PriceList) {
    this.priceList = price
  }

  @action updateExitsPriceGEnvLabCode = (status: boolean) => {
    this.checkExitsPriceGEnvLabCode = status
  }
}
