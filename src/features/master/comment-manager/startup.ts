import {stores} from '@/stores';

const startup = async () => {
  // setTimeout(() => {
  //   stores.libraryStore.fetchLibrary();
  // }, 2000);
};

export const resetCommentManager = () => {
  stores.commentManagerStore.reset();
};

export default startup;
