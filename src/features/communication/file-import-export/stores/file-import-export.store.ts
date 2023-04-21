import {makeObservable, action, observable, computed} from 'mobx';
import {FileImportExport} from '../models';
import {FileImportExportService} from '../services';

export class FileImportExportStore {
  fileImportExportList!: FileImportExport[];
  fileImportExportListCount: number;

  constructor() {
    this.fileImportExportList = [];
    this.fileImportExportListCount = 0;

    makeObservable<FileImportExportStore, any>(this, {
      fileImportExportList: observable,
      fileImportExportListCount: observable,

      fileImportExportService: computed,
      updateFileImportExportList: action,
    });
  }

  get fileImportExportService() {
    return new FileImportExportService();
  }

  updateFileImportExportList(res) {
    this.fileImportExportList = res.clientRegistrationList.data;
    this.fileImportExportListCount =
      res.clientRegistrationList.paginatorInfo.count;
  }
}
