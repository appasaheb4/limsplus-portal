import {makeObservable, action, observable} from 'mobx';
import {HostCommunication} from '../models';
import {ConvertTo} from '../../models';
import {InterfaceManager} from '../../interface-manager/models';

export class HostCommunicationStore {
  hostCommuication!: HostCommunication;
  convertTo!: ConvertTo;
  selectedInterfaceManager?: InterfaceManager;
  constructor() {
    makeObservable<HostCommunicationStore, any>(this, {
      hostCommuication: observable,
      convertTo: observable,
      selectedInterfaceManager: observable,

      updateHostCommuication: action,
      updateConvertTo: action,
      updateSelectedInterfaceManager: action,
    });
  }

  updateHostCommuication = (hostCommunication: HostCommunication) => {
    this.hostCommuication = hostCommunication;
  };
  updateConvertTo(convertTo: ConvertTo) {
    this.convertTo = convertTo;
  }
  updateSelectedInterfaceManager(interfaceManager: InterfaceManager) {
    this.selectedInterfaceManager = interfaceManager;
  }
}
