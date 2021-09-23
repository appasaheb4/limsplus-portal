import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

@version(0.1)
export class EnvironmentStore {
  @ignore @observable environmentSettings!: Models.EnvironmentSettings
  @ignore @observable environmentVariable!: Models.EnvironmentVariable

  @observable environmentSettingsList?: Models.EnvironmentSettings[] = []
  @observable environmentVariableList?: Models.EnvironmentVariable[] = []
  @observable environmentVariableListCount: number = 0
  @observable environmentSettingsListCount: number = 0

  constructor() {
    makeAutoObservable(this)
  }
  @computed get EnvironmentSettingsService() {
    return new Services.EnvironmentSettingsService()
  }
  @action fetchSessionManagementList(page?, limit?) {
    this.EnvironmentSettingsService.sessionManagementList(page, limit).then(
      (res) => {
        if (!res.success) return alert(res.message)
        this.environmentSettingsList = res.data.envSessionList
        this.environmentSettingsListCount = res.data.count
      }
    )
  }
  @action updateEnvironmentSettings(env: Models.EnvironmentSettings) {
    this.environmentSettings = env
  }
  @action updatEnvironmentVariable(environment: Models.EnvironmentVariable) {
    this.environmentVariable = environment
  }
}
