import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import { Library } from "../models"
import * as Services from "../services"

@version(0.1)
export class LibraryStore {
  @ignore @observable library!: Library
  @observable listLibrary: Library[] 
  @observable listLibraryCount: number 
  @ignore @observable checkExistsLabEnvCode: boolean 
  
  constructor() {
    this.listLibrary = []
    this.listLibraryCount = 0
    this.checkExistsLabEnvCode = false
    this.library = {
      ...this.library,
      abNormal: false,
    }
    makeObservable<LibraryStore, any>(this, {
      library: observable,
      listLibrary: observable,
      listLibraryCount: observable,
      checkExistsLabEnvCode: observable,
    })
  }

  @computed get libraryService() {
    return new Services.MasterAnalyteService()
  }

  @action fetchLibrary(page?,limit?) {
    this.libraryService.listLibrary(page,limit)
  }

  @action updateLibraryList(res: any){
    if (!res.librarys.success) return alert(res.librarys.message)
    this.listLibrary = res.librarys.data
    this.listLibraryCount = res.librarys.paginatorInfo.count
  }

  @action updateLibrary(library: Library) {
    this.library = library
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExistsLabEnvCode = status
  }
}
