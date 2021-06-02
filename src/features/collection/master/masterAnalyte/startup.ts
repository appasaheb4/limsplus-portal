import {Stores} from './stores';
const startup = async () => {
    Stores.labStore.fetchListLab();
}

export default startup;