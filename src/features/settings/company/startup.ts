import { stores } from '@/stores';
import { eventEmitter } from '@/core-utils';
const startup = async () => {
  setTimeout(() => {
    stores.companyStore.companyService.list();
  }, 2000);
};

export const resetCompany = () => {
  stores.companyStore.reset();
  eventEmitter.emit('reload', {});
};

export default startup;
