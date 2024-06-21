import { stores } from '@/stores';
// import {patientRegistrationHoc} from './hoc';
import { eventEmitter } from '@/core-utils';

export const startupPM = async () => {
  // patient manager
  await stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: 'patientManager',
  });
};

export const startupPV = async () => {
  // patient manager
  await startupPM();
  await stores.patientVisitStore.patientVisitService.sequencingLabId();
  await startupByLabId();
};

export const startupPO = async () => {
  await startupByLabId();
};

export const startupByLabId = async () => {
  const labId = stores.patientRegistrationStore.defaultValues?.labId;
  //await patientRegistrationHoc.labIdChanged(labId as number);
};

const startup = async () => {
  await stores.patientRegistrationStore.reload();
  stores.patientResultStore.patientResultService.getPatientResultDistinct();
};

export const resetPatientManager = () => {
  stores.patientManagerStore.reset();
  eventEmitter.emit('reload', {});
  eventEmitter.emit('pmReload', {});
  startupPM();
};

export const resetPatientVisit = () => {
  stores.patientVisitStore.reset();
  eventEmitter.emit('reload', {});
  eventEmitter.emit('pvReload', {});
  startupPV();
};

export const resetPatientOrder = () => {
  stores.patientOrderStore.reset();
  eventEmitter.emit('reload', {});
  eventEmitter.emit('poReload', {});
  startupPO();
};

export default startup;
