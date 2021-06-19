import React from "react"

import SampleTypeStore from "./testSampleMapping-store"

export const Stores = {
  sampleTypeStore: new SampleTypeStore(),
}   
   
export const Contexts = {
  sampleTypeContext: React.createContext(Stores.sampleTypeStore),
}
