import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class RefernceRanges {
    @ignore @observable referenceRanges!: Models.ReferenceRanges
    @observable listReferenceRanges: Models.ReferenceRanges[] = []
    @observable listAllReferenceRangesCount: number = 0
    @ignore @observable checkExitsLabEnvCode?: boolean = false
    constructor(){
        makeAutoObservable(this)
    }
    @computed get priceListService() {
        return new Services.ReferenceRangesService()
      }
    @action fetchListReferenceRanges(){
        //api 
    }
    @action updateReferenceRanges(ranges: Models.ReferenceRanges) {
        this.referenceRanges = ranges
      }
      @action updateExistsLabEnvCode = (status: boolean) => {
        this.checkExitsLabEnvCode = status
      }
}
export default RefernceRanges