import {stores} from '@/stores';
const startup = async () => {
  stores.fileImportExportStore.fileImportExportService.listFileImportExport();
};

export default startup;
