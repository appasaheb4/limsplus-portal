import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.noticeBoardStore.fetchNoticeBoards();
  }, 2000);
};

export const resetNoticeBoard = () => eventEmitter.emit('reload', {});

export default startup;
