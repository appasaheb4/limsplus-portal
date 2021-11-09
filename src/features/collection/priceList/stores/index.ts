import React from "react"
import {PriceListStore} from "./priceList-store"

export const Stores = {
    priceListStore: new PriceListStore()
}
    
export const Contexts = {
    priceListContext: React.createContext(Stores.priceListStore)
}