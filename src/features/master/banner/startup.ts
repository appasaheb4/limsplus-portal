import {stores} from '@/stores';
const startup = async () => {
  stores.bannerStore.fetchListBanner();
};

export default startup;
