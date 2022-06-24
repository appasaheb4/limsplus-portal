import {makeObservable, action, observable, computed} from 'mobx';
import {ReportSettingService} from '../services';
import {ReportSection, SectionSettings} from '../models';

export class ReportSettingStore {
  reportSectionList: ReportSection[] = [];
  reportSectionListCount: number = 0;
  sectionSetting!: SectionSettings;
  sectionSettingList!: Array<SectionSettings>;
  sectionSettingListCount!: number;
  constructor() {
    this.sectionSetting = new SectionSettings({
      version: 1,
    });
    this.sectionSettingList = [];
    this.sectionSettingListCount = 0;

    makeObservable<ReportSettingStore, any>(this, {
      reportSectionList: observable,
      reportSectionListCount: observable,
      sectionSetting: observable,
      sectionSettingList: observable,
      sectionSettingListCount: observable,

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

  updateSectionSetting(res: SectionSettings) {
    this.sectionSetting = res;
  }

  updateSectionSettingList(res: any) {
    this.sectionSettingList = res;
    this.sectionSettingListCount = res.count;
  }
}
