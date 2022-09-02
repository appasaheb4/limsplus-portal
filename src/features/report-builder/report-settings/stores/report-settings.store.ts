import {makeObservable, action, observable, computed} from 'mobx';

import {
  TemplateSettingService,
  PageBrandingService,
  ReportSectionService,
  SectionSettingService,
  PageSettingService,
  GeneralSettingService,
  FontSettingService,
  ReportFieldMappingService,
} from '../services';

import {
  TemplateSettings,
  ReportSection,
  SectionSettings,
  PageSetting,
  GeneralSettings,
  FontSetting,
  ReportFieldMapping,
  PageBranding,
  TemplatePatientResult,
  SelectedItemsTemplatePatientResult,
} from '../models';

export class ReportSettingStore {
  templateSettings!: TemplateSettings;
  templateSettingsList!: Array<TemplateSettings>;
  templateSettingsListCount: number = 0;
  pageBranding!: PageBranding;
  pageBrandingList!: Array<PageBranding>;
  pageBrandingListCopy!: Array<PageBranding>;
  pageBrandingListCount: number = 0;
  templatePatientResult!: TemplatePatientResult;
  templatePatientResultList!: Array<TemplatePatientResult>;
  templatePatientResultListCount: number = 0;
  selectedItemTemplatePatientResult!: SelectedItemsTemplatePatientResult;

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
  fontSetting!: FontSetting;
  fontSettingList!: Array<FontSetting>;
  fontSettingListCopy!: Array<FontSetting>;
  fontSettingListCount: number = 0;
  reportFieldMapping!: ReportFieldMapping;
  reportFieldMappingList!: Array<ReportFieldMapping>;
  reportFieldMappingListCount: number = 0;

  constructor() {
    this.templateSettings = new TemplateSettings({
      isToolbar: false,
      isBackgroundImage: false,
      pageSize: 'A4',
      mainBoxCSS: "backgroundColor: '#ffffff',paddingBottom: '80pt',",
    });
    this.templateSettingsList = [];
    this.pageBranding = new PageBranding({
      ...this.pageBranding,
      isHeader: true,
      isSubHeader: true,
      isFooter: true,
      isPdfPageNumber: true,
    });
    this.pageBrandingList = [];
    this.pageBrandingListCopy = [];
    this.templatePatientResult = new TemplatePatientResult({});
    this.templatePatientResultList = [];
    this.selectedItemTemplatePatientResult =
      new SelectedItemsTemplatePatientResult({});

    this.generalSetting = new GeneralSettings({});
    this.generalSettingList = [];
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
    this.fontSetting = new FontSetting({
      version: 1,
    });
    this.fontSettingList = [];
    this.fontSettingListCopy = [];
    this.reportFieldMapping = new ReportFieldMapping({});
    this.reportFieldMappingList = [];

    makeObservable<ReportSettingStore, any>(this, {
      templateSettings: observable,
      templateSettingsList: observable,
      templateSettingsListCount: observable,
      pageBranding: observable,
      pageBrandingList: observable,
      pageBrandingListCopy: observable,
      pageBrandingListCount: observable,
      templatePatientResult: observable,
      templatePatientResultList: observable,
      templatePatientResultListCount: observable,
      selectedItemTemplatePatientResult: observable,

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
      fontSetting: observable,
      fontSettingList: observable,
      fontSettingListCopy: observable,
      fontSettingListCount: observable,
      reportFieldMapping: observable,
      reportFieldMappingList: observable,
      reportFieldMappingListCount: observable,

      templateSettingsService: computed,
      pageBrandingService: computed,
      reportSectionService: computed,
      sectionSettingService: computed,
      pageSettingService: computed,
      generalSettingService: computed,
      fontSettingService: computed,
      reportFieldMappingService: computed,

      updateTemplateSettings: action,
      updateTemplateSettingsList: action,
      updatePageBranding: action,
      updatePageBrandingList: action,
      updateTemplatePatientResult: action,
      updateTemplatePatientResultList: action,
      updateSelectedItemTemplatePatientResult: action,

      updateReportSectionList: action,
      updateSectionSetting: action,
      updateSectionSettingList: action,
      filterSectionSettingList: action,
      updateGeneralSetting: action,
      updateGeneralSettingList: action,
      updateFontSetting: action,
      updateFontSettingList: action,
      updateReportFieldMapping: action,
      updateReportFieldMappingList: action,
    });
  }

  get templateSettingsService() {
    return new TemplateSettingService();
  }

  get pageBrandingService() {
    return new PageBrandingService();
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

  get fontSettingService() {
    return new FontSettingService();
  }

  get reportFieldMappingService() {
    return new ReportFieldMappingService();
  }

  updateTemplateSettings(payload: TemplateSettings) {
    this.templateSettings = payload;
  }

  updateTemplateSettingsList(res: any) {
    this.templateSettingsList = res.templateSettings.data;
    this.templateSettingsListCount = res.templateSettings.paginatorInfo?.count;
  }

  updatePageBranding(payload: PageBranding) {
    this.pageBranding = payload;
  }

  updatePageBrandingList(res: any) {
    if (!Array.isArray(res)) {
      this.pageBrandingList = res.pageBrandings.data;
      this.pageBrandingListCopy = res.pageBrandings.data;
      this.pageBrandingListCount = res.pageBrandings.paginatorInfo.count;
    } else {
      this.pageBrandingList = res;
      this.pageBrandingListCount = res?.length;
    }
  }

  updateTemplatePatientResult(payload: TemplatePatientResult) {
    this.templatePatientResult = payload;
  }

  updateTemplatePatientResultList(res: any) {
    this.templatePatientResultList = res;
    this.templatePatientResultListCount = res;
  }

  updateSelectedItemTemplatePatientResult(res: any) {
    this.selectedItemTemplatePatientResult = res;
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

  updateFontSetting(res: any) {
    this.fontSetting = res;
  }

  updateFontSettingList(res: any) {
    if (!Array.isArray(res)) {
      this.fontSettingList = res.fontSettings.data;
      this.fontSettingListCount = res.fontSettings.paginatorInfo.count;
    } else {
      this.fontSettingList = res;
    }
  }

  filterFontSettingList(res: any) {
    this.fontSettingList = res.filterByFieldsFontSetting.data;
    this.fontSettingListCount =
      res.filterByFieldsFontSetting.paginatorInfo.count;
  }

  updateReportFieldMapping(res: ReportFieldMapping) {
    this.reportFieldMapping = res;
  }

  updateReportFieldMappingList(res) {
    this.reportFieldMappingList = res.reportFieldMappings.data;
    this.reportFieldMappingListCount =
      res.reportFieldMappings.paginatorInfo.count;
  }
}
