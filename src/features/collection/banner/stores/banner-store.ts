import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class BannerStore {
  @ignore @observable banner!: Models.Banner
  @observable listBanner: Models.Banner[]
  @observable listAllBanner: Models.Banner[]
  @observable listBannerCount: number
  constructor() {
    this.listBanner = []
    this.listAllBanner = []
    this.listBannerCount = 0

    makeObservable<BannerStore, any>(this, {
      banner: observable,
      listBanner: observable,
      listAllBanner: observable,
      listBannerCount: observable,
    })
  }

  @computed get BannerService() {
    return new Services.BannerService()
  }

  @action fetchListBanner(page?, limit?) {
    this.BannerService.listBanner(page, limit)
  }

  @action updateBannerList(res: any) {
    if (!res.banners.success) return alert(res.banners.message)
    this.listBanner = res.banners.data
    this.listBannerCount = res.banners.paginatorInfo.count
  }

  @action updateFilterBannerList(res: any) {
    this.listBanner = res.filterBanners.data
    this.listBannerCount = res.filterBanners.paginatorInfo.count
  }

  @action fetchListAllBanner() {
    this.BannerService.listAllBanner()
  }

  @action updateListAllBanner(res: any) {
    if (!res.bannersListAll.success) return alert(res.bannersListAll.message)
    this.listAllBanner = res.bannersListAll.data
  }

  @action updateBanner = (banner: Models.Banner) => {
    this.banner = banner
  }
}
