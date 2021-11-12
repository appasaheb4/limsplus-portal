import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import { EnvironmentService } from "../services"
import * as Models from "../models"

@version(0.1)
export class EnvironmentStore {
  @ignore @observable environmentSettings!: Models.EnvironmentSettings
  @ignore @observable environmentVariable!: Models.EnvironmentVariable

  @observable environmentSettingsList: Models.EnvironmentSettings[]
  @observable environmentSettingsListCount: number

  @observable environmentVariableList: Models.EnvironmentVariable[]
  @observable environmentVariableListCount: number

  constructor() {
    this.environmentSettingsList = []
    this.environmentSettingsListCount = 0
    this.environmentVariableList = []
    this.environmentVariableListCount = 0
    makeObservable<EnvironmentStore, any>(this, {
      environmentSettings: observable,
      environmentVariable: observable,
      environmentSettingsList: observable,
      environmentSettingsListCount: observable,
      environmentVariableList: observable,
      environmentVariableListCount: observable,
    })
  }
  @computed get EnvironmentService() {
    return new EnvironmentService()
  }

  @action fetchEnvironment(filter, page?, limit?) {
    this.EnvironmentService.listEnvironment(filter, page, limit)
  }

  @action updateEnvVariableList(res: any) {
    if (!res.success) return alert(res.message)
    this.environmentVariableList = res.getAllEnvironment.data
    this.environmentVariableListCount = res.getAllEnvironment.count
  }

  @action updateEnvironmentSettings(env: Models.EnvironmentSettings) {
    this.environmentSettings = env
  }

  @action updateEnvironmentSettingsList(list: Models.EnvironmentSettings[]) {
    this.environmentSettingsList = list
  }

  @action updateEnvironmentSettingsCount(count: number) {
    this.environmentSettingsListCount = count
  }

  @action updatEnvironmentVariable(environment: Models.EnvironmentVariable) {
    this.environmentVariable = environment
  }

  @action updatEnvironmentVariableList(list: Models.EnvironmentVariable[]) {
    this.environmentVariableList = list
  }

  @action updateEnvironmentVariableCount(count: number) {
    this.environmentVariableListCount = count
  }
}
