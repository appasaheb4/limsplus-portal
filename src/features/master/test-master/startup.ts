import {Stores} from './stores';
const startup = async () => {
  Stores.testMasterStore.fetchTestMaster();
};

export default startup;
