import {makeObservable, action, observable, computed} from 'mobx';
import {TestAnalyteMapping, SelectedItems} from '../models';
import {TestAnalyteMappingService} from '../services';
import dayjs from 'dayjs';

export class TestAnalyteMappingStore {
  testAnalyteMapping!: TestAnalyteMapping;
  listTestAnalyteMapping!: TestAnalyteMapping[];
  listTestAnalyteMappingCopy!: TestAnalyteMapping[];
  listTestAnalyteMappingCount: number = 0;
  checkExitsLabEnvCode?: boolean = false;
  selectedItems!: SelectedItems;

  constructor() {
    this.listTestAnalyteMapping = [];
    this.listTestAnalyteMappingCopy = [];
    this.selectedItems = new SelectedItems({});
    this.reset();
    makeObservable<TestAnalyteMappingStore, any>(this, {
      testAnalyteMapping: observable,
      listTestAnalyteMapping: observable,
      listTestAnalyteMappingCopy: observable,
      listTestAnalyteMappingCount: observable,
      checkExitsLabEnvCode: observable,
      selectedItems: observable,

      testAnalyteMappingService: computed,
      fetchTestAnalyteMapping: action,
      updateTestAnalyteMappingList: action,
      updateTestAnalyteMapping: action,
      updateExistsLabEnvCode: action,
      filterTestAnalyteMappingList: action,
      reset: action,
    });
  }
  reset() {
    this.testAnalyteMapping = new TestAnalyteMapping({});
    this.listTestAnalyteMapping = [];
    this.listTestAnalyteMappingCount = 0;
    this.selectedItems = new SelectedItems({});
    this.testAnalyteMapping = {
      ...this.testAnalyteMapping,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
      bill: false,
      testMethod: true,
      analyteMethod: false,
    };
  }
  get testAnalyteMappingService() {
    return new TestAnalyteMappingService();
  }

  fetchTestAnalyteMapping(page?, limit?) {
    this.testAnalyteMappingService.listTestAnalyteMapping(page, limit);
  }

  updateTestAnalyteMappingList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.testAnalyteMappings.success)
        return alert(res.testAnalyteMappings.message);
      this.listTestAnalyteMapping = res.testAnalyteMappings.data;
      this.listTestAnalyteMappingCopy = res.testAnalyteMappings.data;
      this.listTestAnalyteMappingCount =
        res.testAnalyteMappings.paginatorInfo.count;
    } else {
      this.listTestAnalyteMapping = res;
    }
  }

  filterTestAnalyteMappingList(res: any) {
    this.listTestAnalyteMapping = res.filterTestAnalyteMappings.data;
    this.listTestAnalyteMappingCount =
      res.filterTestAnalyteMappings.paginatorInfo.count;
  }

  updateTestAnalyteMapping(testAnalyte: TestAnalyteMapping) {
    this.testAnalyteMapping = testAnalyte;
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status;
  };
  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items;
    else this.selectedItems = new SelectedItems({});
  }
}
