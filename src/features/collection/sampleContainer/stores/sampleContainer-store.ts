import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class SampleContainerStore {
  @ignore @observable sampleContainer!: Models.SampleContainer
  @observable listSampleContainer!: Models.SampleContainer[]
  @observable listSampleContainerCount!: number
  @ignore @observable checkExitsEnvCode!: boolean

  constructor() {
    this.listSampleContainer = []
    this.checkExitsEnvCode = false
    makeObservable<SampleContainerStore, any>(this, {
      sampleContainer: observable,
      listSampleContainer: observable,
      listSampleContainerCount: observable,
      checkExitsEnvCode: observable,
    })
  }
  
  @computed get sampleContainerService() {
    return new Services.SampleContainerService()
  }
   
  @action fetchListSampleContainer(page?, limit?) {
    this.sampleContainerService.listSampleContainer(page, limit)
  }
  
  @action updateSampleContainerList(res: any) {
    if (!res.sampleContainers.success) return alert(res.sampleContainers.message)
    this.listSampleContainer = res.sampleContainers.data
    this.listSampleContainerCount = res.sampleContainers.paginatorInfo.count
  }

  @action updateSampleContainer = (sampleContainer: Models.SampleContainer) => {
    this.sampleContainer = sampleContainer
  }

  @action updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
