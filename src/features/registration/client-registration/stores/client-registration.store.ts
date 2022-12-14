import {makeObservable, action, observable, computed} from 'mobx';
import {ClientRegistration} from '../models';
import {ClientRegistrationService} from '../services';

export class SegmentMappingStore {
  clientRegistration!: ClientRegistration[];
  clientRegistrationList: ClientRegistration[];
  clientRegistrationCount: number;

  constructor() {
    this.clientRegistration = [];
    this.clientRegistrationList = [];
    this.clientRegistrationCount = 0;

    makeObservable<SegmentMappingStore, any>(this, {
      clientRegistration: observable,
      clientRegistrationList: observable,
      clientRegistrationCount: observable,

      clientRegistrationService: computed,
    });
  }

  get clientRegistrationService() {
    return new ClientRegistrationService();
  }
}
