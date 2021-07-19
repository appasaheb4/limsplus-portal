import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class SectionStore {
  @observable listSection: Models.Section[] = []
  @ignore @observable section?: Models.Section

  constructor() {
    makeAutoObservable(this)
  }

  @computed get sectionService() {
    return new Services.SectionService(
      Stores.loginStore.login?.accessToken as string
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
