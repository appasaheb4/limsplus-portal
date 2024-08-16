import { stores } from '@/stores';
export const startupBillSummary = async () => {
  stores.billSummaryStore.billSummaryService.listBillSummary();
};
