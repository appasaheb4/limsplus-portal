import {makeAutoObservable, computed} from 'mobx';
import * as Services from '../services';

class AssetsStore {
  constructor() {
    makeAutoObservable(this);
  }
  @computed get AssetsService() {
    return new Services.AssetsService();
  }
}

export default AssetsStore;
