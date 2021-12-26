import { stores } from "@lp/stores"
const startup = async () => {
  // patient manager
  stores.patientManagerStore.patientManagerService.sequencingPid()
  stores.patientManagerStore.patientManagerService.listPatientManager({
    documentType: "patientManager",
  })
  // patient visit
  stores.patientVisitStore.patientVisitService.listPatientVisit({
    documentType: "patientVisit",
  })
  stores.patientVisitStore.patientVisitService.sequencingVisitId()
  // patient order
  stores.patientOrderStore.patientOrderService.sequencingOrderId()
}  

export default startup
