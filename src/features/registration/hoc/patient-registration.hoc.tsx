/* eslint-disable react-hooks/rules-of-hooks */
import {stores} from '@/stores';
//import hydrateStore from '@/library/modules/startup';

class PatientRegistrationHoc {
  labIdChanged = async (labId?: number) => {
    stores.patientVisitStore.patientVisitService.listPatientVisit({
      documentType: 'patientVisit',
      labId,
    });
    stores.patientOrderStore.patientOrderService.listPatientOrder({
      documentType: 'patientOrder',
      labId,
    });
    stores.patientTestStore.patientTestService.listPatientTest({
      labId,
    });
    stores.patientResultStore.patientResultService.listPatientResult({
      labId,
    });
    stores.patientSampleStore.patientSampleService.listPatientSample({
      labId,
    });
    // await hydrateStore(
    //   'patientRegistrationStore',
    //   stores.patientRegistrationStore,
    // );
  };
}
export const patientRegistrationHoc = new PatientRegistrationHoc();
