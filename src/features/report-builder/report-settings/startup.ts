import {stores} from '@/stores';
export const startup = async () => {
  stores.reportSettingStore.reportSectionService.listReportSection();
  stores.reportSettingStore.sectionSettingService.listSectionSetting();
};
