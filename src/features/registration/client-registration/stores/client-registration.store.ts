import {makeObservable, action, observable, computed} from 'mobx';
import {ClientRegistration} from '../models';
import {ClientRegistrationService} from '../services';

export class ClientRegistrationStore {
  clientRegistration!: ClientRegistration[];
  clientRegistrationList: ClientRegistration[];
  clientRegistrationCount: number;

  constructor() {
    this.clientRegistration = [];
    this.clientRegistrationList = [];
    this.clientRegistrationCount = 0;

    makeObservable<ClientRegistrationStore, any>(this, {
      clientRegistration: observable,
      clientRegistrationList: observable,
      clientRegistrationCount: observable,

      clientRegistrationService: computed,
      updateClientRegistrationList: action,
    });
  }

  get clientRegistrationService() {
    return new ClientRegistrationService();
  }

  updateClientRegistrationList(res) {
    this.clientRegistrationList = res.clientRegistrationList.data;
    this.clientRegistrationCount =
      res.clientRegistrationList.paginatorInfo.count;
  }
}
