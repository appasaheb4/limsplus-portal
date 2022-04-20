import {Stores} from './stores';
const startup = async () => {
  Stores.possibleResultsStore.fetchListPossibleResults();
};

export default startup;
