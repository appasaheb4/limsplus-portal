import { stores } from '@/stores';
const startup = async () => {
  //patient result
  if (stores.loginStore.login) {
    // filter for default user plab set
    stores.patientResultStore.patientResultService
      .getPatientResultDistinct()
      .then(res => {
        const pLab = stores.loginStore?.login?.lab;
        stores.generalResultEntryStore.updateFilterGeneralResEntry({
          ...stores.generalResultEntryStore.filterGeneralResEntry,
          pLab,
        });
        stores.patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
          {
            pLab,
            finishResult: 'P',
            panelStatus: 'P',
            testStatus: 'P',
            isSingleLabId: true,
          },
        );
      });
  }
};

export default startup;
