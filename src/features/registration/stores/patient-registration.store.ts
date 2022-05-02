/* eslint-disable no-console */
import {makeObservable, action, observable, intercept} from 'mobx';
import {DefaultValues} from '../models';

export class PatientRegistrationStore {
  defaultValues!: DefaultValues;
  constructor() {
    this.defaultValues = {
      ...this.defaultValues,
      labIdLock: false,
    };
    makeObservable<PatientRegistrationStore, any>(this, {
      defaultValues: observable,
      updateDefaultValue: action,
    });
  }

  updateDefaultValue(values: DefaultValues) {
    this.defaultValues = values;
  }

  // disposer = observe(this.defaultValues, change => {
  //   console.log({change});
  //   // if ('get' === change.labId) {
  //   //   // obj.get value is changed
  //   // }
  // });
}

// const patientRegistraton = new PatientRegistrationStore();
// intercept(patientRegistraton, 'defaultValues', function () {
//   console.log('--intercept todo, title');
// });
