import {stores} from '@lp/stores'
const startup = async () => {
  stores.dataConversationStore.dataConversationService.listDataConversation()
}  

export default startup
