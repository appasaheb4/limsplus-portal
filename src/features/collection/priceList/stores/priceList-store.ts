import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class PriceListStore {
    @ignore @observable priceList!: Models.PriceList
    @observable listPriceList: Models.PriceList[] = []
    @observable listAllPriceList: Models.PriceList[] = []
    @observable listPriceListCount: number = 0
    @ignore @observable checkExitsLabEnvCode?: boolean = false
    constructor(){
        makeAutoObservable(this)
    }
    @computed get priceListService() {
        return new Services.PriceListService()
      }
    @action fetchListPriceList(){
        // api calling
    }
    @action updatePriceList(price: Models.PriceList) {
        this.priceList = price
      }
      @action updateExistsLabEnvCode = (status: boolean) => {
        this.checkExitsLabEnvCode = status
      }
}
export default PriceListStore