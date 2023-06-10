/* eslint-disable no-console */
import {makeObservable, action, observable} from 'mobx';
import {DefaultValues, FilterOptionList} from '../models';
import {PatientManagerStore} from '../stores/patient-manager.store';

export class PatientRegistrationStore {
  defaultValues!: DefaultValues;
  filterOptionList!: FilterOptionList;
  patientManagerStore = new PatientManagerStore();
  constructor() {
    this.reload();
    makeObservable<PatientRegistrationStore, any>(this, {
      defaultValues: observable,
      filterOptionList: observable,

      updateDefaultValue: action,
      updateFilterOptionList: action,
      getPatientRegRecords: action,
    });
  }

  reload() {
    this.defaultValues = {
      ...this.defaultValues,
      pId: '',
      labId: '',
      mobileNo: '',
      accordionExpandItem: '',
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

  getPatientRegRecords(type: string, value: string) {
    this.patientManagerStore.patientManagerService.getFilterOptionList({
      input: {
        filter: {
          type,
          [type]: value,
        },
      },
    });
    this.patientManagerStore.patientManagerService.getPatientRegRecords({
      input: {
        filter: {type, [type]: value},
      },
    });
  }
}
