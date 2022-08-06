import {TemplateSettings} from './template-setting.model';
export class PageBranding {
  _id: string;
  tempCode: string;
  templateSettings: TemplateSettings;
  header: {
    title: string;
    titleCSS: any;
    logo: any;
    logoUrl: any;
    logoCSS: number;
    mainBoxCSS: string;
  };
  subHeader: {
    title: string;
    titleCSS: string;
    subTitle: string;
    subTitleCSS: string;
    mainBoxCSS: string;
  };
  footer: {
    title: string;
    titleCSS: string;
    subTitle: string;
    subTitleCSS: string;
    mainBoxCSS: string;
  };
  pageNumber: {
    pageNumberCSS: string;
  };
  isHeader: boolean;
  isSubHeader: boolean;
  isFooter: boolean;
  isPdfPageNumber: boolean;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.tempCode = rawData.tempCode;
    this.templateSettings = rawData.templateSettings;
    this.header = rawData.header;
    this.subHeader = rawData.subHeader;
    this.footer = rawData.footer;
    this.pageNumber = rawData.pageNumber;
    this.isHeader = rawData.isHeader;
    this.isSubHeader = rawData.isSubHeader;
    this.isFooter = rawData.isFooter;
    this.isPdfPageNumber = rawData.isPdfPageNumber;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
