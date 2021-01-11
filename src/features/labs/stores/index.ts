import React from "react";
import LabStore from "./lab-store";

const labStore = new LabStore();
labStore.fetchListLab();

export default React.createContext(labStore);
