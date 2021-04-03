import { version, ignore } from "mobx-sync"
import { action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class DeginisationStore {
  @observable listDeginisation: Models.IDeginisation[] = []
  @ignore @observable deginisation?: Models.IDeginisation
  @ignore @observable checkExitsCode?: boolean = false

  private init() {
    return {
      code: "",
      description: "",
    }
  }

  fetchListDeginisation() {
    Services.listDeginisation().then((res) => {
      // console.log({ deginisation: res });
      this.listDeginisation = res
    })
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }
  @computed get DeginisationService() {
    return new Services.DeginisationService(Stores.loginStore.login?.token as string)
  }

  @action updateDescription = (deginisation: Models.IDeginisation) => {
    this.deginisation = deginisation
  }

  @action clear() {
    this.deginisation = this.init()
  }
}

export default DeginisationStore
