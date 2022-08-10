import {stores} from '@/stores';
export const startup = async () => {
  stores.reportSettingStore.templateSettingsService.listTemplateSetting();
  stores.reportSettingStore.pageBrandingService.listPageBranding();
  stores.reportSettingStore.reportSectionService.listReportSection();
  stores.reportSettingStore.sectionSettingService.listSectionSetting();
  stores.reportSettingStore.pageSettingService.listPageSetting();
  stores.reportSettingStore.generalSettingService.listGeneralSetting();
  stores.reportSettingStore.fontSettingService.listFontSetting();
  stores.reportSettingStore.reportFieldMappingService.listReportFieldMapping();
};

export const startUpPageBranding = async () => {
  stores.reportSettingStore.pageBrandingService.listPageBranding();
};
