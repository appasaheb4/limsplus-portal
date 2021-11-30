import {stores} from '@lp/stores';
const startup = async () => {
     stores.lookupStore.fetchListLookup();
}   

export default startup;