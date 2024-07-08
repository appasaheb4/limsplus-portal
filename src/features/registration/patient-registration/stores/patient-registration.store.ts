/* eslint-disable no-console */
import { makeObservable, action, observable } from 'mobx';
import { DefaultValues, FilterOptionList } from '../models';
import { PatientManagerStore } from '../stores/patient-manager.store';

export class PatientRegistrationStore {
  defaultValues!: DefaultValues;
  filterOptionList!: FilterOptionList;
  patientManagerStore = new PatientManagerStore();
  input2isBlurEnable!: boolean;
  constructor() {
    this.reload();
    makeObservable<PatientRegistrationStore, any>(this, {
      defaultValues: observable,
      filterOptionList: observable,
      input2isBlurEnable: observable,

      updateDefaultValue: action,
      updateFilterOptionList: action,
      getPatientRegRecords: action,
      updateInput2isBlurEnable: action,
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
      isPVPIdLock: false,
      isPOLabIdLock: false,
    };
    this.filterOptionList = {
      pIds: [],
      labIds: [],
      mobileNos: [],
    };
    this.input2isBlurEnable = true;
  }

  updateDefaultValue(values: DefaultValues) {
    this.defaultValues = new DefaultValues(values);
  }

  updateFilterOptionList(res: any) {
    if (res.getFilterOptionListPatientManager.success)
      this.filterOptionList = res.getFilterOptionListPatientManager.records;
  }

  async getPatientRegRecords(
    key: string,
    value: string,
    type = 'fetch',
    pId?: number,
  ) {
    // await this.patientManagerStore.patientManagerService
    //   .getFilterOptionList({
    //     input: {
    //       filter: {
    //         type: key,
    //         [key]: value,
    //         patientPId: pId,
    //       },
    //     },
    //   })
    //   .then(async res => {
    //     if (res.getFilterOptionListPatientManager?.success) {
    //     }
    //   });
    await this.patientManagerStore.patientManagerService.getPatientRegRecords(
      {
        input: {
          filter: { type: key, [key]: value, patientPId: pId },
        },
      },
      type,
    );
    return true;
  }

  updateInput2isBlurEnable(flag: boolean) {
    this.input2isBlurEnable = flag;
  }
}
