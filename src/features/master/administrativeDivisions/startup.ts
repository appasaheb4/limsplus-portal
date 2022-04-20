import {Stores} from './stores';
const startup = async () => {
  Stores.administrativeDivStore.fetchAdministrativeDiv();
};

export default startup;
