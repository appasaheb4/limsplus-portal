import {Stores} from './stores';
const startup = async () => {
    Stores.departmentStore.fetchListDepartment();
}

export default startup;