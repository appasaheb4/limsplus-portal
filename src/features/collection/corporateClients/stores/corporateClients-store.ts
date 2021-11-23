import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

export class CorporateClientsStore {
  corporateClients!: Models.CorporateClients
  listCoporateClientsCount: number
  listCorporateClients: Models.CorporateClients[]
  checkExistsEnvCode: boolean

  constructor() {
    this.listCoporateClientsCount = 0
    this.listCorporateClients = []
    this.checkExistsEnvCode = false
    this.corporateClients = {
      ...this.corporateClients,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      confidential: false,
      urgent: false,
    }

    makeObservable<CorporateClientsStore, any>(this, {
      corporateClients: observable,
      listCoporateClientsCount: observable,
      listCorporateClients: observable,
      checkExistsEnvCode: observable,

      corporateClientsService: computed,
      fetchCorporateClients: action,
      updateCorporateClientsList: action,
      updateCorporateClients: action,
      updateExistsEnvCode: action,
    })
  }

  get corporateClientsService() {
    return new Services.CorporateClientsService()
  }

  fetchCorporateClients(page?, limit?) {
    this.corporateClientsService.listCorporateClients(page, limit)
  }

  updateCorporateClientsList(res: any) {
    if (!res.corporateClients.success) return alert(res.corporateClients.message)
    this.listCoporateClientsCount = res.corporateClients.paginatorInfo.count
    this.listCorporateClients = res.corporateClients.data
  }

  filterCorporateClientsList(res: any){
    this.listCoporateClientsCount = res.filterCorporateClient.paginatorInfo.count
    this.listCorporateClients = res.filterCorporateClient.data
  }

  updateCorporateClients(clients: Models.CorporateClients) {
    this.corporateClients = clients
  }

  updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status
  }
}
