export class PageBranding {
  _id: string;
  pageId: string;
  header: {
    title: string;
    titleCSS: string;
    logo: any;
    logoCSS: number;
    mainBoxCSS: string;
  };
  subHeader: {
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
    title: string;
    titleCSS: string;
    subTitle: string;
    tel: string;
    telCSS: string;
    mail: string;
    mailCSS: string;
    mainBoxCss: string;
  };

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.pageId = rawData.pageId;
    this.header = rawData.header;
    this.subHeader = rawData.subHeader;
    this.footer = rawData.footer;
  }
}
