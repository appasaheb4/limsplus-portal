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

  constructor() {
    this.reset();
    makeObservable<PatientManagerStore, any>(this, {
      patientManger: observable,
      listPatientManger: observable,
      listPatientMangerCopy: observable,
      listPatientMangerCount: observable,

      patientManagerService: computed,
      updatePatientManagerList: action,
      updatePatientManager: action,
      filterPatientManagerList: action,
      updateExistsPatient: action,
    });
  }

  reset() {
    this.listPatientManger = [];
    this.listPatientMangerCopy = [];
    this.listPatientMangerCount = 0;
    this.checkExistsPatient = false;
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
}
