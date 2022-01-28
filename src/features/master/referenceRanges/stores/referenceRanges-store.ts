import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

export class RefernceRangesStore {
  referenceRanges!: Models.ReferenceRanges
  listReferenceRanges: Models.ReferenceRanges[]
  listReferenceRangesCount: number
  checkExitsRecord: boolean

  constructor() {
    this.listReferenceRanges = []
    this.listReferenceRangesCount = 0
    this.checkExitsRecord = false
    this.referenceRanges = {
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

      referenceRangesService: computed,
      fetchListReferenceRanges: action,
      updateReferenceRangesList: action,
      updateReferenceRanges: action,
      updateExistsRecord: action,
    })
  }
  get referenceRangesService() {
    return new Services.ReferenceRangesService()
  }

  fetchListReferenceRanges(page?, limit?) {
    this.referenceRangesService.listReferenceRanges(page, limit)
  }

  updateReferenceRangesList(res: any) {
    if (!res.referenceRanges.success) return alert(res.referenceRanges.message)
    this.listReferenceRanges = res.referenceRanges.data
    this.listReferenceRangesCount = res.referenceRanges.paginatorInfo.count
  }

  filterReferenceRangesList(res: any){
    this.listReferenceRanges = res.filterReferenceRange.data
    this.listReferenceRangesCount = res.filterReferenceRange.paginatorInfo.count
  }

  updateReferenceRanges(ranges: Models.ReferenceRanges) {
    this.referenceRanges = ranges
  }
  updateExistsRecord = (status: boolean) => {
    this.checkExitsRecord = status
  }
}
