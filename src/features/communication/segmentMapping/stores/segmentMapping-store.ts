import { ignore, version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import { Mapping } from "../../models"
import * as Services from "../services"

interface UpdateItem {
  value: string | boolean | undefined | any[]
  dataField: string
  id: string
}

@version(0.1)
export class SegmentMappingStore {
  @ignore @observable segmentMapping!: Models.SegmentMapping
  @observable listSegmentMapping: Models.SegmentMapping[]
  @observable listSegmentMappingCount: number
  @ignore @observable selectedItems: Models.SegmentMapping[]
  @ignore @observable updateItem!: UpdateItem
  @ignore @observable mapping: Mapping[]
  constructor() {
    this.listSegmentMapping = []
    this.listSegmentMappingCount = 0
    this.selectedItems = []
    this.mapping = []
    makeObservable<SegmentMappingStore, any>(this, {
      segmentMapping: observable,
      listSegmentMapping: observable,
      listSegmentMappingCount: observable,
      selectedItems: observable,
      updateItem: observable,
      mapping: observable,
    })
  }

  @computed get segmentMappingService() {
    return new Services.SegmentMappingService()
  }

  @action fetchListSegmentMapping(page?, limit?) {
    this.segmentMappingService.listSegmentMapping(page, limit)
  }

  @action updateListSegmentMapping(res: any) {
    if (!res.success) return alert(res.message)
    this.listSegmentMapping = res.data.segmentMappingList
    this.listSegmentMappingCount = res.data.count
  }

  @action fetchmappingList() {
    this.segmentMappingService.mappingList().then((mapping) => {
      this.mapping = mapping
    })
  }

  @action updateSegmentMapping = (segmentMapping: Models.SegmentMapping) => {
    this.segmentMapping = segmentMapping
  }

  @action updateSelectedItem = (items: Models.SegmentMapping[]) => {
    this.selectedItems = items
  }

  @action changeUpdateItem = (item: UpdateItem) => {
    this.updateItem = item
  }
}
