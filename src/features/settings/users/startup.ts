import {Stores} from './stores';
const startup = async () => {
  Stores.userStore.loadUser();
};

export default startup;
