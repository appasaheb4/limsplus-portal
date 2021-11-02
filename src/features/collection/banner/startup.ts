import {Stores} from './stores';
const startup = async () => {
    Stores.bannerStore.fetchListBanner();
}

export default startup;