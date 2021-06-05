import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class SectionStore {
 // @observable listSection: Models.Section[] = []
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
    return new Services.SectionService(
      Stores.loginStore.login?.accessToken as string
    )
  }

 @action updateSection(section: Models.Section){
   this.section = section;
 }
}

export default SectionStore
