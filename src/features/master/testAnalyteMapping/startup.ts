import {Stores} from './stores';
const startup = async () => {
  Stores.testAnalyteMappingStore.fetchTestAnalyteMapping();
};

export default startup;
