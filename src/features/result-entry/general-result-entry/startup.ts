import {stores} from '@/stores';
const startup = async () => {
  //patient result
  stores.patientResultStore.patientResultService.getPatientResultDistinct();
  if (stores.loginStore.login) {
    stores.patientResultStore.patientResultService.listPatientResult({
      pLab: stores.loginStore.login?.lab,
      resultStatus: 'P',
      testStatus: 'P',
    });
  }
};

export default startup;
