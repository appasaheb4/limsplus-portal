import {stores} from '@/stores';
import {patientRegistrationHoc} from './hoc';
import {eventEmitter} from '@/core-utils';

export const startupPM = async () => {
  // patient manager
  // stores.patientManagerStore.patientManagerService.sequencingPid();
  await stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: 'patientManager',
  });
};

export const startupPV = async () => {
  // patient manager
  await startupPM();
  // stores.patientVisitStore.patientVisitService.sequencingVisitId();
  await stores.patientVisitStore.patientVisitService.sequencingLabId();
  await startupByLabId();
};

export const startupPO = async () => {
  //stores.patientOrderStore.patientOrderService.sequencingOrderId();
  await startupByLabId();
};

export const startupByLabId = async () => {
  const labId = stores.patientRegistrationStore.defaultValues?.labId;
  await patientRegistrationHoc.labIdChanged(labId as number);
};

const startup = async () => {
  // await stores.patientVisitStore.patientVisitService.filterByLabId({
  //   input: {
  //     filter: {
  //       labId: '*',
  //     },
  //   },
  // });
  await stores.patientManagerStore.patientManagerService.getFilterOptionList({
    input: {
      filter: {
        pId: '*',
        labId: '*',
        mobileNo: '*',
      },
    },
  });
  await stores.patientManagerStore.patientManagerService.getPatientRegRecords({
    input: {},
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
