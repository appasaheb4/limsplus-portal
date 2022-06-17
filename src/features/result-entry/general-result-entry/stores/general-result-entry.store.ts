import {makeObservable, action, observable} from 'mobx';
import {FilterGeneralResEntryList, SelectedItems} from '../models';

export class GeneralResultEntryStore {
  filterGeneralResEntry!: FilterGeneralResEntryList;
  selectedItems!: SelectedItems;

  constructor() {
    makeObservable<GeneralResultEntryStore, any>(this, {
      filterGeneralResEntry: observable,
      selectedItems: observable,

      updateFilterGeneralResEntry: action,
      updateSelectedItems: action,
    });
  }

  updateFilterGeneralResEntry(res: FilterGeneralResEntryList) {
    this.filterGeneralResEntry = res;
  }

  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items;
    else this.selectedItems = new SelectedItems({});
  }
}
