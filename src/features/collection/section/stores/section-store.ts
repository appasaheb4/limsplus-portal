import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
  
@version(0.1)
class SectionStore {
  @observable listSection: Models.Section[] = []
  @observable listSectionCount: number = 0 
  
  @ignore @observable section?: Models.Section

  constructor() {
    makeAutoObservable(this)
  }

  @computed get sectionService() {
    return new Services.SectionService(
    )
  }
  
  @action fetchSections(page?,limit?) {
    this.sectionService.listSection(page,limit).then((res) => {
      this.listSection = res
    })
  }

  @action updateSection(section: Models.Section) {
    this.section = section
  }
}

export default SectionStore
