import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as LibraryUtils from "@lp/library/utils"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class PriceListStore {
  @ignore @observable priceList!: Models.PriceList
  @observable listPriceList: Models.PriceList[] = []
  @observable listPriceListCount: number = 0
  @ignore @observable checkExitsPriceGEnvLabCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.priceList = {
      ...this.priceList,
      dateCreation: LibraryUtils.moment().unix(),
      dateActive: LibraryUtils.moment().unix(),
      dateExpiry: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      anyScheme: false,
      disOnScheme: false,
    }
  }
   
  @computed get priceListService() {
    return new Services.PriceListService()
  }

  @action fetchListPriceList(page?, limit?) {
    this.priceListService.listPiceList(page, limit).then((res) => {
      console.log({res});
      this.listPriceList = res.getAllPriceList.data
      this.listPriceListCount = res.getAllPriceList.count
    })
  }

  @action updatePriceList(price: Models.PriceList) {
    this.priceList = price
  }

  @action updateExitsPriceGEnvLabCode = (status: boolean) => {
    this.checkExitsPriceGEnvLabCode = status
  }
}
export default PriceListStore
