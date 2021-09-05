import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class SectionStore {
  @observable listSection: Models.Section[] = []
  @observable listSectionCount: number = 0
  @ignore @observable checkExitsEnvCode?: boolean = false

  @ignore @observable section?: Models.Section

  constructor() {
    makeAutoObservable(this)
  }

  @computed get sectionService() {
    return new Services.SectionService()
  }

  @action fetchSections(page?, limit?) {
    this.sectionService.listSection(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listSection = res.data.section
      this.listSectionCount = res.data.count
    })
  }

  @action updateSection(section: Models.Section) {
    this.section = section
  }
  
  @action setExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }
}

export default SectionStore
