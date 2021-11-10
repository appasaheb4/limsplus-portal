import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from 'dayjs'

@version(0.1)
export class RefernceRangesStore {
    @ignore @observable referenceRanges!: Models.ReferenceRanges
    @observable listReferenceRanges: Models.ReferenceRanges[] 
    @observable listReferenceRangesCount: number 
    @ignore @observable checkExitsRecord: boolean 
    
    constructor(){
      this.listReferenceRanges = []
      this.listReferenceRangesCount = 0
      this.checkExitsRecord = false
        this.referenceRanges ={
          ...this.referenceRanges,
          dateCreation: new Date(),
          dateActive: new Date(),
          dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
          version: 1,
        }

        makeObservable<RefernceRangesStore, any>(this, {
          referenceRanges: observable,
          listReferenceRanges: observable,
          listReferenceRangesCount: observable,
          checkExitsRecord: observable,
        })
    }
    @computed get referenceRangesService() {
        return new Services.ReferenceRangesService()
      }
      
    @action fetchListReferenceRanges(page?,limit?){
      this.referenceRangesService.listReferenceRanges(page, limit)
    }

    @action updateReferenceRangesList(res: any){
      if(!res.referenceRanges.success) return alert(res.referenceRanges.message)
      this.listReferenceRanges = res.referenceRanges.data
      this.listReferenceRangesCount = res.referenceRanges.paginatorInfo.count
    }


    @action updateReferenceRanges(ranges: Models.ReferenceRanges) {
        this.referenceRanges = ranges
      }
      @action updateExistsRecord = (status: boolean) => {
        this.checkExitsRecord = status
      }
}