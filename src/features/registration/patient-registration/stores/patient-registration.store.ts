/* eslint-disable no-console */
import {makeObservable, action, observable} from 'mobx';
import {DefaultValues} from '../models';

export class PatientRegistrationStore {
  defaultValues!: DefaultValues;
  constructor() {
    this.defaultValues = {
      ...this.defaultValues,
      labId: '*',
      labIdLock: false,
    };
    makeObservable<PatientRegistrationStore, any>(this, {
      defaultValues: observable,
      updateDefaultValue: action,
    });
  }

  updateDefaultValue(values: DefaultValues) {
    this.defaultValues = new DefaultValues(values);
  }
}
