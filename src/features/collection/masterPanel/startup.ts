import {Stores} from './stores';
const startup = async () => {
    Stores.masterPanelStore.fetchPanelMaster();
}

export default startup;