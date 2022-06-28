import {makeObservable, action, observable, computed} from 'mobx';
import {
  ReportSectionService,
  SectionSettingService,
  PageSettingService,
  GeneralSettingService,
} from '../services';
import {
  ReportSection,
  SectionSettings,
  PageSetting,
  GeneralSettings,
} from '../models';

export class ReportSettingStore {
  reportSectionList: ReportSection[] = [];
  reportSectionListCount: number = 0;
  sectionSetting!: SectionSettings;
  sectionSettingList!: Array<SectionSettings>;
  sectionSettingListCount!: number;
  pageSetting!: PageSetting;
  pageSettingList!: Array<PageSetting>;
  pageSettingListCount: number = 0;
  generalSetting!: GeneralSettings;
  generalSettingList!: Array<GeneralSettings>;
  generalSettingListCount: number = 0;

  constructor() {
    this.sectionSetting = new SectionSettings({
      sectionRequired: false,
      sectionGrid: false,
      lineGrid: false,
      columnGrid: false,
      version: 1,
    });
    this.sectionSettingList = [];
    this.sectionSettingListCount = 0;
    this.pageSetting = new PageSetting({
      version: 1,
    });
    this.pageSettingList = [];
    this.generalSetting = new GeneralSettings({
      version: 1,
    });

    makeObservable<ReportSettingStore, any>(this, {
      reportSectionList: observable,
      reportSectionListCount: observable,
      sectionSetting: observable,
      sectionSettingList: observable,
      sectionSettingListCount: observable,
      pageSetting: observable,
      pageSettingList: observable,
      pageSettingListCount: observable,
      generalSetting: observable,
      generalSettingList: observable,
      generalSettingListCount: observable,

      reportSectionService: computed,
      sectionSettingService: computed,
      pageSettingService: computed,
      generalSettingService: computed,

      updateReportSectionList: action,
      updateSectionSetting: action,
      updateSectionSettingList: action,
      updateGeneralSetting: action,
      updateGeneralSettingList: action,
    });
  }

  get reportSectionService() {
    return new ReportSectionService();
  }

  get sectionSettingService() {
    return new SectionSettingService();
  }

  get pageSettingService() {
    return new PageSettingService();
  }

  get generalSettingService() {
    return new GeneralSettingService();
  }

  updateReportSectionList(res: any) {
    this.reportSectionList = res.reportSections.data;
    this.reportSectionListCount = res.reportSections.paginatorInfo.count;
  }

  updateSectionSetting(res: SectionSettings) {
    this.sectionSetting = res;
  }

  updateSectionSettingList(res: any) {
    this.sectionSettingList = res.sectionSettings.data;
    this.sectionSettingListCount = res.sectionSettings.paginatorInfo.count;
  }

  updatePageSetting(res: PageSetting) {
    this.pageSetting = res;
  }

  updatePageSettingList(res: any) {
    this.pageSettingList = res.pageSettings.data;
    this.pageSettingListCount = res.pageSettings.paginatorInfo.count;
  }

  updateGeneralSetting(res: any) {
    this.generalSetting = res;
  }

  updateGeneralSettingList(res: any) {
    this.generalSettingList = res;
    this.generalSettingListCount = res;
  }
}
