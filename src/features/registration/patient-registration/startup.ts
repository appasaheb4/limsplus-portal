import {stores} from '@/stores';
import {patientRegistrationHoc} from './hoc';
const startup = async () => {
  // patient manager
  stores.patientManagerStore.patientManagerService.sequencingPid();
  stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: 'patientManager',
  });
  // patient visit
  stores.patientVisitStore.patientVisitService.listPatientVisit({
    documentType: 'patientVisit',
  });
  stores.patientVisitStore.patientVisitService.sequencingVisitId();
  stores.patientVisitStore.patientVisitService.sequencingLabId();
  stores.patientVisitStore.patientVisitService.filterByLabId({
    input: {filter: {labId: '*'}},
  });
  // patient order
  stores.patientOrderStore.patientOrderService.listPatientOrder({
    documentType: 'patientOrder',
  });
  stores.patientOrderStore.patientOrderService.sequencingOrderId();

  const labId = stores.patientRegistrationStore.defaultValues?.labId;
  if (labId && labId !== '*')
    patientRegistrationHoc.labIdChanged(labId as number);
};

export default startup;
