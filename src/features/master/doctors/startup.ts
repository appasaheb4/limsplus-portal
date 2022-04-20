import {Stores} from './stores';
const startup = async () => {
  Stores.doctorsStore.fetchDoctors();
};

export default startup;
