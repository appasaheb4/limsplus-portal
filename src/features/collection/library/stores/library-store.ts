import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import { Library } from "../models"
import * as Services from "../services"

@version(0.1)
class LibraryStore {
  @ignore @observable library!: Library
  @observable listLibrary: Library[] = []
  @observable listLibraryCount: number = 0 
  @ignore @observable checkExistsLabEnvCode?: boolean = false

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

  @action fetchLibrary(page?,limit?) {
    this.libraryService.listLibrary(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listLibrary = res.data.library
      this.listLibraryCount = res.data.count
    })
  }

  @action updateLibrary(library: Library) {
    this.library = library
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExistsLabEnvCode = status
  }
}

export default LibraryStore
