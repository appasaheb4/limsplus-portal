import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import {EnvironmentService} from "../services"
import * as Models from "../models"

@version(0.1)
export class EnvironmentStore {
  @ignore @observable environmentSettings!: Models.EnvironmentSettings
  @ignore @observable environmentVariable!: Models.EnvironmentVariable

  @observable environmentSettingsList?: Models.EnvironmentSettings[] = []
  @observable environmentSettingsListCount: number = 0

  @observable environmentVariableList?: Models.EnvironmentVariable[] = []
  @observable environmentVariableListCount: number = 0
  

  constructor() {
    makeAutoObservable(this)
  }
  @computed get EnvironmentService() {
    return new EnvironmentService()
  }
  @action fetchEnvironment(filter?,page?, limit?) {
    this.EnvironmentService.listEnvironment(filter,page, limit).then(
      (res) => {
        console.log({res});
        if (!res.getAllEnvironment.success) return alert(res.getAllEnvironment.message)
        this.environmentVariableList = res.getAllEnvironment.data
        this.environmentVariableListCount = res.getAllEnvironment.count
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
