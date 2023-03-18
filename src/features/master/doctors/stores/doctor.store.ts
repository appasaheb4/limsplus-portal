import {makeObservable, action, observable, computed} from 'mobx';
import {Doctors} from '../models';
import {DoctorsService} from '../services';
import dayjs from 'dayjs';

export class DoctorsStore {
  doctors!: Doctors;
  listDoctors: Doctors[];
  listDoctorsCopy: Doctors[];
  listDoctorsCount: number;
  checkExitsLabEnvCode: boolean;

  constructor() {
    this.listDoctors = [];
    this.listDoctorsCopy = [];
    this.listDoctorsCount = 0;
    this.checkExitsLabEnvCode = false;
    this.reset();

    makeObservable<DoctorsStore, any>(this, {
      doctors: observable,
      listDoctors: observable,
      listDoctorsCopy: observable,
      listDoctorsCount: observable,
      checkExitsLabEnvCode: observable,

      doctorsService: computed,
      fetchDoctors: action,
      updateDoctorsList: action,
      updateDoctors: action,
      updateExistsLabEnvCode: action,
      reset: action,
    });
  }

  reset() {
    this.doctors = new Doctors({});
    this.listDoctors = [];
    this.listDoctorsCount = 0;
    this.doctors = {
      ...this.doctors,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
      confidential: false,
      urgent: false,
      specificFormat: false,
    };
  }
  get doctorsService() {
    return new DoctorsService();
  }

  fetchDoctors(page?, limit?) {
    this.doctorsService.listDoctors(page, limit);
  }

  updateDoctorsList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.doctors.success) return alert(res.message);
      this.listDoctors = res.doctors.data;
      this.listDoctorsCopy = res.doctors.data;
      this.listDoctorsCount = res.doctors.paginatorInfo.count;
    } else {
      this.listDoctors = res;
    }
  }

  filterDoctorsList(res: any) {
    this.listDoctors = res.filterDoctors.data;
    this.listDoctorsCount = res.filterDoctors.paginatorInfo.count;
  }

  updateDoctors(methods: Doctors) {
    this.doctors = methods;
  }
  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status;
  };
}
