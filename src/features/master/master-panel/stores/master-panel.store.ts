import {makeObservable, action, observable, computed} from 'mobx';
import {Toast} from '@/library/components';
import {MasterPanel, MasterPanelActivity} from '../models';
import {MasterPanelService} from '../services';
import * as ModelsSection from '@/features/master/section/models';
import dayjs from 'dayjs';

export class MasterPanelStore {
  masterPanel!: MasterPanel;
  listMasterPanel: MasterPanel[];
  listMasterPanelCopy!: MasterPanel[];
  listMasterPanelCount!: number;
  checkExitsLabEnvCode!: boolean;
  sectionListByDeptCode!: ModelsSection.Section[];
  masterPanelActivity!: MasterPanelActivity;

  constructor() {
    this.listMasterPanel = [];
    this.listMasterPanelCount = 0;
    this.sectionListByDeptCode = [];
    this.checkExitsLabEnvCode = false;
    this.masterPanelActivity = new MasterPanelActivity({});
    this.masterPanel = {
      ...this.masterPanel,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
      bill: true,
      autoRelease: false,
      holdOOS: false,
      confidential: false,
      urgent: false,
      ageSexAction: false,
      repitation: false,
      printLabel: false,
      method: false,
      cumulative: false,
      pageBreak: false,
      validationLevel: 0,
    };
    makeObservable<MasterPanelStore, any>(this, {
      masterPanel: observable,
      listMasterPanel: observable,
      listMasterPanelCount: observable,
      checkExitsLabEnvCode: observable,
      sectionListByDeptCode: observable,
      masterPanelActivity: observable,

      masterPanelService: computed,
      fetchPanelMaster: action,
      updatePanelMasterList: action,
      findSectionListByDeptCode: action,
      updateSectionListByDeptCode: action,
      updateMasterPanel: action,
      updateExistsLabEnvCode: action,
      filterPanelMasterList: action,
      updateMasterPanelActivity: action,
    });
  }

  get masterPanelService() {
    return new MasterPanelService();
  }

  fetchPanelMaster(page?, limit?) {
    this.masterPanelService.listPanelMaster(page, limit);
  }

  updatePanelMasterList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.panelMasters.success) return alert(res.panelMasters.message);
      this.listMasterPanel = res.panelMasters.data;
      this.listMasterPanelCopy = res.panelMasters.data;
      this.listMasterPanelCount = res.panelMasters.paginatorInfo.count;
    } else {
      this.listMasterPanel = res;
    }
  }

  filterPanelMasterList(res: any) {
    this.listMasterPanel = res.filterPanelMaster.data;
    this.listMasterPanelCount = res.filterPanelMaster.paginatorInfo.count;
  }

  findSectionListByDeptCode = (code: string) => {
    this.masterPanelService.findSectionListByDeptCode(code);
  };

  updateSectionListByDeptCode(res: any) {
    if (!res.findSectionListByDeptCode.success) return;
    this.sectionListByDeptCode = res.findSectionListByDeptCode.data;
  }

  updateMasterPanel(analyte: MasterPanel) {
    this.masterPanel = analyte;
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status;
  };

  updateMasterPanelActivity = (items: MasterPanelActivity) => {
    this.masterPanelActivity = items;
  };
}
