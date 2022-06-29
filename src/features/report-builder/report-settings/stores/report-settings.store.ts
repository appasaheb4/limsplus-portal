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
  reportSectionListCopy: ReportSection[] = [];
  reportSectionListCount: number = 0;
  sectionSetting!: SectionSettings;
  sectionSettingList!: Array<SectionSettings>;
  sectionSettingListCopy!: Array<SectionSettings>;
  sectionSettingListCount!: number;
  pageSetting!: PageSetting;
  pageSettingList!: Array<PageSetting>;
  pageSettingListCopy!: Array<PageSetting>;
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
    this.sectionSettingListCopy = [];
    this.sectionSettingListCount = 0;
    this.pageSetting = new PageSetting({
      version: 1,
    });
    this.pageSettingList = [];
    this.pageSettingListCopy = [];
    this.generalSetting = new GeneralSettings({
      version: 1,
    });

    makeObservable<ReportSettingStore, any>(this, {
      reportSectionList: observable,
      reportSectionListCopy: observable,
      reportSectionListCount: observable,
      sectionSetting: observable,
      sectionSettingList: observable,
      sectionSettingListCopy: observable,
      sectionSettingListCount: observable,
      pageSetting: observable,
      pageSettingList: observable,
      pageSettingListCopy: observable,
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
      filterSectionSettingList: action,
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
    if (!Array.isArray(res)) {
      this.reportSectionList = res.reportSections.data;
      this.reportSectionListCopy = res.reportSections.data;
      this.reportSectionListCount = res.reportSections.paginatorInfo.count;
    } else {
      this.reportSectionList = res;
    }
  }

  updateSectionSetting(res: SectionSettings) {
    this.sectionSetting = res;
  }

  updateSectionSettingList(res: any) {
    if (!Array.isArray(res)) {
      this.sectionSettingList = res.sectionSettings.data;
      this.sectionSettingListCopy = res.sectionSettings.data;
      this.sectionSettingListCount = res.sectionSettings.paginatorInfo.count;
    } else {
      this.sectionSettingList = res;
    }
  }

  filterSectionSettingList(res: any) {
    this.sectionSettingList = res.filterSectionSettings.data;
    this.sectionSettingListCount =
      res.filterSectionSettings.paginatorInfo.count;
  }

  updatePageSetting(res: PageSetting) {
    this.pageSetting = res;
  }

  updatePageSettingList(res: any) {
    if (!Array.isArray(res)) {
      this.pageSettingList = res.pageSettings.data;
      this.pageSettingListCopy = res.pageSettings.data;
      this.pageSettingListCount = res.pageSettings.paginatorInfo.count;
    } else {
      this.pageSettingList = res;
    }
  }

  filterPageSettingList(res: any) {
    this.pageSettingList = res.filterPageSettings.data;
    this.pageSettingListCount = res.filterPageSettings.paginatorInfo.count;
  }

  updateGeneralSetting(res: any) {
    this.generalSetting = res;
  }

  updateGeneralSettingList(res: any) {
    this.generalSettingList = res.generalSettings.data;
    this.generalSettingListCount = res.generalSettings.paginatorInfo.count;
  }
}
