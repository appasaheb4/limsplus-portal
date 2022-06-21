import {stores} from '@/stores';
export const startup = async () => {
  stores.reportSettingStore.reportSettingService.listReportSection();
};
