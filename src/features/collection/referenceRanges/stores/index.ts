import React from "react"
import {RefernceRangesStore} from "./referenceRanges-store"

export const Stores = {
    referenceRangesStore: new RefernceRangesStore()
}
export const Contexts = {
    referenceRangesContext: React.createContext(Stores.referenceRangesStore)
}