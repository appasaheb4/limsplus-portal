import {stores} from '@lp/stores';
const startup = async () => {
    stores.roleMappingStore.fetchRoleMappingList();
}   

export default startup;  