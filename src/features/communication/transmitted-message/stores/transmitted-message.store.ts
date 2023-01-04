import {makeObservable, action, observable, computed} from 'mobx';
import {TransmittedMessage} from '../models';
import {TransmittedMessageService} from '../services';

export class TransmittedMessageStore {
  transmittedMessageList: TransmittedMessage[];
  transmittedMessageListCount: number;

  constructor() {
    this.transmittedMessageList = [];
    this.transmittedMessageListCount = 0;

    makeObservable<TransmittedMessageStore, any>(this, {
      transmittedMessageList: observable,
      transmittedMessageListCount: observable,

      transmittedMessageService: computed,
      updateTransmittedMessageList: action,
    });
  }

  get transmittedMessageService() {
    return new TransmittedMessageService();
  }

  updateTransmittedMessageList(res) {
    this.transmittedMessageList = res.transmittedMessages.data;
    this.transmittedMessageListCount =
      res.transmittedMessages.paginatorInfo.count;
  }
}
