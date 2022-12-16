import {makeObservable, action, observable, computed} from 'mobx';
import {HostCommunication} from '../models';
import {ConvertTo} from '../../models';
import {InterfaceManager} from '../../interface-manager/models';
import {HostCommunicationService} from '../services';

export class HostCommunicationStore {
  hostCommuication!: HostCommunication;
  convertTo!: ConvertTo;
  selectedInterfaceManager?: InterfaceManager;
  constructor() {
    this.hostCommuication = new HostCommunication({
      modeOfConnection: 'TCP/IP Communication',
      tcpipCommunication: {
        host: '192.168.1.3',
        port: 1009,
      },
    });
    this.convertTo = new ConvertTo({});
    this.selectedInterfaceManager = new InterfaceManager({});
    makeObservable<HostCommunicationStore, any>(this, {
      hostCommuication: observable,
      convertTo: observable,
      selectedInterfaceManager: observable,

      hostCommunicationService: computed,
      updateHostCommuication: action,
      updateConvertTo: action,
      updateSelectedInterfaceManager: action,
    });
  }

  get hostCommunicationService() {
    return new HostCommunicationService();
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
