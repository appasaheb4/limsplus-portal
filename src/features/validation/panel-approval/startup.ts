import {stores} from '@/stores';
export const startup = async () => {
  stores.panelApprovalStore.panelApprovalService.listPanelApproval();
};
