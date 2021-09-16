import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

@version(0.1)
class EnvironmentSettingsStore {
  @ignore @observable sessionManagement!: Models.SessionManagement
  @ignore @observable environmentVariable!: Models.EnvironmentVariable
  @observable sessionManagementList?: Models.SessionManagement[] = []
  @observable environmentVariableList?: Models.EnvironmentVariable[] = []
  @observable environmentVariableListCount: number = 0
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
      this.sessionManagementList = res.data.envSessionList
      this.sessionManagementListCount = res.data.count
    })
  }
  @action updateSessionManagement(session: Models.SessionManagement) {
    this.sessionManagement = session
  }
  @action updatEnvironmentVariable(environment: Models.EnvironmentVariable){
    this.environmentVariable = environment
  }
}
export default EnvironmentSettingsStore
