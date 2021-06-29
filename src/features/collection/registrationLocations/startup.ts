import { Stores } from "./stores"
const startup = async () => {
  Stores.registrationLocationsStore.fetchDoctors()
}
   
export default startup
