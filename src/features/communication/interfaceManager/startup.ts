import {stores} from '@lp/stores'
const startup = async () => {
  stores.interfaceManagerStore.interfaceManagerService.listInterfaceManager()
}  

export default startup
