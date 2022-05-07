import {stores} from '@/stores';
const startup = async () => {
  stores.dataConversationStore.dataConversationService.listDataConversation();
};

export default startup;
