import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class CorporateClientsStore {
  @ignore @observable corporateClients?: Models.CorporateClients
  @observable listCoporateClientsCount: number = 0
  @observable listCorporateClients?: Models.CorporateClients[] = []

  constructor() {
    makeAutoObservable(this)
    this.corporateClients = {
      ...this.corporateClients,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
      confidential: false,
      urgent: false,
    }
  }

  @computed get corporateClientsService() {
    return new Services.CorporateClientsService(
    )
  }

  fetchCorporateClients(page?,limit?) {
    this.corporateClientsService.listCorporateClients(page,limit).then((res) => {
      this.listCorporateClients = res
    })
  }

  @action updateCorporateClients(clients: Models.CorporateClients) {
    this.corporateClients = clients
  }
}

export default CorporateClientsStore
