import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class SampleContainerStore {
  @ignore @observable sampleContainer?: Models.SampleContainer
  @observable listSampleContainer: Models.SampleContainer[] = []
  @observable listSampleContainerCount: number = 0 
  constructor() {
    makeAutoObservable(this)
  }

  @computed get sampleContainerService() {  
    return new Services.SampleContainerService(
    )
  }

  @action fetchListSampleContainer(page?,limit?) {
    this.sampleContainerService.listSampleContainer(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listSampleContainer = res.data.sampleList
      this.listSampleContainerCount = res.data.count
    })
  }
  
  @action updateSampleContainer = (sampleContainer: Models.SampleContainer) => {
    this.sampleContainer = sampleContainer
  }
}
export default SampleContainerStore
