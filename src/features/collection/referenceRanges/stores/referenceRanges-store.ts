import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as LibraryUtils from "@lp/library/utils"
import * as Services from "../services"

@version(0.1)
class RefernceRanges {
    @ignore @observable referenceRanges!: Models.ReferenceRanges
    @observable listReferenceRanges: Models.ReferenceRanges[] = []
    @observable listAllReferenceRangesCount: number = 0
    @ignore @observable checkExitsLabEnvCode?: boolean = false
    constructor(){
        makeAutoObservable(this)
        this.referenceRanges ={
          ...this.referenceRanges,
          dateCreation: LibraryUtils.moment().unix(),
          dateActive: LibraryUtils.moment().unix(),
          dateExpiry: LibraryUtils.moment().unix(),
          version: 1,
          keyNum: "1",
        }
    }
    @computed get referenceRangesService() {
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