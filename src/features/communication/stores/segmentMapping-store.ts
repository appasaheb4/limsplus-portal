import { ignore, version } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class SegmentMappingStore {
  @ignore @observable segmentMapping?: Models.SegmentMapping
  @observable listSegmentMapping?: Models.SegmentMapping[] = []
  @observable listSegmentMappingCount: number = 0
  @ignore @observable selectedItems?: Models.SegmentMapping[] = []
  @ignore @observable updateItem?: Models.UpdateItem
  @ignore @observable mapping?: Models.Mapping[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @action fetchListSegmentMapping(page?, limit?) {
    this.segmentMappingService.listSegmentMapping(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listSegmentMapping = res.data.segmentMappingList
      this.listSegmentMappingCount = res.data.count
    })
  }   

  @action fetchmappingList() {
    this.segmentMappingService.mappingList().then((mapping) => {
      this.mapping = mapping
    })
  }

  @computed get segmentMappingService() {
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
