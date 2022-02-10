import {stores} from '@/stores';
const startup = async () => {
   stores.noticeBoardStore.fetchNoticeBoards();
}   
   
export default startup;  