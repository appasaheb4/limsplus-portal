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
  distinctPatientManager!: any;
  distinctPatientManagerCopy!: any;

  constructor() {
    this.reset();
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
    });
  }

  reset() {
    this.listPatientManger = [];
    this.listPatientMangerCopy = [];
    this.listPatientMangerCount = 0;
    this.checkExistsPatient = false;
    this.distinctPatientManager = undefined;
    this.distinctPatientManagerCopy = undefined;
    this.patientManger = new PatientManger({
      ageUnit: 'Y',
      isBirthdateAvailabe: true,
      isPatientMobileNo: true,
      isVIP: false,
      isAddress: false,
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

  updateDistinctPatientManager(payload) {
    const data = payload.getPatientManagerDistinct.result?.map(item => {
      const obj = {
        pLab: item._id?.pLab,
        testCode: item._id?.testCode,
        testName: item._id?.testName,
        departement: item._id?.departement,
        testStatus: item._id?.testStatus,
        resultStatus: item._id?.resultStatus,
        analyteCode: item._id?.analyteCode,
        analyteName: item._id?.analyteName,
        labId: item._id?.labId,
        name: item._id?.name || '',
        pId: item._id?.pId || 0,
      };
      return JSON.parse(JSON.stringify(obj));
    });
    this.distinctPatientManager = data;
    this.distinctPatientManagerCopy = data;
  }

  filterDistinctPatientManager(res: any) {
    this.distinctPatientManager = res;
  }
}
