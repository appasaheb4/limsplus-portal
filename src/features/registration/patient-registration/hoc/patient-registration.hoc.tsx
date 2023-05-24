import {stores} from '@/stores';

class PatientRegistrationHoc {
  labIdChanged = async (labId?: number | string) => {
    if (labId != '*') {
      await stores.patientVisitStore.patientVisitService.listPatientVisit({
        documentType: 'patientVisit',
        labId,
      });
      await stores.patientOrderStore.patientOrderService.listPatientOrder({
        documentType: 'patientOrder',
        labId,
      });
      await stores.patientTestStore.patientTestService.listPatientTest({
        labId,
      });
      await stores.patientResultStore.patientResultService.listPatientResultWithLabId(
        {
          labId,
        },
      );
      await stores.patientSampleStore.patientSampleService.listPatientSample({
        labId,
      });
    } else {
      await stores.patientVisitStore.patientVisitService.listPatientVisit({
        documentType: 'patientVisit',
      });
      // patient order
      await stores.patientOrderStore.patientOrderService.listPatientOrder({
        documentType: 'patientOrder',
      });
    }
  };
}
export const patientRegistrationHoc = new PatientRegistrationHoc();
