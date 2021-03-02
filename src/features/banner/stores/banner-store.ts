import { version, ignore } from "mobx-sync";
import { action, observable,computed } from "mobx";
import * as Models from "../models";
import * as Services from "../services";
import {Stores} from '@lp/features/login/stores';

@version(0.1)
class BannerStore {
  @ignore @observable banner?: Models.IBanner;  
  @observable listBanner: Models.IBanner[] = [];
  @action fetchListBanner() {
    Services.listBanner().then((banner) => {   
      console.log({ banner });
      this.listBanner = banner;
    });
  }

  @computed get BannerService() {
    return new Services.BannerService(Stores.loginStore.login?.token as string);
  }
  @action updateBanner = (banner: Models.IBanner) => {
    this.banner = banner;
  };
}
export default BannerStore;
