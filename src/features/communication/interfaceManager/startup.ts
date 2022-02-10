import {stores} from '@/stores'
const startup = async () => {
  stores.interfaceManagerStore.interfaceManagerService.listInterfaceManager()
}  

export default startup
