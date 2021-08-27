import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

@version(0.1)
class EnvironmentSettingsStore {
  @ignore @observable sessionManagement?: Models.SessionManagement
  @observable sessionManagementList?: Models.SessionManagement[] = []
  @observable sessionManagementListCount: number = 0
  constructor() {
    makeAutoObservable(this)
  }
  @computed get EnvironmentSettingsService() {
    return new Services.EnvironmentSettingsService(
    )
  }
  @action fetchSessionManagementList(page?,limit?) {
    this.EnvironmentSettingsService.sessionManagementList(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.sessionManagementList = res.data.sessionManagement
      this.sessionManagementListCount = res.data.count
    })
  }
  @action updateSessionManagement(session: Models.SessionManagement) {
    this.sessionManagement = session
  }
}
export default EnvironmentSettingsStore
