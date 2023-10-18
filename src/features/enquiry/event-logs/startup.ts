import { stores } from '@/stores';
const startup = async () => {
  stores.eventLogsStore.eventLogsService.listEventLogs();
};
export default startup;
