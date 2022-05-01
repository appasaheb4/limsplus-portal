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

  disposer = intercept(this.defaultValues, 'labId', change => {
    console.log('changed');
    throw new Error(
      "This doesn't look like a color at all: " + change.newValue,
    );
  });
}
