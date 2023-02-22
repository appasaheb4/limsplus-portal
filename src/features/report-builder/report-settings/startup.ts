import {stores} from '@/stores';
import {eventEmitter} from '@/core-utils';
export const startup = async () => {
  stores.reportSettingStore.pageLayoutService.listTemplateSetting();
  stores.reportSettingStore.pageBrandingService.listPageBranding();
  stores.reportSettingStore.templatePatientResultService.listTemplatePatientResult();
  stores.reportSettingStore.reportBodyService.listReportBody();
};

export const startUpPageBranding = async () => {
  stores.reportSettingStore.pageBrandingService.listPageBranding();
};

export const loadTemplatePatientResultList = () => {
  stores.reportSettingStore.templatePatientResultService.listTemplatePatientResult();
};

export const resetReportBody = () => {
  eventEmitter.emit('reload', {});
};
