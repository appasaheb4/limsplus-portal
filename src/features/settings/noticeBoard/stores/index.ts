import React from "react"

import NoticeBoardStore from "./noticeBoard-store"

export const Stores = {
  noticeBoardStore: new NoticeBoardStore(),
}
  
export const Contexts = {
  noticeBoardContext: React.createContext(Stores.noticeBoardStore),
}
