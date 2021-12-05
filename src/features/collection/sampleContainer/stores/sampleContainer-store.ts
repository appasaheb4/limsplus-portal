import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

export class SampleContainerStore {
  sampleContainer!: Models.SampleContainer
  listSampleContainer!: Models.SampleContainer[]
  listSampleContainerCopy!: Models.SampleContainer[]
  listSampleContainerCount!: number
  checkExitsEnvCode!: boolean

  constructor() {
    this.listSampleContainer = []
    this.checkExitsEnvCode = false

    makeObservable<SampleContainerStore, any>(this, {
      sampleContainer: observable,
      listSampleContainer: observable,
      listSampleContainerCount: observable,
      checkExitsEnvCode: observable,

      sampleContainerService: computed,
      fetchListSampleContainer: action,
      updateSampleContainerList: action,
      updateSampleContainer: action,
      updateExitsEnvCode: action,
    })
  }

  get sampleContainerService() {
    return new Services.SampleContainerService()
  }

  fetchListSampleContainer(page?, limit?) {
    this.sampleContainerService.listSampleContainer(page, limit)
  }

  updateSampleContainerList(res: any) {
    if(!Array.isArray(res)){
      if (!res.sampleContainers.success) return alert(res.sampleContainers.message)
      this.listSampleContainer = res.sampleContainers.data
      this.listSampleContainerCopy = res.sampleContainers.data
      this.listSampleContainerCount = res.sampleContainers.paginatorInfo.count
    }else{
      this.listSampleContainer = res
    }
  }
  
  filterSampleContainerList(res: any) {
    this.listSampleContainer = res.filterSampleContainers.data
    this.listSampleContainerCount = res.filterSampleContainers.paginatorInfo.count
  }

  updateSampleContainer = (sampleContainer: Models.SampleContainer) => {
    this.sampleContainer = sampleContainer
  }

  updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
