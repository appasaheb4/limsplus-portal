import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.corporateClientsStore.fetchCorporateClients();
    stores.corporateClientsStore.corporateClientsService.counterInvoiceAc();
  }, 2000);
};

export const resetCorporateClient = () => {
  stores.corporateClientsStore.reset();
  eventEmitter.emit('reload', {});
};

export default startup;
