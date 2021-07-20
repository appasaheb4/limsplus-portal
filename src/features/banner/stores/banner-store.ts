import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class BannerStore {
  @ignore @observable banner?: Models.IBanner
  @observable listBanner: Models.IBanner[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @computed get BannerService() {
    return new Services.BannerService()
  }

  @action fetchListBanner() {
    this.BannerService.listBanner().then((banner) => {
      //console.log({ banner })
      this.listBanner = banner
    })
  }
  @action updateBanner = (banner: Models.IBanner) => {
    this.banner = banner
  }
}
export default BannerStore
