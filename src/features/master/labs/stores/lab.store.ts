import {version} from 'mobx-sync';
import dayjs from 'dayjs';
import {makeObservable, action, observable, computed} from 'mobx';
import {Labs, SelectedItems} from '../models';
import {LabService} from '../services';

export class LabStore {
  listLabs!: Labs[];
  listLabsCopy!: Labs[];
  listLabsCount = 0;
  labs!: Labs;
  checkExitsEnvCode = false;
  selectedItems!: SelectedItems;
  addressDetails!: any;

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
      specificFormat: true,
    };
    this.selectedItems = new SelectedItems({});
    this.reset();
    makeObservable<LabStore, any>(this, {
      listLabs: observable,
      listLabsCount: observable,
      labs: observable,
      checkExitsEnvCode: observable,
      selectedItems: observable,
      addressDetails: observable,

      LabService: computed,
      fetchListLab: action,
      updateLabList: action,
      filterLabList: action,
      setExitsEnvCode: action,
      updateLabs: action,
      updateSelectedItems: action,
      updateAddressDetails: action,
      reset: action,
    });
  }

  reset() {
    this.labs = new Labs({});
    this.listLabs = [];
    this.listLabsCount = 0;
    this.labs = {
      ...this.labs,
      openingTime: dayjs().format('hh:mm a'),
      closingTime: dayjs().format('hh:mm a'),
      reportFormat: true,
      printLable: false,
      abnFlag: false,
      critical: false,
      priceList: [{id: 0, maxDis: 0}],
      specificFormat: true,
    };
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

  updateAddressDetails(res: any) {
    this.addressDetails = res;
  }
}
