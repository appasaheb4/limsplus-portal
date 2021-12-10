import { stores } from "@lp/stores"
const startup = async () => {
  stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: "patientManager"
  })
}

export default startup
