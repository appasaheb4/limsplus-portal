import {Stores} from './stores';
const startup = async () => {
  Stores.priceListStore.fetchListPriceList();
};

export default startup;
