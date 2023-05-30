/* eslint-disable no-console */
import {makeObservable, action, observable} from 'mobx';
import {DefaultValues, FilterOptionList} from '../models';

export class PatientRegistrationStore {
  defaultValues!: DefaultValues;
  filterOptionList!: FilterOptionList;
  constructor() {
    this.defaultValues = {
      ...this.defaultValues,
      pId: '*',
      labId: '*',
      mobileNo: '*',
      filterLock: false,
    };
    this.filterOptionList = {pIds: [], labIds: [], mobileNos: []};
    makeObservable<PatientRegistrationStore, any>(this, {
      defaultValues: observable,
      filterOptionList: observable,

      updateDefaultValue: action,
      updateFilterOptionList: action,
    });
  }

  updateDefaultValue(values: DefaultValues) {
    this.defaultValues = new DefaultValues(values);
  }

  updateFilterOptionList(list: FilterOptionList) {
    this.filterOptionList = list;
  }
}
