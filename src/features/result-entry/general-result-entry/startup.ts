import {stores} from '@/stores';
const startup = async () => {
  //patient result
  if (stores.loginStore.login) {
    stores.patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
      {
        pLab: stores.loginStore.login?.lab,
        // resultStatus: 'P',
        // testStatus: 'P',
        finishResult: 'P',
      },
    );
    stores.patientResultStore.patientResultService.getPatientResultDistinct();
  }
};

export default startup;
