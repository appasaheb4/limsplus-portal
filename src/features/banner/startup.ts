import {Stores} from './stores';
const startup = async () => {
    console.log('fecth banner startup');
    
    Stores.bannerStore.fetchListBanner();
}

export default startup;