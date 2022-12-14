import {stores} from '@/stores';
const startup = async () => {
  stores.clientRegistrationStore.clientRegistrationService.list();
};

export default startup;
