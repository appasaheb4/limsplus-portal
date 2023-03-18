import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.salesTeamStore.fetchSalesTeam();
  }, 2000);
};
export const resetSalesTeam = () => eventEmitter.emit('reload', {});

export default startup;
