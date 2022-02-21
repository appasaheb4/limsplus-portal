import { makeObservable, action, observable, computed } from "mobx"
import {PriceList} from "../models"
import {PriceListService} from "../services"
import dayjs from "dayjs"

export class PriceListStore {
  priceList!: PriceList
  listPriceList: PriceList[]
  listPriceListCount: number
  checkExitsPriceGEnvLabCode: boolean

  constructor() {
    this.listPriceList = []
    this.listPriceListCount = 0
    this.checkExitsPriceGEnvLabCode = false
    this.priceList = {
      ...this.priceList,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1
    }

    makeObservable<PriceListStore, any>(this, {
      priceList: observable,
      listPriceList: observable,
      listPriceListCount: observable,
      checkExitsPriceGEnvLabCode: observable,

      priceListService: computed,
      fetchListPriceList: action,
      updatePriceListRecords: action,
      updatePriceList: action,
      updateExitsPriceGEnvLabCode: action,
    })
  }

  get priceListService() {
    return new PriceListService()
  }

  fetchListPriceList(page?, limit?) {
    this.priceListService.listPiceList(page, limit)
  }

  updatePriceListRecords(res: any) {
    if (!res.priceLists.success) return alert(res.priceLists.message)
    this.listPriceList = res.priceLists.data
    this.listPriceListCount = res.priceLists.paginatorInfo.count
  }  
  
  filterPriceList(res: any){
    this.listPriceList = res.filterPriceList.data
    this.listPriceListCount = res.filterPriceList.paginatorInfo.count
  }

  updatePriceList(price: PriceList) {
    this.priceList = price
  }

  updateExitsPriceGEnvLabCode = (status: boolean) => {
    this.checkExitsPriceGEnvLabCode = status
  }
}
