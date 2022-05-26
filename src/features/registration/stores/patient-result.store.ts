import {makeObservable, action, observable, computed} from 'mobx';
import {PatientResultService} from '../services';
import {PatientResult} from '../models';

export class PatientResultStore {
  //patientResultList: PatientResult[] = [];
  patientResultListWithLabId: PatientResult[] = [];
  patientResultTestCount!: number;

  constructor() {
    this.patientResultListWithLabId = [];
    this.patientResultTestCount = 0;

    makeObservable<PatientResultStore, any>(this, {
      patientResultListWithLabId: observable,
      patientResultTestCount: observable,

      patientResultService: computed,
      updatePatientResultListWithLabId: action,
      filterPatientResultList: action,
    });
  }

  get patientResultService() {
    return new PatientResultService();
  }

  updatePatientResultListWithLabId(res: any) {
    if (!res.patientResultsWithLabId.success)
      return alert(res.patientResultsWithLabId.message);
    this.patientResultListWithLabId =
      res.patientResultsWithLabId.patientResultList;
    this.patientResultTestCount =
      res.patientResultsWithLabId.paginatorInfo.count;
  }

  filterPatientResultList(res: any) {
    this.patientResultListWithLabId =
      res.filterPatientResultWithLabId.patientResultList;
    this.patientResultTestCount =
      res.filterPatientResultWithLabId.paginatorInfo.count;
  }
}
