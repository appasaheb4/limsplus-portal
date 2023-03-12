import {makeObservable, action, observable, computed} from 'mobx';
import {RegistrationLocations, SelectedItems} from '../models';
import {RegistrationLocationsService} from '../services';
import dayjs from 'dayjs';

export class RegistrationLocationsStore {
  registrationLocations!: RegistrationLocations;
  listRegistrationLocations: RegistrationLocations[];
  listRegistrationLocationsCopy: RegistrationLocations[];
  listRegistrationLocationsCount: number;
  checkExitsLabEnvCode: boolean;
  selectedItems!: SelectedItems;

  constructor() {
    this.listRegistrationLocations = [];
    this.listRegistrationLocationsCopy = [];
    this.listRegistrationLocationsCount = 0;
    this.checkExitsLabEnvCode = false;
    this.registrationLocations = {
      ...this.registrationLocations,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
      ),
      version: 1,
      confidential: false,
      printLabel: false,
      neverBill: false,
      urgent: false,
      priceList: [{id: 0, maxDis: 0}],
      isPrintPrimaryBarcod: false,
      isPrintSecondaryBarcode: false,
    };
    this.selectedItems = new SelectedItems({});
    this.reset();

    makeObservable<RegistrationLocationsStore, any>(this, {
      registrationLocations: observable,
      listRegistrationLocations: observable,
      listRegistrationLocationsCopy: observable,
      listRegistrationLocationsCount: observable,
      checkExitsLabEnvCode: observable,
      selectedItems: observable,

      registrationLocationsService: computed,
      fetchRegistrationLocations: action,
      updateRegistrationLocationsList: action,
      updateRegistrationLocations: action,
      updateExistsLabEnvCode: action,
      filterRegistrationLocationList: action,
      updateSelectedItems: action,
      reset: action,
    });
  }

  reset() {
    this.registrationLocations = new RegistrationLocations({});
    this.listRegistrationLocations = [];
    this.listRegistrationLocationsCount = 0;
    this.registrationLocations = {
      ...this.registrationLocations,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
      ),
      version: 1,
      confidential: false,
      printLabel: false,
      neverBill: false,
      urgent: false,
      priceList: [{id: 0, maxDis: 0}],
      isPrintPrimaryBarcod: false,
      isPrintSecondaryBarcode: false,
    };
  }

  get registrationLocationsService() {
    return new RegistrationLocationsService();
  }

  fetchRegistrationLocations(page?, limit?) {
    this.registrationLocationsService.listRegistrationLocations(page, limit);
  }

  updateRegistrationLocationsList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.registrationLocations.success)
        return alert(res.registrationLocations.message);
      this.listRegistrationLocationsCount =
        res.registrationLocations.paginatorInfo.count;
      this.listRegistrationLocations = res.registrationLocations.data;
      this.listRegistrationLocationsCopy = res.registrationLocations.data;
    } else {
      this.listRegistrationLocations = res;
    }
  }

  filterRegistrationLocationList(res: any) {
    this.listRegistrationLocationsCount =
      res.filterRegistrationLocations.paginatorInfo.count;
    this.listRegistrationLocations = res.filterRegistrationLocations.data;
  }

  updateRegistrationLocations(locations: RegistrationLocations) {
    this.registrationLocations = locations;
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status;
  };

  updateSelectedItems(items: SelectedItems) {
    this.selectedItems = items;
  }
}
