import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
export class CorporateClientsStore {
  @ignore @observable corporateClients!: Models.CorporateClients
  @observable listCoporateClientsCount: number 
  @observable listCorporateClients: Models.CorporateClients[] 
  @ignore @observable checkExistsEnvCode: boolean
  
  constructor() {
    this.listCoporateClientsCount = 0
    this.listCorporateClients = []
    this.checkExistsEnvCode = false
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

    makeObservable<CorporateClientsStore, any>(this, {
      corporateClients: observable,
      listCoporateClientsCount: observable,
      listCorporateClients: observable,
      checkExistsEnvCode: observable,
    })
  }

  @computed get corporateClientsService() {
    return new Services.CorporateClientsService()
  }

  @action fetchCorporateClients(page?, limit?) {
    this.corporateClientsService.listCorporateClients(page, limit)
  }

  @action updateCorporateClientsList(res: any){
    if (!res.success) return alert(res.message)
    this.listCoporateClientsCount = res.data.count
    this.listCorporateClients = res.data.corporateClients
  }

  @action updateCorporateClients(clients: Models.CorporateClients) {
    this.corporateClients = clients
  }
  
  @action updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}