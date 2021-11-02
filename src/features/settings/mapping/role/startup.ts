import {Stores} from './stores';
const startup = async () => {
    Stores.roleMappingStore.fetchRoleMappingList();
}   

export default startup;  