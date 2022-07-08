import {makeObservable, action, observable, computed} from 'mobx';
import {AdministrativeDivisions} from '../models';
import {AdministrativeDivisionsService} from '../services';
interface LocalState {
  state: string;
  district: string;
  city: string;
  area: string;
  postalCode: string;
}
export class AdministrativeDivisionsStore {
  administrativeDiv!: AdministrativeDivisions;
  listAdministrativeDivCount: number = 0;
  listAdministrativeDiv!: AdministrativeDivisions[];
  listAdministrativeDivCopy!: AdministrativeDivisions[];
  localState!: Partial<LocalState>;

  constructor() {
    this.administrativeDiv = new AdministrativeDivisions({});
    this.listAdministrativeDiv = [];
    this.listAdministrativeDivCopy = [];
    this.localState = {};
    makeObservable<AdministrativeDivisionsStore, any>(this, {
      administrativeDiv: observable,
      listAdministrativeDivCount: observable,
      listAdministrativeDiv: observable,
      localState: observable,

      administrativeDivisionsService: computed,
      fetchAdministrativeDiv: action,
      updateAdministrativeDivList: action,
      updateAdministrativeDiv: action,
      updateLocalState: action,
      updateLocalDistrict: action,
      updateLocalCity: action,
      updateLocalArea: action,
      updateLocalPostalCode: action,
    });
  }

  get administrativeDivisionsService() {
    return new AdministrativeDivisionsService();
  }

  fetchAdministrativeDiv(page?, limit?) {
    this.administrativeDivisionsService.listAdministrativeDivisions(
      page,
      limit,
    );
  }

  updateAdministrativeDivList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.administrativeDivisions.success)
        return alert(res.administrativeDivisions.message);
      this.listAdministrativeDivCount =
        res.administrativeDivisions.paginatorInfo.count;
      this.listAdministrativeDiv = res.administrativeDivisions.data;
      this.listAdministrativeDivCopy = res.administrativeDivisions.data;
    } else {
      this.listAdministrativeDiv = res;
    }
  }

  filterAdministrativeDivList(res: any) {
    this.listAdministrativeDivCount =
      res.filterAdministrativeDivisions.paginatorInfo.count;
    this.listAdministrativeDiv = res.filterAdministrativeDivisions.data;
  }

  updateAdministrativeDiv(administrative: AdministrativeDivisions) {
    this.administrativeDiv = administrative;
  }
  updateLocalState(state: LocalState) {
    this.localState = state;
  }
  updateLocalDistrict(district: LocalState) {
    this.localState = district;
  }
  updateLocalCity(city: LocalState) {
    this.localState = city;
  }
  updateLocalArea(area: LocalState) {
    this.localState = area;
  }
  updateLocalPostalCode(postalCode: LocalState) {
    this.localState = postalCode;
  }
}
