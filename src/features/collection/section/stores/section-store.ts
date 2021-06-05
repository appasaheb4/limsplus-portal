import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class SectionStore {
  @observable listSection: Models.Section[] = []
  @ignore @observable section?: Models.Section
  // @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  // private init() {
  //   return {
  //     code: "",
  //     description: "",
  //   }
  // }

  @computed get SectionService() {
    return new Services.sectionService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  @action fetchListSection() {
   this.SectionService.listSection().then((res) => {
      // console.log({ deginisation: res });
      this.listSection = res
    })
  }

  // @action setExitsCode(status: boolean) {
  //   this.checkExitsCode = status
  // }

  // @action updateDescription = (section: Models.Section) => {
  //   this.listSection = section
  // }

  // @action clear() {
  //   this.deginisation = this.init()
  // }
}

export default SectionStore
