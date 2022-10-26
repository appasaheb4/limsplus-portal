import {makeObservable, action, observable, computed} from 'mobx';
import {PendingPanelApproval} from '../models';
import {PanelApprovalService} from '../services';
import _ from 'lodash';

export class PanelApprovalStore {
  pendingPanelApprovalList!: Array<PendingPanelApproval>;
  pendingPanelApprovalListCount: number = 0;

  constructor() {
    this.pendingPanelApprovalList = [];
    makeObservable<PanelApprovalStore, any>(this, {
      pendingPanelApprovalList: observable,
      pendingPanelApprovalListCount: observable,

      panelApprovalService: computed,

      updatePendingPanelApproval: action,
    });
  }

  get panelApprovalService() {
    return new PanelApprovalService();
  }

  updatePendingPanelApproval(res) {
    if (!Array.isArray(res)) {
      this.pendingPanelApprovalList = res.transactionHeaders.data;
      this.pendingPanelApprovalListCount =
        res.transactionHeaders.paginatorInfo.count;
    } else {
      this.pendingPanelApprovalList = res;
      this.pendingPanelApprovalListCount = res?.length || 0;
    }
  }
}
