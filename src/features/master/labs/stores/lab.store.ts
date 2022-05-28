import {version} from 'mobx-sync';
import dayjs from 'dayjs';
import {makeObservable, action, observable, computed} from 'mobx';
import {Labs, SelectedItems} from '../models';
import {LabService} from '../services';

@version(0.1)
export class LabStore {
  listLabs!: Labs[];
  listLabsCopy!: Labs[];
  listLabsCount = 0;
  labs!: Labs;
  checkExitsEnvCode = false;
  selectedItems!: SelectedItems;

  constructor() {
    this.listLabs = [];
    this.labs = {
      ...this.labs,
      openingTime: dayjs().format('hh:mm a'),
      closingTime: dayjs().format('hh:mm a'),
      reportFormat: true,
      printLable: false,
      abnFlag: false,
      critical: false,
      priceList: [{id: 0, maxDis: 0}],
    };

    makeObservable<LabStore, any>(this, {
      listLabs: observable,
      listLabsCount: observable,
      labs: observable,
      checkExitsEnvCode: observable,
      selectedItems: observable,

      LabService: computed,
      fetchListLab: action,
      updateLabList: action,
      filterLabList: action,
      setExitsEnvCode: action,
      updateLabs: action,
    });
  }

  get LabService() {
    return new LabService();
  }

  fetchListLab(page?, limit?) {
    this.LabService.listLabs(page, limit);
  }

  updateLabList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.labs.success) return alert(res.labs.message);
      this.listLabs = res.labs.data;
      this.listLabsCopy = res.labs.data;
      this.listLabsCount = res.labs.paginatorInfo.count;
    } else {
      this.listLabs = res;
    }
  }

  filterLabList(res: any) {
    this.listLabs = res.filterLabs.data;
    this.listLabsCount = res.filterLabs.paginatorInfo.count;
  }

  setExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status;
  }

  updateLabs = (labs: Labs) => {
    this.labs = labs;
  };
  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items;
    else this.selectedItems = new SelectedItems({});
  }
}
