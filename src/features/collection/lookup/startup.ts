import {Stores} from './stores';
const startup = async () => {
    Stores.lookupStore.fetchListLookup();
}

export default startup;