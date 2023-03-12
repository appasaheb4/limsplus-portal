import {makeObservable, action, observable, computed} from 'mobx';
import {TestSampleMapping, LocalInput} from '../models';
import {TestSampleMappingService} from '../services';

export class TestSampleMappingStore {
  listTestSampleMapping: TestSampleMapping[];
  listTestSampleMappingCount: number;
  localInput!: LocalInput;
  testSampleMapping!: TestSampleMapping;
  checkExitsTestSampleEnvCode: boolean;
  departments: any;

  constructor() {
    this.listTestSampleMapping = [];
    this.listTestSampleMappingCount = 0;
    this.checkExitsTestSampleEnvCode = false;
    this.localInput = new LocalInput({});
    this.departments = undefined;
    this.testSampleMapping = {
      ...this.testSampleMapping,
      primaryContainer: false,
      uniqueContainer: false,
      centerIfuge: false,
      aliquot: false,
      labSpecfic: false,
      departmentSpecfic: false,
      sharedSample: false,
      printLabels: false,
    };
    this.reset();
    makeObservable<TestSampleMappingStore, any>(this, {
      listTestSampleMapping: observable,
      listTestSampleMappingCount: observable,
      testSampleMapping: observable,
      checkExitsTestSampleEnvCode: observable,
      departments: observable,
      localInput: observable,

      testSampleMappingService: computed,
      fetchSampleTypeList: action,
      updateTestSampleMappingList: action,
      updateSampleType: action,
      updateLocalInput: action,
      updateExitsTestSampleEnvCode: action,
      filterTestSampleMappingList: action,
      updateDepartments: action,
      reset: action,
    });
  }

  reset() {
    this.testSampleMapping = new TestSampleMapping({});
    this.listTestSampleMapping = [];
    this.listTestSampleMappingCount = 0;
    this.testSampleMapping = {
      ...this.testSampleMapping,
      primaryContainer: false,
      uniqueContainer: false,
      centerIfuge: false,
      aliquot: false,
      labSpecfic: false,
      departmentSpecfic: false,
      sharedSample: false,
      printLabels: false,
    };
  }

  get testSampleMappingService() {
    return new TestSampleMappingService();
  }

  fetchSampleTypeList(page?, limit?) {
    this.testSampleMappingService.listTestSampleMapping(page, limit);
  }

  updateTestSampleMappingList(res: any) {
    if (!res.testSampleMappings.success)
      return alert(res.testSampleMappings.message);
    this.listTestSampleMapping = res.testSampleMappings.data;
    this.listTestSampleMappingCount =
      res.testSampleMappings.paginatorInfo.count;
  }

  filterTestSampleMappingList(res: any) {
    this.listTestSampleMapping = res.filterTestSampleMappings.data;
    this.listTestSampleMappingCount =
      res.filterTestSampleMappings.paginatorInfo.count;
  }

  updateSampleType = (sampleMapping: TestSampleMapping) => {
    this.testSampleMapping = sampleMapping;
  };

  updateExitsTestSampleEnvCode = (status: boolean) => {
    this.checkExitsTestSampleEnvCode = status;
  };

  updateDepartments = (department: any) => {
    this.departments = department;
  };
  updateLocalInput(input: LocalInput) {
    this.localInput = input;
  }
}
