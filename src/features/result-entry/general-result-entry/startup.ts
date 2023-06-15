import {stores} from '@/stores';
const startup = async () => {
  //patient result
  if (stores.loginStore.login) {
    stores.patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
      {
        pLab: stores.loginStore.login?.lab,
        finishResult: 'P',
      },
    );
    // filter for default user plab set
    stores.generalResultEntryStore.updateFilterGeneralResEntry({
      ...stores.generalResultEntryStore.filterGeneralResEntry,
      pLab: stores.loginStore?.login?.lab,
    });
    stores.patientResultStore.patientResultService.getPatientResultDistinct();
  }
};

export default startup;
