import {stores} from '@lp/stores';
const startup = async () => {
   console.log('working');
   
   stores.environmentStore.fetchEnvironment({documentType:'environmentVariable'})
   stores.environmentStore.fetchEnvironment({documentType:'environmentSettings'})
}   
   
export default startup;  