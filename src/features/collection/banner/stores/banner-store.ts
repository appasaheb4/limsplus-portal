import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class BannerStore {
  banner!: Models.Banner
  listBanner: Models.Banner[]
  listAllBanner: Models.Banner[]
  listBannerCount: number
  
  constructor() {
    this.listBanner = []
    this.listAllBanner = []
    this.listBannerCount = 0

    makeObservable<BannerStore, any>(this, {
      banner: observable,
      listBanner: observable,
      listAllBanner: observable,
      listBannerCount: observable,

      BannerService: computed,
      fetchListBanner: action,
      updateBannerList: action,
      filterBannerList: action,
      fetchListAllBanner: action,
      updateListAllBanner: action,
      updateBanner: action,
    })
  }

  get BannerService() {
    return new Services.BannerService()
  }

  fetchListBanner(page?, limit?) {
    this.BannerService.listBanner(page, limit)
  }

  updateBannerList(res: any) {
    if (!res.banners.success) return alert(res.banners.message)
    this.listBanner = res.banners.data
    this.listBannerCount = res.banners.paginatorInfo.count
  }

  filterBannerList(res: any) {
    this.listBanner = res.filterBanners.data
    this.listBannerCount = res.filterBanners.paginatorInfo.count
  }

  fetchListAllBanner() {
    this.BannerService.listAllBanner()
  }

  updateListAllBanner(res: any) {
    if (!res.bannersListAll.success) return alert(res.bannersListAll.message)
    this.listAllBanner = res.bannersListAll.data
  }

  updateBanner = (banner: Models.Banner) => {
    this.banner = banner
  }
}
