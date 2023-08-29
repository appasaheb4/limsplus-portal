//import * as localStorage from "@/library/clients/storage-client"
import * as sessionStorage from '@/library/clients/session-client';
class Storage {
  setItem = async (key, value) => {
    await sessionStorage.setItem(key, value);
  };
  getItem = async key => {
    const details = await sessionStorage.getItem(key);
    return details;
  };
  removeItem = async key => {
    await sessionStorage.removeItem(key);
  };
}
export default new Storage();
