import {Stores} from './stores';
const startup = async () => {
  Stores.masterPackageStore.fetchPackageMaster();
};

export default startup;
