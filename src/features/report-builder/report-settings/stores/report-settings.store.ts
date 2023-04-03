import {makeObservable, action, observable, computed} from 'mobx';

import {
  PageLayoutService,
  PageBrandingService,
  TemplatePatientResultService,
  ReportBodyService,
} from '../services';

import {
  PageLayout,
  PageBranding,
  TemplatePatientResult,
  SelectedItemsTemplatePatientResult,
  ReportBody,
} from '../models';

export class ReportSettingStore {
  pageLayout: PageLayout;
  pageLayoutList!: Array<PageLayout>;
  pageLayoutListCount: number = 0;

  pageBranding!: PageBranding;
  pageBrandingList!: Array<PageBranding>;
  pageBrandingListCopy!: Array<PageBranding>;
  pageBrandingListCount: number = 0;

  reportBody: ReportBody;
  reportBodyList!: Array<ReportBody>;
  reportBodyListCopy!: Array<ReportBody>;
  reportBodyListCount: number = 0;

  templatePatientResult!: TemplatePatientResult;
  templatePatientResultList!: Array<TemplatePatientResult>;
  templatePatientResultListCount: number = 0;
  selectedItemTemplatePatientResult!: SelectedItemsTemplatePatientResult;

  constructor() {
    this.pageLayoutList = [];

    this.pageBrandingList = [];
    this.pageBrandingListCopy = [];
    this.pageLayout = new PageLayout({});
    this.reportBody = new ReportBody({});
    this.reportBodyList = [];
    this.reportBodyListCopy = [];

    this.templatePatientResult = new TemplatePatientResult({});
    this.templatePatientResultList = [];
    this.selectedItemTemplatePatientResult =
      new SelectedItemsTemplatePatientResult({});

    this.reset();

    makeObservable<ReportSettingStore, any>(this, {
      pageLayout: observable,
      pageLayoutList: observable,
      pageLayoutListCount: observable,

      pageBranding: observable,
      pageBrandingList: observable,
      pageBrandingListCopy: observable,
      pageBrandingListCount: observable,

      reportBody: observable,
      reportBodyList: observable,
      reportBodyListCopy: observable,
      reportBodyListCount: observable,

      templatePatientResult: observable,
      templatePatientResultList: observable,
      templatePatientResultListCount: observable,
      selectedItemTemplatePatientResult: observable,

      pageLayoutService: computed,
      pageBrandingService: computed,
      templatePatientResultService: computed,
      reportBodyService: computed,

      updatePageLayout: action,
      updatePageLayoutList: action,

      updatePageBranding: action,
      updatePageBrandingList: action,

      updateReportBody: action,
      updateReportBodyList: action,

      updateTemplatePatientResult: action,
      updateTemplatePatientResultList: action,
      updateSelectedItemTemplatePatientResult: action,
      reset: action,
    });
  }

  reset() {
    this.pageBranding = new PageBranding({});
    this.pageLayout = new PageLayout({
      isToolbar: false,
      isBackgroundImage: false,
      pageSize: 'A4',
      mainBoxCSS: "backgroundColor: '#ffffff',paddingBottom: '120pt',",
    });
    this.pageBranding = new PageBranding({
      ...this.pageBranding,
      isHeader: true,
      isSubHeader: true,
      isFooter: true,
      isPdfPageNumber: true,
      header: {},
    });
    this.pageBrandingList = [];
    // this.pageLayout = new PageLayout({});
    this.pageLayoutList = [];
  }

  get pageLayoutService() {
    return new PageLayoutService();
  }

  get pageBrandingService() {
    return new PageBrandingService();
  }

  get templatePatientResultService() {
    return new TemplatePatientResultService();
  }

  get reportBodyService() {
    return new ReportBodyService();
  }

  updatePageLayout(payload: PageLayout) {
    this.pageLayout = payload;
  }

  updatePageLayoutList(res: any) {
    this.pageLayoutList = res.templateSettings.data;
    this.pageLayoutListCount = res.templateSettings.paginatorInfo?.count;
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

  updateReportBody(payload: ReportBody) {
    this.reportBody = payload;
  }

  updateReportBodyList(res: any) {
    if (!Array.isArray(res)) {
      this.reportBodyList = res.reportBodys.data;
      this.reportBodyListCopy = res.reportBodys.data;
      this.reportBodyListCount = res.reportBodys.paginatorInfo.count;
    } else {
      this.reportBodyList = res;
      this.reportBodyListCount = res?.length;
    }
  }

  filterPageBrandingList(res: any) {
    this.pageBrandingList = res.filterPageBranding.data;
    this.pageBrandingListCount = res.filterPageBranding.paginatorInfo.count;
  }

  updateTemplatePatientResult(payload: TemplatePatientResult) {
    this.templatePatientResult = payload;
  }

  updateTemplatePatientResultList(res: any) {
    if (!Array.isArray(res)) {
      this.templatePatientResultList = res.templatePatientResults.data;
      this.templatePatientResultListCount =
        res.templatePatientResults.paginatorInfo.count;
    } else {
      this.templatePatientResultList = res;
      this.templatePatientResultListCount = res?.length;
    }
  }

  updateSelectedItemTemplatePatientResult(res: any) {
    this.selectedItemTemplatePatientResult = res;
  }

  resetReportBody() {
    this.reportBody = new ReportBody({});
    this.reportBodyService.listReportBody();
  }
}
