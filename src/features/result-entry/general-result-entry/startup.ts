import { stores } from '@/stores';
const startup = async () => {
  //patient result
  if (stores.loginStore.login) {
    const pLab = stores.loginStore?.login?.lab;
    // filter for default user plab set
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
      },
    );
  }
};

export default startup;
