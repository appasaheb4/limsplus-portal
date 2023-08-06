import {makeObservable, action, observable, computed} from 'mobx';
import {Library} from '../models';
import {MasterAnalyteService} from '../services';
import dayjs from 'dayjs';

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
    this.reset();
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
      reset: action,
    });
  }

  get libraryService() {
    return new MasterAnalyteService();
  }

  reset() {
    this.library = new Library({});
    this.listLibrary = [];
    this.listLibraryCount = 0;
    this.library = {
      ...this.library,
      lab: 'Default',
      department: 'Default',
      editable: false,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
      ),
      versions: 1,
    };
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
