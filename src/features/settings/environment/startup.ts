import {stores} from '@lp/stores';
const startup = async () => {
   stores.environmentStore.fetchEnvironment({filter:{type:'environmentSettings'}})
}   
   
export default startup;  