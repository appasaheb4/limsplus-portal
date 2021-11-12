import {stores} from '@lp/stores';
const startup = async () => {
   stores.noticeBoardStore.fetchNoticeBoards();
}   
   
export default startup;  