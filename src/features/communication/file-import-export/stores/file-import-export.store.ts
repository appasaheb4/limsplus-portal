import {makeObservable, action, observable, computed} from 'mobx';
import {FileImportExport} from '../models';
import {FileImportExportService} from '../services';

export class FileImportExportStore {
  fileImportExport!: FileImportExport;
  fileImportExportList!: FileImportExport[];
  fileImportExportListCount: number;
  defaultValue: {
    transferType: string;
    page: number;
    limit: number;
    count?: number;
  };

  constructor() {
    this.fileImportExport = new FileImportExport({transferType: 'IMPORT_FILE'});
    this.fileImportExportList = [];
    this.fileImportExportListCount = 0;
    this.defaultValue = {
      transferType: 'IMPORT_FILE',
      page: 0,
      limit: 10,
    };

    makeObservable<FileImportExportStore, any>(this, {
      fileImportExport: observable,
      fileImportExportList: observable,
      fileImportExportListCount: observable,
      defaultValue: observable,

      fileImportExportService: computed,
      updateFileImpExport: action,
      updateFileImportExportList: action,
      updateDefaultValue: action,
    });
  }

  get fileImportExportService() {
    return new FileImportExportService();
  }

  updateFileImpExport(data) {
    this.fileImportExport = data;
  }

  updateFileImportExportList(res) {
    this.fileImportExportList = res.fileImportExports.data;
    this.fileImportExportListCount = res.fileImportExports.paginatorInfo.count;
  }
  updateDefaultValue(payload) {
    this.defaultValue = payload;
  }
}
const store = new FileImportExportStore();
