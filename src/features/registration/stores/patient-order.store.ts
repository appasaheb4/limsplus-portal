import {makeObservable, action, observable, computed} from 'mobx';
import {PatientOrderService} from '../services';
import {PatientOrder, SelectedItems} from '../models';

export class PatientOrderStore {
  patientOrder!: PatientOrder;
  listPatientOrder: PatientOrder[];
  listPatientOrderCopy: PatientOrder[];
  listPatientOrderCount!: number;
  selectedItems!: SelectedItems;
  packageList!: any;
  checkExistsRecord!: boolean;

  constructor() {
    this.patientOrder = new PatientOrder({});
    this.selectedItems = new SelectedItems({});
    this.listPatientOrder = [];
    this.listPatientOrderCopy = [];
    this.packageList = undefined;
    this.listPatientOrderCount = 0;
    this.checkExistsRecord = false;

    makeObservable<PatientOrderStore, any>(this, {
      patientOrder: observable,
      listPatientOrder: observable,
      listPatientOrderCopy: observable,
      listPatientOrderCount: observable,
      selectedItems: observable,
      packageList: observable,
      checkExistsRecord: observable,

      patientOrderService: computed,
      updatePatientOrderList: action,
      filterPatientOrderList: action,
      updatePatientOrder: action,
      updateSelectedItems: action,
      updatePackageList: action,
      updateExistsRecords: action,
    });
  }

  get patientOrderService() {
    return new PatientOrderService();
  }

  updatePatientOrderList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.patientOrders.success) return alert(res.patientOrders.message);
      this.listPatientOrder = res.patientOrders.data;
      this.listPatientOrderCopy = res.patientOrders.data;
      this.listPatientOrderCount = res.patientOrders.paginatorInfo.count;
    } else {
      this.listPatientOrder = res;
    }
  }

  filterPatientOrderList(res: any) {
    this.listPatientOrder = res.filterPatientOrder.data;
    this.listPatientOrderCount = res.filterPatientOrder.paginatorInfo.count;
  }

  updatePatientOrder(input: PatientOrder) {
    this.patientOrder = input;
  }

  updateExistsRecords(flag: boolean) {
    this.checkExistsRecord = flag;
  }

  updateSelectedItems(res: SelectedItems) {
    this.selectedItems = res;
  }

  updatePackageList(list: any[]) {
    this.packageList = list;
  }
}
