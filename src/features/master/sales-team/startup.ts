import {Stores} from './stores';
const startup = async () => {
  Stores.salesTeamStore.fetchSalesTeam();
};

export default startup;
