import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.dataConversationStore.dataConversationService.listDataConversation();
  }, 2000);
};

export const resetDataConversation = () => eventEmitter.emit('reload', {});

export default startup;
