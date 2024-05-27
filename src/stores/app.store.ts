import { makeObservable, action, observable } from 'mobx';
import { EnvironmentValue } from '../models';

interface ApplicationSetting {
  sideBarColor?: string;
  navBarColor?: string;
  imageSideBarBgImage?: string;
  isSideBarBgImage?: boolean;
  isExpandScreen: boolean;
  theme?: 'dark' | 'light';
  sidebarImage?: string;
  navbarImage?: string;
  sidebarFontColor: string;
  navbarIconColor: string;
  logoSwap: boolean;
}

interface FooterViewProps {
  visible: boolean;
}

export class AppStore {
  applicationSetting!: ApplicationSetting;
  loadApi: { count: number; path?: string };
  environmentValues!: EnvironmentValue;
  footerView!: FooterViewProps;

  constructor() {
    this.loadApi = { count: 0 };
    this.applicationSetting = {
      ...this.applicationSetting,
      isExpandScreen: false,
      theme: 'light',
      navbarIconColor: '#000',
    };
    this.footerView = {
      visible: true,
    };
    makeObservable<AppStore, any>(this, {
      applicationSetting: observable,
      loadApi: observable,
      environmentValues: observable,
      footerView: observable,

      updateApplicationSetting: action,
      updateLoadApi: action,
      updateEnvironmentValue: action,
      updateFooterView: action,
    });
  }

  updateApplicationSetting(setting: ApplicationSetting) {
    this.applicationSetting = setting;
  }

  updateLoadApi = (value: { count; path? }) => {
    this.loadApi = value;
  };

  updateEnvironmentValue(value: EnvironmentValue) {
    this.environmentValues = value;
  }
  updateFooterView(footer: FooterViewProps) {
    this.footerView = footer;
  }
}
