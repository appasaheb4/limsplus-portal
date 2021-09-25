import {Stores} from './stores';
const startup = async () => {
   Stores.enviromentStore.fetchEnvironment()
}   
   
export default startup;  