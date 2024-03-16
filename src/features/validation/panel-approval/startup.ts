import { stores } from '@/stores';
export const startup = async () => {
  stores.panelApprovalStore.panelApprovalService.listPanelApproval({
    validationLevel: stores.loginStore.login?.validationLevel,
  });
};
