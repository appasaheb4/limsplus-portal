import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.corporateClientsStore.fetchCorporateClients();
    stores.corporateClientsStore.corporateClientsService.counterInvoiceAc();
    stores.masterPanelStore.masterPanelService
      .findByFields({
        input: {
          filter: {
            pLab: stores.loginStore.login?.lab,
          },
        },
      })
      .then(res => {
        if (res.findByFieldsPanelMaster?.success) {
          stores.masterPanelStore.filterPanelMasterList({
            filterPanelMaster: {
              data: res.findByFieldsPanelMaster.data,
              paginatorInfo: {
                count: res.findByFieldsPanelMaster.data?.length,
              },
            },
          });
        }
      });
  }, 2000);
};

export const resetCorporateClient = () => {
  stores.corporateClientsStore.reset();
  eventEmitter.emit('reload', {});
};

export default startup;
