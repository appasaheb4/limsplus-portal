import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class SampleContainerStore {
  @ignore @observable sampleContainer?: Models.SampleContainer
  @observable listSampleContainer: Models.SampleContainer[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @computed get sampleContainerService() {  
    return new Services.SampleContainerService(
    )
  }

  @action fetchListSampleContainer() {
    this.sampleContainerService.listSampleContainer().then((sampleList) => {
      this.listSampleContainer = sampleList
    })
  }
  
  @action updateSampleContainer = (sampleContainer: Models.SampleContainer) => {
    this.sampleContainer = sampleContainer
  }
}
export default SampleContainerStore
