import { Stores } from "./stores"
const startup = async () => {
  Stores.registrationLocationsStore.fetchRegistrationLocations()
}
   
export default startup
