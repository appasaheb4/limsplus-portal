import {makeObservable, action, observable} from 'mobx';
import {FilterGeneralResEntryList} from '../models';

export class GeneralResultEntryStore {
  filterGeneralResEntry!: FilterGeneralResEntryList;

  constructor() {
    makeObservable<GeneralResultEntryStore, any>(this, {
      filterGeneralResEntry: observable,

      updateFilterGeneralResEntry: action,
    });
  }

  updateFilterGeneralResEntry(res: FilterGeneralResEntryList) {
    this.filterGeneralResEntry = res;
  }
}
