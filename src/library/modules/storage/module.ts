//import * as localStorage from "@/library/clients/storage-client"
import * as sessionStorage from '@/library/clients/session-client';
class Storage {
  setItem = async (key, value) => {
    await sessionStorage.setItem(key, value);
  };
  getItem = async (key): Promise<any> => {
    return await sessionStorage.getItem(key);
  };
  removeItem = async key => {
    await sessionStorage.removeItem(key);
  };
}
export default new Storage();
