import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class BannerStore {
  @ignore @observable banner!: Models.Banner
  @observable listBanner: Models.Banner[] = []
  @observable listBannerCount: number = 0
  constructor() {
    makeAutoObservable(this)
  }

  @computed get BannerService() {
    return new Services.BannerService()
  }

  @action fetchListBanner(page?, limit?) {
    this.BannerService.listBanner(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listBanner = res.data.banner
      this.listBannerCount = res.data.count
    })
  }

  @action updateBanner = (banner: Models.Banner) => {
    this.banner = banner
  }
}
export default BannerStore
