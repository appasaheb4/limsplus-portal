import {makeObservable, action, observable, computed} from 'mobx';

import {
  PageLayoutService,
  PageBrandingService,
  TemplatePatientResultService,
} from '../services';

import {
  PageLayout,
  PageBranding,
  TemplatePatientResult,
  SelectedItemsTemplatePatientResult,
} from '../models';

export class ReportSettingStore {
  pageLayout: PageLayout;
  pageLayoutList!: Array<PageLayout>;
  pageLayoutListCount: number = 0;
  pageBranding!: PageBranding;
  pageBrandingList!: Array<PageBranding>;
  pageBrandingListCopy!: Array<PageBranding>;
  pageBrandingListCount: number = 0;
  templatePatientResult!: TemplatePatientResult;
  templatePatientResultList!: Array<TemplatePatientResult>;
  templatePatientResultListCount: number = 0;
  selectedItemTemplatePatientResult!: SelectedItemsTemplatePatientResult;

  constructor() {
    this.pageLayout = new PageLayout({
      isToolbar: false,
      isBackgroundImage: false,
      pageSize: 'A4',
      mainBoxCSS: "backgroundColor: '#ffffff',paddingBottom: '120pt',",
    });
    this.pageLayoutList = [];
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

    makeObservable<ReportSettingStore, any>(this, {
      pageLayout: observable,
      pageLayoutList: observable,
      pageLayoutListCount: observable,
      pageBranding: observable,
      pageBrandingList: observable,
      pageBrandingListCopy: observable,
      pageBrandingListCount: observable,
      templatePatientResult: observable,
      templatePatientResultList: observable,
      templatePatientResultListCount: observable,
      selectedItemTemplatePatientResult: observable,

      pageLayoutService: computed,
      pageBrandingService: computed,
      templatePatientResultService: computed,

      updatePageLayout: action,
      updatePageLayoutList: action,
      updatePageBranding: action,
      updatePageBrandingList: action,
      updateTemplatePatientResult: action,
      updateTemplatePatientResultList: action,
      updateSelectedItemTemplatePatientResult: action,
    });
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
}
