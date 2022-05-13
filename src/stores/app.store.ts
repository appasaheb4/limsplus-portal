/* eslint-disable */
import {makeObservable, action, observable} from 'mobx';
import {EnvironmentValue} from '../models';

interface ApplicationSetting {
  sideBarColor?: string;
  shortCutBarColor?: string;
  imageSideBarBgImage?: string;
  isSideBarBgImage?: boolean;
  isExpandScreen?: boolean;
}

export class AppStore {
  applicationSetting!: ApplicationSetting;
  loadApi: {count: number; path?: string};
  environmentValues!: EnvironmentValue;

  constructor() {
    this.loadApi = {count: 0};
    this.applicationSetting = {
      ...this.applicationSetting,
      isExpandScreen: false,
    };
    makeObservable<AppStore, any>(this, {
      applicationSetting: observable,
      loadApi: observable,
      environmentValues: observable,

      updateApplicationSetting: action,
      updateLoadApi: action,
      updateEnvironmentValue: action,
    });
  }

  updateApplicationSetting(setting: ApplicationSetting) {
    this.applicationSetting = setting;
  }

  updateLoadApi = (value: {count; path?}) => {
    this.loadApi = value;
  };

  updateEnvironmentValue(value: EnvironmentValue) {
    this.environmentValues = value;
  }
}
