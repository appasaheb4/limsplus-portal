import {makeObservable, action, observable, computed} from 'mobx';
import {PendingPanelApproval} from '../models';
import {PanelApprovalService} from '../services';
import _ from 'lodash';

export class PanelApprovalStore {
  panelApprovalList!: Array<PendingPanelApproval>;
  panelApprovalListCount: number = 0;

  constructor() {
    this.panelApprovalList = [];
    makeObservable<PanelApprovalStore, any>(this, {
      panelApprovalList: observable,
      panelApprovalListCount: observable,

      panelApprovalService: computed,

      updatePanelApproval: action,
    });
  }

  get panelApprovalService() {
    return new PanelApprovalService();
  }

  updatePanelApproval(res) {
    if (!Array.isArray(res)) {
      this.panelApprovalList = res.panelApprovals.data;
      this.panelApprovalListCount = res.panelApprovals.paginatorInfo.count;
    } else {
      this.panelApprovalList = res;
      this.panelApprovalListCount = res?.length || 0;
    }
  }

  filterPanelApproval(res: any) {
    this.panelApprovalList = res.filterPanelApproval.data;
    this.panelApprovalListCount = res.filterPanelApproval.paginatorInfo.count;
  }
}
