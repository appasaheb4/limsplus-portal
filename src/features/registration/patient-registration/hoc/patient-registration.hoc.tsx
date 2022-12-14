import {stores} from '@/stores';
import _ from 'lodash';

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
    stores.patientResultStore.patientResultService.listPatientResultWithLabId({
      labId,
    });
    stores.patientSampleStore.patientSampleService.listPatientSample({
      labId,
    });
  };
}
export const patientRegistrationHoc = new PatientRegistrationHoc();
