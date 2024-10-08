import { makeObservable, action, observable, computed } from 'mobx';
import { Banner } from '../models';
import { BannerService } from '../services';

export class BannerStore {
  banner!: Banner;
  listBanner!: Banner[];
  listAllBanner!: Banner[];
  listBannerCount!: number;

  constructor() {
    this.reset();
    makeObservable<BannerStore, any>(this, {
      banner: observable,
      listBanner: observable,
      listAllBanner: observable,
      listBannerCount: observable,

      BannerService: computed,
      reset: action,
      fetchListBanner: action,
      updateBannerList: action,
      filterBannerList: action,
      fetchListAllBanner: action,
      updateListAllBanner: action,
      updateBanner: action,
    });
  }

  reset() {
    this.banner = new Banner({
      order: 1,
      isTitle: false,
      status: 'A',
    });
    this.listBanner = [];
    this.listAllBanner = [];
    this.listBannerCount = 0;
  }

  get BannerService() {
    return new BannerService();
  }

  fetchListBanner(page?, limit?) {
    this.BannerService.listBanner(page, limit);
  }

  updateBannerList(res: any) {
    if (!res.banners.success) return console.log(res.banners.message);
    this.listBanner = res.banners.data;
    this.listBannerCount = res.banners.paginatorInfo.count;
    this.banner = new Banner({
      ...this.banner,
      order: res.banners.paginatorInfo.count + 1,
    });
  }

  filterBannerList(res: any) {
    this.listBanner = res.filterBanners.data;
    this.listBannerCount = res.filterBanners.paginatorInfo.count;
  }

  fetchListAllBanner() {
    this.BannerService.listAllBanner();
  }

  updateListAllBanner(res: any) {
    if (!res.bannersListAll.success)
      return console.log(res.bannersListAll.message);
    this.listAllBanner = res.bannersListAll.data;
  }

  updateBanner = (banner: Banner) => {
    this.banner = banner;
  };
}
