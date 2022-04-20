import {Stores} from './stores';
const startup = async () => {
  Stores.roleStore.fetchListRole();
};

export default startup;
