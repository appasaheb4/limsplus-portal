import { action, observable } from "mobx";
import { version, ignore } from "mobx-sync";
import * as Clients from "@lp/library/clients";

import UsersStore from "@lp/features/users/stores";
import LabStore from "@lp/features/collection/labs/stores";
import DeginisationStore from "@lp/features/collection/deginisation/stores";
import DepartmentStore from "@lp/features/collection/department/stores";
import RoleStore from "@lp/features/collection/roles/stores";
import BannerStore from "@lp/features/banner/stores";

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false;
  @observable isLogin = Clients.storageClient.getItem("isLogin");

  @observable userStore = new UsersStore();
  @observable labStore = new LabStore();
  @observable deginisationStore = new DeginisationStore();
  @observable departmentStore = new DepartmentStore();
  @observable roleStore = new RoleStore();
  @observable bannerStore = new BannerStore();

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading;
  }

  @observable themes = {
    corporate: {
      primary: "#3B82EC",
      secondary: "#495057",
      tertiary: "#0069fc",
      success: "#4BBF73",
      info: "#1F9BCF",
      warning: "#f0ad4e",
      danger: "#d9534f",
    },
    modern: {
      primary: "#2c7be5",
      secondary: "#9d7bd8",
      tertiary: "#5997eb",
      success: "#4caf50",
      info: "#47bac1",
      warning: "#ff9800",
      danger: "#e51c23",
    },
    classic: {
      primary: "#47bac1",
      secondary: "#a180da",
      tertiary: "#5fc27e",
      success: "#5fc27e",
      info: "#5b7dff",
      warning: "#fcc100",
      danger: "#f44455",
    },
  };
}
const store = new RootStore();
export default store;
