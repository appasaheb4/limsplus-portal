import { makeObservable, action, observable, computed } from "mobx"
import { EnvironmentService } from "../services"
import * as Models from "../models"

export class EnvironmentStore {
  environmentSettings!: Models.EnvironmentSettings
  environmentVariable!: Models.EnvironmentVariable

  environmentSettingsList: Models.EnvironmentSettings[]
  environmentSettingsListCount: number

  environmentVariableList: Models.EnvironmentVariable[]
  environmentVariableListCount: number

  selectedItems!: Models.SelectedItems

  constructor() {
    this.environmentSettingsList = []
    this.environmentSettingsListCount = 0
    this.environmentVariableList = []
    this.environmentVariableListCount = 0

    this.environmentSettings = {
      ...this.environmentSettings,
      allLabs: true,
      allDepartment: true,
      allUsers: true,
    }

    makeObservable<EnvironmentStore, any>(this, {
      environmentSettings: observable,
      environmentVariable: observable,
      environmentSettingsList: observable,
      environmentSettingsListCount: observable,
      environmentVariableList: observable,
      environmentVariableListCount: observable,
      selectedItems: observable,

      EnvironmentService: computed,
      fetchEnvironment: action,
      updateEnvVariableList: action,
      updateEnvSettingsList: action,
      updateEnvironmentSettings: action,
      updateEnvironmentSettingsList: action,
      updateEnvironmentSettingsCount: action,
      updatEnvironmentVariable: action,
      updatEnvironmentVariableList: action,
      updateEnvironmentVariableCount: action,
      updateSelectedItems: action,
      filterEnvVariableList: action,
      filterEnvSettingsList: action,
    })
  }

  get EnvironmentService() {
    return new EnvironmentService()
  }

  fetchEnvironment(filter, page?, limit?) {
    this.EnvironmentService.listEnvironment(filter, page, limit)
  }

  updateEnvVariableList(res: any) {
    if (!res.enviroments.success) return alert(res.enviroments.message)
    this.environmentVariableList = res.enviroments.data
    this.environmentVariableListCount = res.enviroments.paginatorInfo.count
  }

  filterEnvVariableList(res: any) {
    this.environmentVariableList = res.filterEnviroment.data
    this.environmentVariableListCount = res.filterEnviroment.paginatorInfo.count
  }

  updateEnvSettingsList(res: any) {
    if (!res.enviroments.success) return alert(res.enviroments.message)
    this.environmentSettingsList = res.enviroments.data
    this.environmentSettingsListCount = res.enviroments.paginatorInfo.count
  }

  filterEnvSettingsList(res: any) {
    this.environmentSettingsList = res.filterEnviroment.data
    this.environmentSettingsListCount = res.filterEnviroment.paginatorInfo.count
  }

  updateEnvironmentSettings(env: Models.EnvironmentSettings) {
    this.environmentSettings = env
  }

  updateEnvironmentSettingsList(list: Models.EnvironmentSettings[]) {
    this.environmentSettingsList = list
  }

  updateEnvironmentSettingsCount(count: number) {
    this.environmentSettingsListCount = count
  }

  updatEnvironmentVariable(environment: Models.EnvironmentVariable) {
    this.environmentVariable = environment
  }

  updatEnvironmentVariableList(list: Models.EnvironmentVariable[]) {
    this.environmentVariableList = list
  }

  updateEnvironmentVariableCount(count: number) {
    this.environmentVariableListCount = count
  }

  updateSelectedItems(items: Models.SelectedItems | undefined) {
    if (items) this.selectedItems = items
    else this.selectedItems = new Models.SelectedItems({})
  }
}
