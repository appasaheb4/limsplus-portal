import { ignore, version } from "mobx-sync"
import { action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
//import { Stores } from "@lp/features/login/stores"

@version(0.1)
class SegmentMappingStore {
  @ignore @observable segmentMapping?: Models.SegmentMapping
  @observable listSegmentMapping?: Models.SegmentMapping[] = []

  @action fetchListSegmentMapping() {
    this.segmentMappingService.listSegmentMapping().then((listSegmentMapping) => {
      console.log({listSegmentMapping});
      
      this.listSegmentMapping = listSegmentMapping
    })
  }

  @computed get segmentMappingService() {
   //Stores.loginStore.login?.token as string
    return new Services.CommunicationService()
  }

  @action updateSegmentMapping = (segmentMapping: Models.SegmentMapping) => {
    this.segmentMapping = segmentMapping
  }
}

export default SegmentMappingStore
