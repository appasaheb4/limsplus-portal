import { makeObservable, action, observable, computed } from 'mobx';
import { HolidayMaster } from '../models';

export class HolidayMasterStore {
  holidayMaster!: HolidayMaster;
  listHolidayMaster: HolidayMaster[];
  listHolidayMasterCount: number;

  constructor() {
    this.listHolidayMaster = [];
    this.listHolidayMasterCount = 0;
    this.reset();
    makeObservable<HolidayMasterStore, any>(this, {
      holidayMaster: observable,
      listHolidayMaster: observable,
      listHolidayMasterCount: observable,

      holidayMasterService: computed,
      fetchHolidayMaster: action,
      updateHolidayMaster: action,
      reset: action,
    });
  }

  get holidayMasterService() {
    return;
  }

  reset() {
    this.holidayMaster = new HolidayMaster({});
    this.listHolidayMaster = [];
    this.listHolidayMasterCount = 0;
    this.holidayMaster = {
      ...this.holidayMaster,
      dateCreation: new Date(),
    };
  }

  fetchHolidayMaster(page?, limit?) {}

  updateHolidayMaster(holiday: HolidayMaster) {
    this.holidayMaster = holiday;
  }
}
