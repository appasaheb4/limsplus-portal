import {makeObservable, action, observable, computed} from 'mobx';
import {InstResultMapping} from '../models';
import {InstResultMappingService} from '../services';

export class InstResultMappingStore {
  instResultMapping!: InstResultMapping[];
  instResultMappingList: InstResultMapping[];
  instResultMappingListCount: number;

  constructor() {
    this.instResultMapping = [{index: 1, environment: 'P'}];
    this.instResultMappingList = [];
    this.instResultMappingListCount = 0;

    makeObservable<InstResultMappingStore, any>(this, {
      instResultMapping: observable,
      instResultMappingList: observable,
      instResultMappingListCount: observable,

      instResultMappingService: computed,
      updateInstResultMapping: action,
      updateInstResultMappingList: action,
    });
  }

  get instResultMappingService() {
    return new InstResultMappingService();
  }

  updateInstResultMapping(res) {
    this.instResultMapping = res;
  }

  updateInstResultMappingList(res) {
    this.instResultMappingList = res.instrumentResultMappings.data;
    this.instResultMappingListCount =
      res.instrumentResultMappings.paginatorInfo.count;
  }
}
