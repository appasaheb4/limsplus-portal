import {AsyncTrunk} from 'mobx-sync';
//import * as localStorage from "@/library/clients/storage-client"
import * as sessionStorage from '@/library/clients/session-client';

const hydrateStore = async (key: string, storeInstance: any) => {
  try {
    const trunk = new AsyncTrunk(storeInstance, {
      storage: sessionStorage as any,
      storageKey: `__persist_mobx_stores_${key}__`,
      delay: 1e3,
    });
    await trunk.init();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default hydrateStore;
