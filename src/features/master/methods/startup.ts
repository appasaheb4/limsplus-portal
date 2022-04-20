import {Stores} from './stores';
const startup = async () => {
  Stores.methodsStore.fetchMethods();
};

export default startup;
