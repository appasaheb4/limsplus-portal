import {makeObservable, action, observable, computed} from 'mobx';
import {GenerateReportsService} from '../services';
import {PatientReport} from '../models';

export class GenerateReportsStore {
  patientReports!: PatientReport;
  constructor() {
    makeObservable<GenerateReportsStore, any>(this, {
      patientReports: observable,

      generateReportsService: computed,
      updatePatientReports: action,
    });
  }

  get generateReportsService() {
    return new GenerateReportsService();
  }

  updatePatientReports(res: any) {
    this.patientReports = res.getPatientReports?.data;
  }
}
