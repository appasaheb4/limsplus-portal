import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
  
@version(0.1)
class SectionStore {
  @observable listSection: Models.Section[] = []
  @ignore @observable section?: Models.Section

  constructor() {
    makeAutoObservable(this)
  }

  @computed get sectionService() {
    return new Services.SectionService(
    )
  }
  
  @action fetchSections() {
    this.sectionService.listSection().then((res) => {
      this.listSection = res
    })
  }

  @action updateSection(section: Models.Section) {
    this.section = section
  }
}

export default SectionStore
