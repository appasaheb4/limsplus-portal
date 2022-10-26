import {makeObservable, action, observable, computed} from 'mobx';
import {EnvironmentService} from '../services';
import {
  EnvironmentSettings,
  EnvironmentVariable,
  SelectedItems,
  Permission,
} from '../models';

export class EnvironmentStore {
  environmentSettings!: EnvironmentSettings;
  environmentVariable!: EnvironmentVariable;

  environmentSettingsList: EnvironmentSettings[];
  environmentSettingsListCount: number;
  checkExistsEnvSettingsRecord!: boolean;

  environmentVariableList: EnvironmentVariable[];
  environmentVariableListCopy: EnvironmentVariable[];
  environmentVariableListCount: number;
  checkExistsEnvVariable: boolean;

  selectedItems!: SelectedItems;

  permission!: Permission;

  constructor() {
    this.environmentSettingsList = [];
    this.environmentSettingsListCount = 0;
    this.checkExistsEnvSettingsRecord = false;
    this.selectedItems = new SelectedItems({});
    this.permission = new Permission({});
    this.environmentVariableList = [];
    this.environmentVariableListCopy = [];
    this.environmentVariableListCount = 0;
    this.checkExistsEnvVariable = false;

    this.environmentSettings = {
      ...this.environmentSettings,
      allLabs: false,
      allDepartment: false,
      allUsers: false,
      lab: [],
      user: [],
      department: [],
    };

    this.environmentVariable = {
      ...this.environmentVariable,
      allLabs: false,
      allUsers: false,
      allDepartment: false,
      isModify: true,
    };

    makeObservable<EnvironmentStore, any>(this, {
      environmentSettings: observable,
      checkExistsEnvSettingsRecord: observable,
      environmentVariable: observable,
      environmentSettingsList: observable,
      environmentSettingsListCount: observable,
      environmentVariableList: observable,
      environmentVariableListCopy: observable,
      environmentVariableListCount: observable,
      selectedItems: observable,
      permission: observable,

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
    });
  }

  get EnvironmentService() {
    return new EnvironmentService();
  }

  fetchEnvironment(filter, page?, limit?) {
    this.EnvironmentService.listEnvironment(filter, page, limit);
  }

  updateEnvVariableList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.enviroments.success) return alert(res.enviroments.message);
      this.environmentVariableList = res.enviroments.data;
      this.environmentVariableListCopy = res.enviroments.data;
      this.environmentVariableListCount = res.enviroments.paginatorInfo.count;
    } else {
      this.environmentVariableList = res;
    }
  }

  filterEnvVariableList(res: any) {
    this.environmentVariableList = res.filterEnviroment.data;
    this.environmentVariableListCount =
      res.filterEnviroment.paginatorInfo.count;
  }

  updateEnvSettingsList(res: any) {
    if (!res.enviroments.success) return alert(res.enviroments.message);
    this.environmentSettingsList = res.enviroments.data;
    this.environmentSettingsListCount = res.enviroments.paginatorInfo.count;
  }

  filterEnvSettingsList(res: any) {
    this.environmentSettingsList = res.filterEnviroment.data;
    this.environmentSettingsListCount =
      res.filterEnviroment.paginatorInfo.count;
  }

  updateEnvironmentSettings(env: EnvironmentSettings) {
    this.environmentSettings = env;
  }

  updateEnvironmentSettingsList(list: EnvironmentSettings[]) {
    this.environmentSettingsList = list;
  }

  updateEnvironmentSettingsCount(count: number) {
    this.environmentSettingsListCount = count;
  }

  updatEnvironmentVariable(environment: EnvironmentVariable) {
    this.environmentVariable = environment;
  }

  updatEnvironmentVariableList(list: EnvironmentVariable[]) {
    this.environmentVariableList = list;
  }

  updateEnvironmentVariableCount(count: number) {
    this.environmentVariableListCount = count;
  }

  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items;
    else this.selectedItems = new SelectedItems({});
  }

  updateExistsEnvVariable(flag: boolean) {
    this.checkExistsEnvVariable = flag;
  }

  updateExistsEnvSettingRecord(flag: boolean) {
    this.checkExistsEnvSettingsRecord = flag;
  }

  updatePermision(permission: Permission) {
    this.permission = permission;
  }
}
