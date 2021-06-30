import { Stores } from "./stores"
const startup = async () => {
  Stores.corporateClientsStore.fetchCorporateClients()
}
   
export default startup
