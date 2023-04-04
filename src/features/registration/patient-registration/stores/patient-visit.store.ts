import {makeObservable, action, observable, computed} from 'mobx';
import {PatientVisitService} from '../services';
import {PatientVisit, SelectedPatientVisitItems} from '../models';

export class PatientVisitStore {
  patientVisit!: PatientVisit;
  listPatientVisit: PatientVisit[] = [];
  labIdList: Array<any> = [];
  listPatientVisitCopy: PatientVisit[] = [];
  listPatientVisitCount!: number;
  checkExistsVisitId!: boolean;
  checkExistsLabId!: boolean;
  selectedItems!: SelectedPatientVisitItems;

  constructor() {
    this.reset();
    makeObservable<PatientVisitStore, any>(this, {
      patientVisit: observable,
      listPatientVisit: observable,
      listPatientVisitCopy: observable,
      listPatientVisitCount: observable,
      labIdList: observable,
      selectedItems: observable,

      patientVisitService: computed,
      updateLabIdList: action,
      updatePatientVisitList: action,
      filterPatientVisitList: action,
      updatePatientVisit: action,
      updateSelectedItems: action,
    });
  }

  reset() {
    this.listPatientVisit = [];
    this.labIdList = [];
    this.listPatientVisitCopy = [];
    this.listPatientVisitCount = 0;
    this.checkExistsVisitId = false;
    this.checkExistsLabId = false;
    this.patientVisit = {
      ...this.patientVisit,
      visitDate: new Date(),
      registrationDate: new Date(),
      collectionDate: new Date(),
      holdReport: false,
      isNewDoctor: false,
      specificFormat: false,
    };
  }

  get patientVisitService() {
    return new PatientVisitService();
  }

  updatePatientVisitList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.patientVisits.success) return alert(res.patientVisits.message);
      this.listPatientVisit = res.patientVisits.data;
      this.listPatientVisitCopy = res.patientVisits.data;
      this.listPatientVisitCount = res.patientVisits.paginatorInfo.count;
    } else {
      this.listPatientVisit = res;
    }
  }

  updateLabIdList(res: any) {
    this.labIdList = res.filterByLabIdPatientVisit.data;
  }

  filterPatientVisitList(res: any) {
    this.listPatientVisit = res.filterPatientVisit.data;
    this.listPatientVisitCount = res.filterPatientVisit.paginatorInfo.count;
  }

  updatePatientVisit(input: PatientVisit) {
    this.patientVisit = input;
  }

  updateExistsVisitId(flag: boolean) {
    this.checkExistsVisitId = flag;
  }

  updateExistsLabId(flag: boolean) {
    this.checkExistsLabId = flag;
  }

  updateSelectedItems(items: SelectedPatientVisitItems) {
    this.selectedItems = items;
  }
}
