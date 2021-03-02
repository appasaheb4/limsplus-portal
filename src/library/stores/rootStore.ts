import { action, observable } from "mobx"
import { version, ignore } from "mobx-sync"
import SessionStore from "mobx-session"

// import LoginStore from "@lp/features/login/stores"
// import UsersStore from "@lp/features/users/stores"
// import LabStore from "@lp/features/collection/labs/stores"
// import DeginisationStore from "@lp/features/collection/deginisation/stores"
// import DepartmentStore from "@lp/features/collection/department/stores"
// import RoleStore from "@lp/features/collection/roles/stores"
// import BannerStore from "@lp/features/banner/stores"
import RoleMappingStore from "@lp/features/settings/mapping/role/stores"
// import LabMappingStore from "@lp/features/settings/mapping/lab/stores"
// import RoleRightsMappingStore from "@lp/features/settings/mapping/rolerights/stores"
import LoginActivityStore from "@lp/features/settings/loginActivity/stores"
import CommunicationStore from "@lp/features/communication/stores"

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false
  //@observable isLogin = Clients.storageClient.getItem("isLogin")

  // @observable loginStore = new LoginStore()
  // @observable userStore = new UsersStore()
  // @observable labStore = new LabStore()
  // @observable deginisationStore = new DeginisationStore()
  // @observable departmentStore = new DepartmentStore()
  // @observable roleStore = new RoleStore()
  // @observable bannerStore = new BannerStore()
  @observable roleMappingStore = new RoleMappingStore()
  // @observable labMappingStore = new LabMappingStore()
  // @observable roleRightsMappingStore = new RoleRightsMappingStore()
  @observable loginActivityStore = new LoginActivityStore()
  @observable communicationStore = new CommunicationStore();

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading
  }

  @action isLogin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        if (SessionStore.initialized) {
          if (SessionStore.hasSession) {
            resolve(true)
          }
          resolve(false)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
const store = new RootStore()
export default store
