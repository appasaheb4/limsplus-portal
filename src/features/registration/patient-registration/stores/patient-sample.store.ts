import {makeObservable, action, observable, computed} from 'mobx';
import {PatientSampleService} from '../services';
import {PatientSample} from '../models';

export class PatientSampleStore {
  patientSampleList: PatientSample[] = [];
  patientSampleListCount!: number;

  constructor() {
    this.patientSampleList = [];
    this.patientSampleListCount = 0;

    makeObservable<PatientSampleStore, any>(this, {
      patientSampleList: observable,
      patientSampleListCount: observable,

      patientSampleService: computed,
      updatePatientSampleList: action,
      filterPatientSampleList: action,
    });
  }

  get patientSampleService() {
    return new PatientSampleService();
  }

  updatePatientSampleList(res: any) {
    if (!res.patientSamples.success) return alert(res.patientSamples.message);
    this.patientSampleList = res.patientSamples.patientSampleList;
    this.patientSampleListCount = res.patientSamples.paginatorInfo.count;
  }

  filterPatientSampleList(res: any) {
    this.patientSampleList = res.filterPatientResult.patientResultList;
    this.patientSampleListCount = res.filterPatientResult.paginatorInfo.count;
  }
}
