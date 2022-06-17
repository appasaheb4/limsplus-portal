import {makeObservable, action, observable, computed} from 'mobx';
import {Library} from '../models';
import {MasterAnalyteService} from '../services';

export class LibraryStore {
  library!: Library;
  listLibrary: Library[];
  listLibraryCopy: Library[];
  listLibraryCount: number;
  checkExistsLabEnvCode: boolean;

  constructor() {
    this.listLibrary = [];
    this.listLibraryCopy = [];
    this.listLibraryCount = 0;
    this.checkExistsLabEnvCode = false;
    this.library = {
      ...this.library,
      abNormal: false,
    };
    makeObservable<LibraryStore, any>(this, {
      library: observable,
      listLibrary: observable,
      listLibraryCount: observable,
      checkExistsLabEnvCode: observable,
      listLibraryCopy: observable,

      libraryService: computed,
      fetchLibrary: action,
      updateLibraryList: action,
      updateLibrary: action,
      updateExistsLabEnvCode: action,
    });
  }

  get libraryService() {
    return new MasterAnalyteService();
  }

  fetchLibrary(page?, limit?) {
    this.libraryService.listLibrary(page, limit);
  }

  updateLibraryList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.librarys.success) return alert(res.librarys.message);
      this.listLibrary = res.librarys.data;
      this.listLibraryCopy = res.librarys.data;
      this.listLibraryCount = res.librarys.paginatorInfo.count;
    } else {
      this.listLibrary = res;
    }
  }

  filterLibraryList(res: any) {
    this.listLibrary = res.filterLibrarys.data;
    this.listLibraryCount = res.filterLibrarys.paginatorInfo.count;
  }

  updateLibrary(library: Library) {
    this.library = library;
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExistsLabEnvCode = status;
  };
}
