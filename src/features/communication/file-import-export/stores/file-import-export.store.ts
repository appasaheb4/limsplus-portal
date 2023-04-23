import {makeObservable, action, observable, computed} from 'mobx';
import {FileImportExport} from '../models';
import {FileImportExportService} from '../services';

export class FileImportExportStore {
  inputFileImportExportList!: FileImportExport[];
  fileImportExportList!: FileImportExport[];
  fileImportExportListCount: number;

  constructor() {
    this.inputFileImportExportList = [];
    this.fileImportExportList = [];
    this.fileImportExportListCount = 0;

    makeObservable<FileImportExportStore, any>(this, {
      inputFileImportExportList: observable,
      fileImportExportList: observable,
      fileImportExportListCount: observable,

      fileImportExportService: computed,
      updateFileImportExportList: action,
    });
  }

  get fileImportExportService() {
    return new FileImportExportService();
  }

  updateInputFileImpExport(data) {
    this.inputFileImportExportList = data;
  }

  updateFileImportExportList(res) {
    this.fileImportExportList = res.clientRegistrationList.data;
    this.fileImportExportListCount =
      res.clientRegistrationList.paginatorInfo.count;
  }
}
