import {Stores} from './stores';
const startup = async () => {
  Stores.sectionStore.fetchSections();
};

export default startup;
