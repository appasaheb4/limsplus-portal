import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as LibraryUtils from "@lp/library/utils"
import * as Services from "../services"

@version(0.1)
export class RefernceRanges {
    @ignore @observable referenceRanges!: Models.ReferenceRanges
    @observable listReferenceRanges: Models.ReferenceRanges[] = []
    @observable listReferenceRangesCount: number = 0
    @ignore @observable checkExitsRecord?: boolean = false
    
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
      
    @action fetchListReferenceRanges(page?,limit?){
      this.referenceRangesService.listReferenceRanges(page, limit).then((res) => {
        this.listReferenceRanges = res.getAllReferenceRanges.data
        this.listReferenceRangesCount = res.getAllReferenceRanges.count
      })
    }
    @action updateReferenceRanges(ranges: Models.ReferenceRanges) {
        this.referenceRanges = ranges
      }
      @action updateExistsRecord = (status: boolean) => {
        this.checkExitsRecord = status
      }
}
export default RefernceRanges