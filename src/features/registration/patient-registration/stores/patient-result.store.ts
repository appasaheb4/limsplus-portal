import { makeObservable, action, observable, computed } from 'mobx';
import _ from 'lodash';
import { PatientResultService } from '../services';
import { PatientResult, DistinctPatientResult } from '../models';

export class PatientResultStore {
  patientResultList: PatientResult[] = [];
  patientResultListCount!: number;
  patientResultListNotAutoUpdate: PatientResult[] = [];
  patientResultListNotAutoUpdateCount!: number;
  patientResultListWithLabId: PatientResult[] = [];
  patientResultTestCount!: number;
  distinctPatientResult!: Partial<DistinctPatientResult>;
  distinctPatientResultCopy!: Partial<DistinctPatientResult>;

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
    this.distinctPatientResult = {};
    this.distinctPatientResultCopy = {};
  }

  get patientResultService() {
    return new PatientResultService();
  }

  updatePatientResult(res: any) {
    if (!Array.isArray(res)) {
      if (!res.patientResults.success)
        return console.log(res.patientResults.message);
      this.patientResultList = res.patientResults.patientResultList;
      this.patientResultListCount = res.patientResults.paginatorInfo.count;
    } else {
      this.patientResultList = res;
    }
  }

  updatePatientResultNotAutoUpdate(res: any) {
    if (!Array.isArray(res)) {
      if (!res.patientResultRecordsForGRE.success) {
        return console.log(res.patientResultRecordsForGRE.message);
      } else {
        const data: any = res.patientResultRecordsForGRE.patientResultList;
        // data = data.map(item => {
        //   return {
        //     ...item,
        //     testReportOrder: item?.extraData?.testReportOrder,
        //     analyteReportOrder: item?.extraData?.analyteReportOrder,
        //   };
        // });
        // data = _.sortBy(data, [
        //   'labId',
        //   'testReportOrder',
        //   'analyteReportOrder',
        // ]);
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
    const data = payload.getPatientResultDistinct.patientResultList;
    this.distinctPatientResult = data;
    if (isCopyListUpdate) this.distinctPatientResultCopy = data;
  }

  filterDistinctPatientResult(res: any) {
    this.distinctPatientResult = res;
  }
}
