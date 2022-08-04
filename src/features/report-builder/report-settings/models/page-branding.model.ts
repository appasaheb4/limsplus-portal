import {TemplateSettings} from './template-setting.model';
export class PageBranding {
  _id: string;
  tempCode: string;
  templateSettings: TemplateSettings;
  header: {
    isVisible: boolean;
    title: string;
    titleCSS: any;
    logo: any;
    logoCSS: number;
    mainBoxCSS: string;
  };
  subHeader: {
    isVisible: boolean;
    title: string;
    titleCSS: string;
    subTitle: string;
    web: string;
    webCSS: string;
    cinNo: string;
    cinNoCSS: string;
    mainBoxCss: string;
  };
  footer: {
    isVisible: boolean;
    title: string;
    titleCSS: string;
    subTitle: string;
    tel: string;
    telCSS: string;
    mail: string;
    mailCSS: string;
    mainBoxCss: string;
  };
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
    this.isPdfPageNumber = rawData.isPdfPageNumber;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
