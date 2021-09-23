import {Stores} from './stores';
const startup = async () => {
   Stores.enviromentStore.fetchSessionManagementList()
}   
   
export default startup;  