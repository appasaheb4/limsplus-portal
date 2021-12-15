import { stores } from "@lp/stores"
const startup = async () => {
  stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: "patientManager"
  })  
  stores.patientManagerStore.patientManagerService.sequencingPid();
}

export default startup
