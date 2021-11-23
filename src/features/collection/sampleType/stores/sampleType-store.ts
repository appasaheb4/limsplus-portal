import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

export class SampleTypeStore {
  listSampleType!: Models.SampleType[]
  listSampleTypeCount!: number
  sampleType!: Models.SampleType
  checkExitsEnvCode: boolean

  constructor() {
    this.listSampleType = []
    this.sampleType = new Models.SampleType({})
    this.checkExitsEnvCode = false

    makeObservable<SampleTypeStore, any>(this, {
      listSampleType: observable,
      listSampleTypeCount: observable,
      sampleType: observable,
      checkExitsEnvCode: observable,

      sampleTypeService: computed,
      fetchSampleTypeList: action,
      updateSampleTypeList: action,
      updateSampleType: action,
      updateExitsEnvCode: action,
      filterSampleTypeList: action
    })
  }
       
  get sampleTypeService() {
    return new Services.SampleTypeService()
  }

  fetchSampleTypeList(page?, limit?) {
    this.sampleTypeService.listSampleType(page, limit)
  }

  updateSampleTypeList(res: any) {
    if (!res.sampleTypes.success) return alert(res.sampleTypes.message)
    this.listSampleType = res.sampleTypes.data
    this.listSampleTypeCount = res.sampleTypes.paginatorInfo.count
  }
  
  filterSampleTypeList(res: any){
    this.listSampleType = res.filterSampleTypes.data
    this.listSampleTypeCount = res.filterSampleTypes.paginatorInfo.count
  }

  updateSampleType = (sampleType: Models.SampleType) => {
    this.sampleType = sampleType
  }

  updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
