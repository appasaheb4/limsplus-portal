import {stores} from '@/stores';
import {Banner} from './screens';
import {useHistory} from 'react-router-dom';

const startup = async () => {
  stores.bannerStore.fetchListBanner();
};

export const resetBanner = async () => {
  stores.bannerStore.reset();

  stores.bannerStore.fetchListBanner();
};
export default startup;
