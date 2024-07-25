import { makeObservable, action, observable, computed } from 'mobx';
import _ from 'lodash';
import { PatientResultService } from '../services';
import { PatientResult } from '../models';

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
    this.reset();

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
      updatePatientResultByLabId: action,
      filterPatientResultListWithLabid: action,

      updatePatientResult: action,
      updatePatientResultNotAutoUpdate: action,
      filterPatientResultList: action,
      patientResultListForGeneralResEntry: action,
      updateDistinctPatientResult: action,
      filterDistinctPatientResult: action,
    });
  }

  reset() {
    this.patientResultList = [];
    this.patientResultListCount = 0;
    this.patientResultListNotAutoUpdate = [];
    this.patientResultListNotAutoUpdateCount = 0;
    this.patientResultListWithLabId = [];
    this.patientResultTestCount = 0;
    this.distinctPatientResult = undefined;
    this.distinctPatientResultCopy = undefined;
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
      if (!res.patientResultRecordsForGRE.success) {
        return alert(res.patientResultRecordsForGRE.message);
      } else {
        let data: any = res.patientResultRecordsForGRE.patientResultList;
        data = data.map(item => {
          return {
            ...item,
            testReportOrder: item?.extraData?.testReportOrder,
            analyteReportOrder: item?.extraData?.analyteReportOrder,
          };
        });
        data = _.sortBy(data, [
          'labId',
          'testReportOrder',
          'analyteReportOrder',
        ]);
        this.patientResultListNotAutoUpdate = data;
        this.patientResultListNotAutoUpdateCount =
          res.patientResultRecordsForGRE.paginatorInfo.count;
      }
    } else {
      this.patientResultListNotAutoUpdate = res;
    }
  }

  updatePatientResultByLabId(res: any) {
    let { data } = res.patientResult;
    data = data?.map(item => {
      return {
        ...item,
        testReportOrder: item?.extraData?.testReportOrder,
        analyteReportOrder: item?.extraData?.analyteReportOrder,
      };
    });
    data = _.sortBy(data, ['labId', 'testReportOrder', 'analyteReportOrder']);
    this.patientResultListWithLabId = data;
    this.patientResultTestCount = res.patientResult.paginatorInfo.count;
  }

  filterPatientResultListWithLabid(res: any) {
    this.patientResultListWithLabId =
      res.filterPatientResultWithLabId.patientResultList;
    this.patientResultTestCount =
      res.filterPatientResultWithLabId.paginatorInfo.count;
  }

  filterPatientResultList(res: any) {
    this.patientResultList =
      res.patientResultListForGenResEntry?.patientResultList;
    this.patientResultListCount =
      res.patientResultListForGenResEntry?.paginatorInfo.count;
  }

  patientResultListForGeneralResEntry(res: any) {
    this.patientResultListNotAutoUpdate =
      res.patientResultListForGenResEntry.patientResultList;
    this.patientResultListNotAutoUpdateCount =
      res.patientResultListForGenResEntry.paginatorInfo.count;
  }

  updateDistinctPatientResult(payload, isCopyListUpdate = true) {
    const data = payload.getPatientResultDistinct.patientResultList?.map(
      item => {
        const obj = {
          pLab: item?.pLab,
          testCode: item?.testCode,
          testName: item?.testName,
          departement: item?.departement,
          testStatus: item?.testStatus,
          resultStatus: item?.resultStatus,
          analyteCode: item?.analyteCode,
          analyteName: item?.analyteName,
          labId: item?.labId,
          name: item?.name || '',
          pId: item?.pId || 0,
        };
        return JSON.parse(JSON.stringify(obj));
      },
    );
    this.distinctPatientResult = data;
    if (isCopyListUpdate) this.distinctPatientResultCopy = data;
  }

  filterDistinctPatientResult(res: any) {
    this.distinctPatientResult = res;
  }
}
