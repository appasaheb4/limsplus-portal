import React from "react"
import ReferenceRangesStore from "./referenceRanges-store"

export const Stores = {
    referenceRangesStore: new ReferenceRangesStore()
}
export const Contexts = {
    referenceRangesContext: React.createContext(Stores.referenceRangesStore)
}