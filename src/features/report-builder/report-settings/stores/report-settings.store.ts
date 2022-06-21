import {makeObservable, action, observable, computed} from 'mobx';
import {ReportSettingService} from '../services';
import {ReportSection} from '../models';

export class ReportSettingStore {
  reportSectionList: ReportSection[] = [];
  reportSectionListCount: number = 0;

  constructor() {
    makeObservable<ReportSettingStore, any>(this, {
      reportSectionList: observable,
      reportSectionListCount: observable,

      reportSettingService: computed,

      updateReportSectionList: action,
    });
  }

  get reportSettingService() {
    return new ReportSettingService();
  }

  updateReportSectionList(res: any) {
    this.reportSectionList = res.reportSections.data;
    this.reportSectionListCount = res.reportSections.paginatorInfo.count;
  }
}
