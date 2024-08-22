import { makeObservable, action, observable, computed } from 'mobx';
import { PatientManagerService } from '../services';
import { PatientManger } from '../models';
import dayjs from 'dayjs';
export class PatientManagerStore {
  patientManger!: PatientManger;
  listPatientManger!: PatientManger[];
  listPatientMangerCopy!: PatientManger[];
  listPatientMangerCount!: number;
  checkExistsPatient!: boolean;
  distinctPatientManager!: PatientManger[];
  distinctPatientManagerCopy!: PatientManger[];
  reportToEmails!:
    | {
        name: string;
        email: string;
      }
    | undefined;
  reportToMobiles!:
    | {
        name: string;
        mobileNo: string;
      }
    | undefined;

  constructor() {
    this.reset();
    this.reportToEmails = undefined;
    this.reportToMobiles = undefined;
    makeObservable<PatientManagerStore, any>(this, {
      patientManger: observable,
      listPatientManger: observable,
      listPatientMangerCopy: observable,
      listPatientMangerCount: observable,
      distinctPatientManager: observable,
      distinctPatientManagerCopy: observable,

      patientManagerService: computed,
      updatePatientManagerList: action,
      updatePatientManager: action,
      filterPatientManagerList: action,
      updateExistsPatient: action,
      filterDistinctPatientManager: action,
      updateReportToEmailFields: action,
      updateReportToMobileFields: action,
    });
  }

  reset() {
    this.listPatientManger = [];
    this.listPatientMangerCopy = [];
    this.listPatientMangerCount = 0;
    this.checkExistsPatient = false;
    this.distinctPatientManager = [];
    this.distinctPatientManagerCopy = [];
    this.patientManger = new PatientManger({
      ageUnit: 'Y',
      isBirthdateAvailabe: true,
      isPatientMobileNo: true,
      isVIP: false,
      isAddress: false,
      isCopyDoctor: false,
      reportToEmails: [],
      reportToMobiles: [],
    });
  }

  get patientManagerService() {
    return new PatientManagerService();
  }

  updatePatientManagerList(res: any) {
    if (!Array.isArray(res)) {
      this.listPatientManger = res.patientManagers.data;
      this.listPatientMangerCopy = res.patientManagers.data;
      this.listPatientMangerCount = res.patientManagers.paginatorInfo.count;
    } else {
      this.listPatientManger = res;
    }
  }

  filterPatientManagerList(res: any) {
    this.listPatientManger = res.filterPatientManager.data;
    this.listPatientMangerCount = res.filterPatientManager.paginatorInfo.count;
  }

  updatePatientManager(manager: PatientManger) {
    this.patientManger = manager;
  }
  updateExistsPatient(flag: boolean) {
    this.checkExistsPatient = flag;
  }

  updateDistinctPatientManager(res) {
    if (!Array.isArray(res)) {
      this.distinctPatientManager = res.patientManagers.data;
      this.distinctPatientManagerCopy = res.patientManagers.data;
    } else {
      this.distinctPatientManager = res;
    }
  }

  filterDistinctPatientManager(res: any) {
    this.distinctPatientManager = res;
  }

  updateReportToEmailFields(fields?: any) {
    this.reportToEmails = fields || undefined;
  }
  updateReportToMobileFields(fields?: any) {
    this.reportToMobiles = fields || undefined;
  }
}
