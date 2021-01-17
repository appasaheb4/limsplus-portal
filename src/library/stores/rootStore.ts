import { action, observable } from "mobx";
import { version, ignore } from "mobx-sync";
import * as Clients from "@lp/library/clients";

import UsersStore from "@lp/features/users/stores";
import LabStore from "@lp/features/labs/stores";
import DeginisationStore from "@lp/features/deginisation/stores";
import DepartmentStore from "@lp/features/department/stores";
import RoleStore from "@lp/features/roles/stores";

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false;
  @observable isLogin = Clients.storageClient.getItem("isLogin");

  @observable userStore = new UsersStore();
  @observable labStore = new LabStore();
  @observable deginisationStore = new DeginisationStore();
  @observable departmentStore = new DepartmentStore();
  @observable roleStore = new RoleStore();

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading;
  }
}
const store = new RootStore();
export default store;
