import {stores} from '@/stores';
const startup = async () => {
  //patient result
  stores.patientResultStore.patientResultService.getPatientResultDistinct();
  stores.patientResultStore.patientResultService.listPatientResult();
};

export default startup;
