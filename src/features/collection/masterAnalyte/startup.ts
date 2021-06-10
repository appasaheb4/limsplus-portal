import {Stores} from './stores';
const startup = async () => {
    Stores.masterAnalyteStore.fetchAnalyteMaster()
}

export default startup;