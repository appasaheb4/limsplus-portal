import {version} from 'mobx-sync';
import {makeObservable, action, observable, computed} from 'mobx';
import {Deginisation} from '../models';
import {DeginisationService} from '../services';

export class DeginisationStore {
  listDeginisation!: Deginisation[];
  listDeginisationCopy!: Deginisation[];
  listDeginisationCount = 0;
  deginisation!: Deginisation;
  checkExitsCode = false;

  constructor() {
    this.listDeginisation = [];
    this.listDeginisationCopy = [];
    this.deginisation = new Deginisation({});
    makeObservable<DeginisationStore, any>(this, {
      listDeginisation: observable,
      listDeginisationCount: observable,
      deginisation: observable,
      checkExitsCode: observable,

      DeginisationService: computed,
      fetchListDeginisation: action,
      updateListDeginisation: action,
      setExitsCode: action,
      updateDescription: action,
      filterDeginisationList: action,
    });
  }

  get DeginisationService() {
    return new DeginisationService();
  }

  fetchListDeginisation(page?, limit?) {
    this.DeginisationService.listDeginisation(page, limit);
  }

  updateListDeginisation(res: any) {
    if (!Array.isArray(res)) {
      if (!res.designations.success) return alert(res.designations.message);
      this.listDeginisation = res.designations.data;
      this.listDeginisationCopy = res.designations.data;
      this.listDeginisationCount = res.designations.paginatorInfo.count;
    } else {
      this.listDeginisation = res;
    }
  }

  filterDeginisationList(res: any) {
    this.listDeginisation = res.filterDesignations.data;
    this.listDeginisationCount = res.filterDesignations.paginatorInfo.count;
  }

  setExitsCode(status: boolean) {
    this.checkExitsCode = status;
  }

  updateDescription = (deginisation: Deginisation) => {
    this.deginisation = deginisation;
  };
}
