import {stores} from '@/stores';
const startup = async () => {
  stores.corporateClientsStore.fetchCorporateClients();
  stores.corporateClientsStore.corporateClientsService.counterInvoiceAc();
};

export default startup;
