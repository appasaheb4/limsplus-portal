import {stores} from '@/stores';

const startup = async () => {
  stores.commentManagerStore.commentManagerService.list();
};

export const resetCommentManager = () => {
  stores.commentManagerStore.reset();
};

export default startup;
