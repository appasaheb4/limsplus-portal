import {stores} from '@/stores';
const startup = async () => {
  //patient result
  if (stores.loginStore.login) {
    // filter for default user plab set

    stores.patientResultStore.patientResultService
      .getPatientResultDistinct()
      .then(res => {
        const pLab = stores.loginStore?.login?.lab;
        const testCode =
          res.getPatientResultDistinct.patientResultList[0]?._id?.testCode;

        stores.generalResultEntryStore.updateFilterGeneralResEntry({
          ...stores.generalResultEntryStore.filterGeneralResEntry,
          pLab,
          testCode,
        });
        stores.patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
          {
            pLab,
            testCode,
            finishResult: 'P',
          },
        );
      });
  }
};

export default startup;
