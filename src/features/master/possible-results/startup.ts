import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.possibleResultsStore.fetchListPossibleResults();
  }, 2000);
};

export const resetPossibleResult = () => eventEmitter.emit('reload', {});

export default startup;
