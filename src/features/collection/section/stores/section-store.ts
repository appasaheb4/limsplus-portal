import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class SectionStore {
  @observable listSection!: Models.Section[]
  @observable listSectionCount: number = 0
  @ignore @observable checkExitsEnvCode: boolean = false
  @ignore @observable section!: Models.Section
  
  constructor() {
    this.listSection = []
    makeObservable<SectionStore, any>(this, {
      listSection: observable,
      listSectionCount: observable,
      checkExitsEnvCode: observable,
      section: observable,
    })
  }

  @computed get sectionService() {
    return new Services.SectionService()
  }

  @action fetchSections(page?, limit?) {
    this.sectionService.listSection(page, limit)
  }

  @action updateSectionList(res: any){
    if (!res.sections.success) return alert(res.sections.message)
    this.listSection = res.sections.data
  }

  @action updateSection(section: Models.Section) {
    this.section = section
  }
    
  @action setExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}
