import {Stores} from './stores';
const startup = async () => {
  Stores.libraryStore.fetchLibrary();
};

export default startup;
