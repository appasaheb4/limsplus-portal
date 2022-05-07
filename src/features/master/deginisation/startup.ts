import {Stores} from './stores';
const startup = async () => {
  Stores.deginisationStore.fetchListDeginisation();
};

export default startup;
