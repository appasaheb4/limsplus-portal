import {stores} from '@/stores';
import {patientRegistrationHoc} from './hoc';
import {eventEmitter} from '@/core-utils';

export const startupPM = async () => {
  // patient manager
  stores.patientManagerStore.patientManagerService.sequencingPid();
  stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: 'patientManager',
  });
};

export const startupPV = async () => {
  // patient manager
  stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: 'patientManager',
  });
  // patient visit
  stores.patientVisitStore.patientVisitService.listPatientVisit({
    documentType: 'patientVisit',
  });
  stores.patientVisitStore.patientVisitService.sequencingVisitId();
  stores.patientVisitStore.patientVisitService.sequencingLabId();
  startupByLabId();
};

export const startupPO = async () => {
  // patient visit
  stores.patientVisitStore.patientVisitService.listPatientVisit({
    documentType: 'patientVisit',
  });
  // patient order
  stores.patientOrderStore.patientOrderService.listPatientOrder({
    documentType: 'patientOrder',
  });
  stores.patientOrderStore.patientOrderService.sequencingOrderId();
  startupByLabId();
};

export const startupByLabId = async () => {
  const labId = stores.patientRegistrationStore.defaultValues?.labId;
  if (labId && labId !== '*')
    patientRegistrationHoc.labIdChanged(labId as number);
};

const startup = async () => {
  stores.patientVisitStore.patientVisitService.filterByLabId({
    input: {filter: {labId: '*'}},
  });
};

export const resetPatientManager = () => {
  stores.patientManagerStore.reset();
  eventEmitter.emit('reload', {});
  startupPM();
};

export const resetPatientVisit = () => {
  stores.patientVisitStore.reset();
  eventEmitter.emit('reload', {});
  startupPV();
};

export const resetPatientOrder = () => {
  stores.patientOrderStore.reset();
  eventEmitter.emit('reload', {});
  startupPO();
};

export default startup;
