import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class DeginisationStore {
  @observable listDeginisation: Models.Deginisation[] = []
  @observable listDeginisationCount: number = 0
  @ignore @observable deginisation?: Models.Deginisation
  @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  private init() {
    return {
      code: "",
      description: "",
    }
  }

  @computed get DeginisationService() {
    return new Services.DeginisationService(
    )
  }

  fetchListDeginisation(page?,limit?) {
   this.DeginisationService.listDeginisation(page,limit).then((res) => {
      // console.log({ deginisation: res });
      this.listDeginisation = res
    })
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }

  @action updateDescription = (deginisation: Models.Deginisation) => {
    this.deginisation = deginisation
  }

  @action clear() {
    this.deginisation = this.init()
  }
}

export default DeginisationStore
