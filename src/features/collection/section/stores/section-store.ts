import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryComponents from "@lp/library/components"

@version(0.1)
class SectionStore {
  @observable listSection: Models.Section[] = []
  @observable sectionListByDeptCode: Models.Section[] = []
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
    })
  }

  @action findSectionListByDeptCode = (code: string) => {
    this.sectionService.findSectionListByDeptCode(code).then((res) => {
      console.log({res});
      
      if (!res.success)
        return LibraryComponents.Atoms.Toast.error({
          message: `😔 ${res.message}`,
        })
      this.sectionListByDeptCode = res.data.sectionList
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
