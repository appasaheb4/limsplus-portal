import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "../services";

@version(0.1)
class BannerStore {
  @ignore @observable banner?: Models.IBanner;
  @observable listBanner: Models.IBanner[] = [];
  @action fetchListBanner() {
    Services.listBanner().then((banner) => {
      this.listBanner = banner;
    });
  }
}
export default BannerStore;
