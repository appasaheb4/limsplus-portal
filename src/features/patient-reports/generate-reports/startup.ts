import {stores} from '@/stores';
export const startup = async () => {
  stores.patientVisitStore.patientVisitService.filterByLabId({
    input: {filter: {labId: '*'}},
  });
};
