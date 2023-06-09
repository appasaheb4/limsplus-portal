/* eslint-disable no-console */
import {makeObservable, action, observable} from 'mobx';
import {DefaultValues, FilterOptionList} from '../models';

export class PatientRegistrationStore {
  defaultValues!: DefaultValues;
  filterOptionList!: FilterOptionList;
  constructor() {
    this.reload();
    makeObservable<PatientRegistrationStore, any>(this, {
      defaultValues: observable,
      filterOptionList: observable,

      updateDefaultValue: action,
      updateFilterOptionList: action,
    });
  }

  reload() {
    this.defaultValues = {
      ...this.defaultValues,
      pId: '',
      labId: '',
      mobileNo: '',
      filterLock: false,
    };
    this.filterOptionList = {
      pIds: [],
      labIds: [],
      mobileNos: [],
    };
  }

  updateDefaultValue(values: DefaultValues) {
    this.defaultValues = new DefaultValues(values);
  }

  updateFilterOptionList(res: any) {
    if (res.getFilterOptionListPatientManager.success)
      this.filterOptionList = res.getFilterOptionListPatientManager.records;
  }
}
