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
    this.EnvironmentSettingsService.sessionManagementList(page,limit).then((sessions) => {
      this.sessionManagementList = sessions
    })
  }
  @action updateSessionManagement(session: Models.SessionManagement) {
    this.sessionManagement = session
  }
}
export default EnvironmentSettingsStore
