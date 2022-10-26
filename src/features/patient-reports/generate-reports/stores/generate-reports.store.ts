import {makeObservable, action, observable, computed} from 'mobx';
import {GenerateReportsService} from '../services';
import {PatientReport} from '../models';
import {PageBranding} from '@/features/report-builder/report-settings/models';

export class GenerateReportsStore {
  patientReports!: PatientReport;
  pageBranding!: PageBranding;
  constructor() {
    this.patientReports = new PatientReport({});
    this.pageBranding = new PageBranding({});

    makeObservable<GenerateReportsStore, any>(this, {
      patientReports: observable,
      pageBranding: observable,

      generateReportsService: computed,
      updatePatientReports: action,
      updatePageBranding: action,
    });
  }

  get generateReportsService() {
    return new GenerateReportsService();
  }

  updatePatientReports(res: any) {
    this.patientReports = res;
  }

  updatePageBranding(res: any) {
    this.pageBranding = res;
  }
}
