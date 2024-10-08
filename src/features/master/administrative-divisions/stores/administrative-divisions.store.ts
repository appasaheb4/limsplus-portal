import { makeObservable, action, observable, computed } from 'mobx';
import { AdministrativeDivisions, LocalInput } from '../models';
import { AdministrativeDivisionsService } from '../services';
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
  localInput!: LocalInput;

  constructor() {
    this.administrativeDiv = new AdministrativeDivisions({});
    this.listAdministrativeDiv = [];
    this.listAdministrativeDivCopy = [];
    this.localState = {};
    this.localInput = new LocalInput({});
    this.reset();
    makeObservable<AdministrativeDivisionsStore, any>(this, {
      administrativeDiv: observable,
      listAdministrativeDivCount: observable,
      listAdministrativeDiv: observable,
      localState: observable,
      localInput: observable,

      administrativeDivisionsService: computed,
      fetchAdministrativeDiv: action,
      updateAdministrativeDivList: action,
      updateAdministrativeDiv: action,
      updateLocalState: action,
      updateLocalDistrict: action,
      updateLocalCity: action,
      updateLocalArea: action,
      updateLocalPostalCode: action,
      updateLocalInput: action,
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

  reset() {
    this.administrativeDiv = new AdministrativeDivisions({});
    this.listAdministrativeDiv = [];
    this.listAdministrativeDivCount = 0;
    this.localInput = new LocalInput({});
  }

  updateAdministrativeDivList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.administrativeDivisions.success)
        return console.log(res.administrativeDivisions.message);
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
  updateLocalState(state: Partial<LocalState>) {
    this.localState = state;
  }
  updateLocalDistrict(district: Partial<LocalState>) {
    this.localState = district;
  }
  updateLocalCity(city: Partial<LocalState>) {
    this.localState = city;
  }
  updateLocalArea(area: Partial<LocalState>) {
    this.localState = area;
  }
  updateLocalPostalCode(postalCode: Partial<LocalState>) {
    this.localState = postalCode;
  }
  updateLocalInput(input: LocalInput) {
    this.localInput = input;
  }
}
