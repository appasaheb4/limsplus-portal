import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import { Mapping } from "../../models"
import * as Services from "../services"

interface UpdateItem {
  value: string | boolean | undefined | any[]
  dataField: string
  id: string
}

export class SegmentMappingStore {
  segmentMapping!: Models.SegmentMapping
  listSegmentMapping: Models.SegmentMapping[]
  listSegmentMappingCount: number
  selectedItems: Models.SegmentMapping[]
  updateItem!: UpdateItem
  mapping: Mapping[]

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

      segmentMappingService: computed,
      fetchListSegmentMapping: action,
      updateListSegmentMapping: action,
      fetchmappingList: action,
      updateMappingList: action,
      updateSegmentMapping: action,
      updateSelectedItem: action,
      changeUpdateItem: action,
      filterSegmentMappingList: action,
    })
  }

  get segmentMappingService() {
    return new Services.SegmentMappingService()
  }

  fetchListSegmentMapping(page?, limit?) {
    this.segmentMappingService.listSegmentMapping(page, limit)
  }

  updateListSegmentMapping(res: any) {
    if (!res.segmentMappings.success) return alert(res.segmentMappings.message)
    this.listSegmentMapping = res.segmentMappings.data
    this.listSegmentMappingCount = res.segmentMappings.paginatorInfo.count
  }

  filterSegmentMappingList(res: any) {
    this.listSegmentMapping = res.filterSegmentMappings.data
    this.listSegmentMappingCount = res.filterSegmentMappings.paginatorInfo.count
  }  

  fetchmappingList() {
    this.segmentMappingService.mappingList()
  }

  updateMappingList(res: any) {
    if (!res.segmentMappings.success) return alert(res.segmentMappings.message)
    this.mapping = res.segmentMappings.data
  }

  updateSegmentMapping = (segmentMapping: Models.SegmentMapping) => {
    this.segmentMapping = segmentMapping
  }

  updateSelectedItem = (items: Models.SegmentMapping[]) => {
    this.selectedItems = items
  }

  changeUpdateItem = (item: UpdateItem) => {
    this.updateItem = item
  }
}
