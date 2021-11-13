import {stores} from '@lp/stores';
const startup = async () => {
   stores.environmentStore.fetchEnvironment({type:'environmentVariable'})
   stores.environmentStore.fetchEnvironment({type:'environmentSettings'})
}   
   
export default startup;  