import {stores} from '@lp/stores';
const startup = async () => {
   stores.environmentStore.fetchEnvironment({documentType:'environmentVariable'})
   stores.environmentStore.fetchEnvironment({documentType:'environmentSettings'})
}   
   
export default startup;  