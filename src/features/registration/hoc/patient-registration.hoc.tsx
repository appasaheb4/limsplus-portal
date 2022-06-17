import {stores} from '@/stores';
import _ from 'lodash';
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
    stores.patientResultStore.patientResultService.listPatientResultWithLabId({
      labId,
    });
    stores.patientSampleStore.patientSampleService.listPatientSample({
      labId,
    });
    // const patientVisit = _.first(
    //   stores.patientVisitStore.listPatientVisit.filter(
    //     item => item.labId === labId,
    //   ),
    // );
    // stores.patientOrderStore.updatePatientOrder({
    //   ...stores.patientOrderStore.patientOrder,
    //   visitId: patientVisit?.visitId,
    //   labId: patientVisit?.labId,
    //   rLab: patientVisit?.rLab,
    //   patientName: patientVisit?.patientName,
    // });
    // await hydrateStore(
    //   'patientRegistrationStore',
    //   stores.patientRegistrationStore,
    // );
  };
}
export const patientRegistrationHoc = new PatientRegistrationHoc();
