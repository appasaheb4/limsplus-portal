import {makeObservable, action, observable, computed} from 'mobx';
import {PatientResultService} from '../services';
import {PatientResult} from '../models';

export class PatientResultStore {
  patientResultList: PatientResult[] = [];
  patientResultListCount!: number;
  patientResultListWithLabId: PatientResult[] = [];
  patientResultTestCount!: number;

  constructor() {
    this.patientResultList = [];
    this.patientResultListWithLabId = [];
    this.patientResultTestCount = 0;

    makeObservable<PatientResultStore, any>(this, {
      patientResultList: observable,
      patientResultListCount: observable,
      patientResultListWithLabId: observable,
      patientResultTestCount: observable,

      patientResultService: computed,
      updatePatientResultListWithLabId: action,
      filterPatientResultListWithLabid: action,

      updatePatientResult: action,
      filterPatientResultList: action,
      patientResultListForGeneralResEntry: action,
    });
  }

  get patientResultService() {
    return new PatientResultService();
  }

  updatePatientResult(res: any) {
    if (!res.patientResults.success) return alert(res.patientResults.message);
    this.patientResultList = res.patientResults.patientResultList;
    this.patientResultListCount = res.patientResults.paginatorInfo.count;
  }

  updatePatientResultListWithLabId(res: any) {
    if (!res.patientResultsWithLabId.success)
      return alert(res.patientResultsWithLabId.message);
    this.patientResultListWithLabId =
      res.patientResultsWithLabId.patientResultList;
    this.patientResultTestCount =
      res.patientResultsWithLabId.paginatorInfo.count;
  }

  filterPatientResultListWithLabid(res: any) {
    this.patientResultListWithLabId =
      res.filterPatientResultWithLabId.patientResultList;
    this.patientResultTestCount =
      res.filterPatientResultWithLabId.paginatorInfo.count;
  }

  filterPatientResultList(res: any) {
    this.patientResultList =
      res.patientResultListForGenResEntry.patientResultList;
    this.patientResultListCount =
      res.patientResultListForGenResEntry.paginatorInfo.count;
  }

  patientResultListForGeneralResEntry(res: any) {
    this.patientResultList =
      res.patientResultListForGenResEntry.patientResultList;
    this.patientResultListCount =
      res.patientResultListForGenResEntry.paginatorInfo.count;
  }
}
