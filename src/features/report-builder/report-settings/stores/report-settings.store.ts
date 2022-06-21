import {makeObservable, action, observable, computed} from 'mobx';
import {ReportSettingService} from '../services';
import {ReportSection} from '../models';

export class ReportSettingStore {
  reportSectionList: ReportSection[] = [];

  constructor() {
    makeObservable<ReportSettingStore, any>(this, {
      reportSectionList: observable,
      reportSettingService: computed,
      updateReportSectionList: action,
    });
  }

  get reportSettingService() {
    return new ReportSettingService();
  }

  updateReportSectionList(res: any) {
    this.reportSectionList = res;
  }
}
