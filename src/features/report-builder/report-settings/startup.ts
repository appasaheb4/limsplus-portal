import {stores} from '@/stores';
export const startup = async () => {
  stores.reportSettingStore.pageLayoutService.listTemplateSetting();
  stores.reportSettingStore.pageBrandingService.listPageBranding();
  stores.reportSettingStore.templatePatientResultService.listTemplatePatientResult();
};

export const startUpPageBranding = async () => {
  stores.reportSettingStore.pageBrandingService.listPageBranding();
};

export const loadTemplatePatientResultList = () => {
  stores.reportSettingStore.templatePatientResultService.listTemplatePatientResult();
};
