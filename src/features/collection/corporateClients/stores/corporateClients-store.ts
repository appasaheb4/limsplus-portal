import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class CorporateClientsStore {
  @ignore @observable corporateClients?: Models.CorporateClients
  @observable listCoporateClientsCount: number = 0
  @observable listCorporateClients?: Models.CorporateClients[] = []
  @ignore @observable checkExistsEnvCode?: boolean = false
  
  constructor() {
    makeAutoObservable(this)
    this.corporateClients = {
      ...this.corporateClients,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      confidential: false,
      urgent: false,
    }
  }

  @computed get corporateClientsService() {
    return new Services.CorporateClientsService()
  }

  @action fetchCorporateClients(page?, limit?) {
    this.corporateClientsService.listCorporateClients(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listCoporateClientsCount = res.data.count
      this.listCorporateClients = res.data.corporateClients
    })
  }

  @action updateCorporateClients(clients: Models.CorporateClients) {
    this.corporateClients = clients
  }
  
  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}

export default CorporateClientsStore
