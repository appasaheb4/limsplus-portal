import {makeObservable, action, observable, computed} from 'mobx';
import {PatientResultService} from '../services';
import {PatientResult} from '../models';

export class PatientResultStore {
  patientResultList: PatientResult[] = [];
  patientResultListCount!: number;
  patientResultListNotAutoUpdate: PatientResult[] = [];
  patientResultListNotAutoUpdateCount!: number;
  patientResultListWithLabId: PatientResult[] = [];
  patientResultTestCount!: number;
  distinctPatientResult!: any;
  distinctPatientResultCopy!: any;

  constructor() {
    this.patientResultList = [];
    this.patientResultListCount = 0;
    this.patientResultListNotAutoUpdate = [];
    this.patientResultListNotAutoUpdateCount = 0;
    this.patientResultListWithLabId = [];
    this.patientResultTestCount = 0;
    this.distinctPatientResult = undefined;
    this.distinctPatientResultCopy = undefined;

    makeObservable<PatientResultStore, any>(this, {
      patientResultList: observable,
      patientResultListCount: observable,
      patientResultListNotAutoUpdate: observable,
      patientResultListNotAutoUpdateCount: observable,
      patientResultListWithLabId: observable,
      patientResultTestCount: observable,
      distinctPatientResult: observable,
      distinctPatientResultCopy: observable,

      patientResultService: computed,
      updatePatientResultListWithLabId: action,
      filterPatientResultListWithLabid: action,

      updatePatientResult: action,
      updatePatientResultNotAutoUpdate: action,
      filterPatientResultList: action,
      patientResultListForGeneralResEntry: action,
      updateDistinctPatientResult: action,
    });
  }

  get patientResultService() {
    return new PatientResultService();
  }

  updatePatientResult(res: any) {
    if (!Array.isArray(res)) {
      if (!res.patientResults.success) return alert(res.patientResults.message);
      this.patientResultList = res.patientResults.patientResultList;
      this.patientResultListCount = res.patientResults.paginatorInfo.count;
    } else {
      this.patientResultList = res;
    }
  }

  updatePatientResultNotAutoUpdate(res: any) {
    if (!Array.isArray(res)) {
      if (!res.patientResultsNotAutoUpdate.success)
        return alert(res.patientResultsNotAutoUpdate.message);
      this.patientResultListNotAutoUpdate =
        res.patientResultsNotAutoUpdate.patientResultList;
      this.patientResultListNotAutoUpdateCount =
        res.patientResultsNotAutoUpdate.paginatorInfo.count;
    } else {
      this.patientResultListNotAutoUpdate = res;
    }
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
    this.patientResultListNotAutoUpdate =
      res.patientResultListForGenResEntry.patientResultList;
    this.patientResultListNotAutoUpdateCount =
      res.patientResultListForGenResEntry.paginatorInfo.count;
  }

  updateDistinctPatientResult(payload) {
    const data = payload.getPatientResultDistinct.patientResultList?.map(
      item => {
        const obj = {
          pLab: item._id?.pLab,
          departement: item._id?.departement,
          testStatus: item._id?.testStatus,
          resultStatus: item._id?.resultStatus,
          testCode: item._id?.testCode,
          testName: item._id?.testName,
          analyteCode: item._id?.analyteCode,
          analyteName: item._id?.analyteName,
          labId: item._id?.labId,
        };
        return JSON.parse(JSON.stringify(obj));
      },
    );
    this.distinctPatientResult = data;
    this.distinctPatientResultCopy = data;
  }

  filterDistinctPatientResult(res: any) {
    this.distinctPatientResult = res;
  }
}
