import {makeObservable, action, observable, computed} from 'mobx';

export class GenerateReportsStore {
  constructor() {
    makeObservable<GenerateReportsStore, any>(this, {});
  }
}
