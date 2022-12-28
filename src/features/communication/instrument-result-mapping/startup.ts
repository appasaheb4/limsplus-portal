import {stores} from '@/stores';
const startup = async () => {
  stores.instResultMappingStore.instResultMappingService.listInstResultMapping();
};

export default startup;
