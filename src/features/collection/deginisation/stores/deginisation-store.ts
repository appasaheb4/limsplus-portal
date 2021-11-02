import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class DeginisationStore {
  @observable listDeginisation!: Models.Deginisation[]
  @observable listDeginisationCount: number = 0
  @ignore @observable deginisation!: Models.Deginisation
  @ignore @observable checkExitsCode: boolean = false

  constructor() {
    this.listDeginisation = []
    makeObservable<DeginisationStore, any>(this, {
      listDeginisation: observable,
      listDeginisationCount: observable,
      deginisation: observable,
      checkExitsCode: observable,
    })
  }


  @computed get DeginisationService() {
    return new Services.DeginisationService()
  }

  @action fetchListDeginisation(page?, limit?) {
    this.DeginisationService.listDeginisation(page, limit);
  }

  @action updateListDeginisation(res: any){
    if (!res.designations.success) return alert(res.designations.message)
    this.listDeginisation = res.designations.data
    this.listDeginisationCount = res.designations.paginatorInfo.count
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }

  @action updateDescription = (deginisation: Models.Deginisation) => {
    this.deginisation = deginisation
  }
}

