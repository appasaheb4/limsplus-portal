import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import { Library } from "../models"
import * as Services from "../services"

@version(0.1)
class LibraryStore {
  @ignore @observable library!: Library
  @observable listLibrary: Library[] = []

  constructor() {
    makeAutoObservable(this)
    this.library = {
      ...this.library,
      abNormal: false,
    }
  }

  @computed get libraryService() {
    return new Services.MasterAnalyteService()
  }

  @action fetchLibrary() {
    this.libraryService.listAnalyteMaster().then((res) => {
      this.listLibrary = res
    })
  }

  @action updateLibrary(library: Library) {
    this.library = library
  }
}

export default LibraryStore
