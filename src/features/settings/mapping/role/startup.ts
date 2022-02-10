import {stores} from '@/stores';
const startup = async () => {
    stores.roleMappingStore.fetchRoleMappingList();
}   

export default startup;  