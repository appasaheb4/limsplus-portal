import { stores } from "@lp/stores"
const startup = async () => {
  stores.patientManagerStore.patientManagerService.sequencingPid()
  stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: "patientManager",
  })
  stores.patientVisitStore.patientVisitService.listPatientVisit({
    documentType: "patientVisit",
  })
  stores.patientVisitStore.patientVisitService.sequencingVisitId()
}

export default startup
