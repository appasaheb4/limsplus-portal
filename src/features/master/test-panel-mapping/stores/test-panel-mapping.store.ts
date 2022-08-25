import {version} from 'mobx-sync';
import {makeObservable, action, observable, computed} from 'mobx';
import {TestPanelMapping, SelectedItems} from '../models';
import {TestPanelMappingService} from '../services';
import dayjs from 'dayjs';

export class TestPanelMappingStore {
  testPanelMapping!: TestPanelMapping;
  listTestPanelMapping: TestPanelMapping[];
  listTestPanelMappingCount: number;
  checkExitsLabEnvCode!: boolean;
  selectedItems!: SelectedItems;

  constructor() {
    this.listTestPanelMapping = [];
    this.selectedItems = new SelectedItems({});
    this.listTestPanelMappingCount = 0;
    this.checkExitsLabEnvCode = false;
    this.testPanelMapping = {
      ...this.testPanelMapping,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
      bill: false,
      printTestName: false,
      printPanelName: true,
      panelMethod: true,
      testMethod: false,
      analyteMethod: false,
      panelInterpretation: true,
      testInterpretation: false,
      analyteInterpretation: true,
    };
    makeObservable<TestPanelMappingStore, any>(this, {
      testPanelMapping: observable,
      listTestPanelMapping: observable,
      listTestPanelMappingCount: observable,
      checkExitsLabEnvCode: observable,
      selectedItems: observable,

      testPanelMappingService: computed,
      fetchTestPanelMapping: action,
      updateTestPanelMappingList: action,
      updateTestPanelMapping: action,
      updateExistsLabEnvCode: action,
      filterTestPanelMappingList: action,
    });
  }

  get testPanelMappingService() {
    return new TestPanelMappingService();
  }

  fetchTestPanelMapping(page?, limit?) {
    this.testPanelMappingService.listTestPanelMapping(page, limit);
  }

  updateTestPanelMappingList(res: any) {
    if (!res.testPanelMappings.success)
      return alert(res.testPanelMappings.message);
    this.listTestPanelMapping = res.testPanelMappings.data;
    this.listTestPanelMappingCount = res.testPanelMappings.paginatorInfo.count;
  }

  filterTestPanelMappingList(res: any) {
    this.listTestPanelMapping = res.filterTestPanelMappings.data;
    this.listTestPanelMappingCount =
      res.filterTestPanelMappings.paginatorInfo.count;
  }

  updateTestPanelMapping(testPanel: TestPanelMapping) {
    this.testPanelMapping = testPanel;
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status;
  };

  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items;
    else this.selectedItems = new SelectedItems({});
  }
}
