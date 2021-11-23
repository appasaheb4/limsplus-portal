import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

export class SectionStore {
  listSection!: Models.Section[]
  listSectionCount: number
  checkExitsEnvCode: boolean = false
  section!: Models.Section

  constructor() {
    this.listSection = []
    this.listSectionCount = 0
    makeObservable<SectionStore, any>(this, {
      listSection: observable,
      listSectionCount: observable,
      checkExitsEnvCode: observable,
      section: observable,

      sectionService: computed,
      fetchSections: action,
      updateSectionList: action,
      updateSection: action,
      setExitsEnvCode: action,
      filterSectionList: action,
    })
  }

  get sectionService() {
    return new Services.SectionService()
  }

  fetchSections(page?, limit?) {
    this.sectionService.listSection(page, limit)
  }

  updateSectionList(res: any) {
    if (!res.sections.success) return alert(res.sections.message)
    this.listSection = res.sections.data
    this.listSectionCount = res.sections.paginatorInfo.count
  }

  filterSectionList(res: any) {
    this.listSection = res.filterSections.data
    this.listSectionCount = res.filterSections.paginatorInfo.count
  }
  
  updateSection(section: Models.Section) {
    this.section = section
  }

  setExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
