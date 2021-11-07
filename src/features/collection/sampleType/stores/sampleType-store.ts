import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class SampleTypeStore {
  @observable listSampleType!: Models.SampleType[]
  @observable listSampleTypeCount!: number
  @ignore @observable sampleType!: Models.SampleType
  @ignore @observable checkExitsEnvCode: boolean

  constructor() {
    this.listSampleType = []
    this.sampleType = new Models.SampleType({})
    this.checkExitsEnvCode = false

    makeObservable<SampleTypeStore, any>(this, {
      listSampleType: observable,
      listSampleTypeCount: observable,
      sampleType: observable,
      checkExitsEnvCode: observable,
    })
  }

  @computed get sampleTypeService() {
    return new Services.SampleTypeService()
  }
  
  @action fetchSampleTypeList(page?, limit?) {
    this.sampleTypeService.listSampleType(page, limit)
  }
    
  @action updateSampleTypeList(res: any) {
    if (!res.sampleTypes.success) return alert(res.sampleTypes.message)
    this.listSampleType = res.sampleTypes.data
    this.listSampleTypeCount = res.sampleTypes.paginatorInfo.count
  }

  @action updateSampleType = (sampleType: Models.SampleType) => {
    this.sampleType = sampleType
  }

  @action updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
