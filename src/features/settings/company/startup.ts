import { stores } from '@/stores';
// import { eventEmitter } from '@/core-utils';
const startup = async () => {
  setTimeout(() => {
    stores.companyStore.companyService.listAllBanner();
  }, 2000);
};

// export const resetBanner = () => {
//   stores.bannerStore.reset();
//   eventEmitter.emit('reload', {});
// };

export default startup;
