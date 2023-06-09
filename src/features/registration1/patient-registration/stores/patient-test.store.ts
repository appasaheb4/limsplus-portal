import {makeObservable, action, observable, computed} from 'mobx';
import {PatientTestService} from '../services';
import {PatientTest} from '../models';

export class PatientTestStore {
  patientTest!: PatientTest;
  patientListTest: PatientTest[] = [];
  patientListTestCount!: number;

  constructor() {
    this.reset();

    makeObservable<PatientTestStore, any>(this, {
      patientTest: observable,
      patientListTest: observable,
      patientListTestCount: observable,

      patientTestService: computed,
      updateTestList: action,
      filterTestList: action,
      updateTest: action,
    });
  }

  reset() {
    this.patientTest = new PatientTest({});
    this.patientListTest = [];
    this.patientListTestCount = 0;
  }

  get patientTestService() {
    return new PatientTestService();
  }

  updateTestList(res: any) {
    this.patientListTest = res.patientTests.data;
    this.patientListTestCount = res.patientTests.paginatorInfo.count;
  }

  filterTestList(res: any) {
    this.patientListTest = res.filterPatientTest.panelTestList;
    this.patientListTestCount = res.filterPatientTest.paginatorInfo.count;
  }

  updateTest(input: PatientTest) {
    this.patientTest = input;
  }
}
