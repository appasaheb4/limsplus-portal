import { action, observable } from "mobx"
import { version, ignore } from "mobx-sync"

import UsersStore from "@lp/features/users/stores"
import LabStore from "@lp/features/collection/labs/stores"
import DeginisationStore from "@lp/features/collection/deginisation/stores"
import DepartmentStore from "@lp/features/collection/department/stores"
import RoleStore from "@lp/features/collection/roles/stores"
import BannerStore from "@lp/features/banner/stores"

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false
  //@observable isLogin = Clients.storageClient.getItem("isLogin")

  @observable userStore = new UsersStore()
  @observable labStore = new LabStore()
  @observable deginisationStore = new DeginisationStore()
  @observable departmentStore = new DepartmentStore()
  @observable roleStore = new RoleStore()
  @observable bannerStore = new BannerStore()

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading
  }

  @action isLogin(): boolean {
    if (
      this.userStore.login?.fullName != "" &&
      this.userStore.login?.fullName !== undefined
    ) {
      return true
    }
    return false
  }
}
const store = new RootStore()
export default store
