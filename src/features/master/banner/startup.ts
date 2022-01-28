import {stores} from '@lp/stores';
const startup = async () => {
    stores.bannerStore.fetchListBanner();
}

export default startup;