import {stores} from '@/stores';
export const startup = async () => {
  stores.reportSettingStore.reportSectionService.listReportSection();
  stores.reportSettingStore.sectionSettingService.listSectionSetting();
  stores.reportSettingStore.pageSettingService.listPageSetting();
  stores.reportSettingStore.generalSettingService.listGeneralSetting();
  stores.reportSettingStore.fontSettingService.listFontSetting();
};
