import { makeObservable, action, observable, computed } from 'mobx';
import { TatMaster } from '../models';

export class TatMasterStore {
  tatMaster!: TatMaster;
  listTatMaster: TatMaster[];
  listTatMasterCount: number;

  constructor() {
    this.listTatMaster = [];
    this.listTatMasterCount = 0;
    this.reset();
    makeObservable<TatMasterStore, any>(this, {
      tatMaster: observable,
      listTatMaster: observable,
      listTatMasterCount: observable,

      tatMasterService: computed,
      fetchTatMaster: action,
      updateTatMaster: action,
      reset: action,
    });
  }

  get tatMasterService() {
    return;
  }

  reset() {
    this.tatMaster = new TatMaster({});
    this.listTatMaster = [];
    this.listTatMasterCount = 0;
    this.tatMaster = {
      ...this.tatMaster,
      dateCreation: new Date(),
    };
  }

  fetchTatMaster(page?, limit?) {}

  updateTatMaster(tat: TatMaster) {
    this.tatMaster = tat;
  }
}
