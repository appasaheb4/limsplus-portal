import { ignore, version } from "mobx-sync"
import { makeAutoObservable,action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
//import { Stores } from "@lp/features/login/stores"

@version(0.1)
class SegmentMappingStore {
  @ignore @observable segmentMapping?: Models.SegmentMapping
  @observable listSegmentMapping?: Models.SegmentMapping[] = []
  @ignore @observable selectedItems?: Models.SegmentMapping[] = []
  @ignore @observable updateItem?: Models.UpdateItem
  @ignore @observable mapping?: Models.Mapping[] = []
  constructor() {
    makeAutoObservable(this)
}

  @action fetchListSegmentMapping() {
    this.segmentMappingService.listSegmentMapping().then((listSegmentMapping) => {
      //console.log({ listSegmentMapping })
      this.listSegmentMapping = listSegmentMapping
    })
  }

  @action fetchmappingList() {
    this.segmentMappingService.mappingList().then((mapping) => {
      this.mapping = mapping
    })
  }

  @computed get segmentMappingService() {
    //Stores.loginStore.login?.token as string
    return new Services.CommunicationService()
  }

  @action updateSegmentMapping = (segmentMapping: Models.SegmentMapping) => {
    this.segmentMapping = segmentMapping
  }

  @action updateSelectedItem = (items: Models.SegmentMapping[]) => {
    this.selectedItems = items
  }

  @action changeUpdateItem = (item: Models.UpdateItem) => {
    this.updateItem = item
  }
}

export default SegmentMappingStore
