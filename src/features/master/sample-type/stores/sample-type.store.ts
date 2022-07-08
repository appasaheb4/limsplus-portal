import {makeObservable, action, observable, computed} from 'mobx';
import {SampleType} from '../models';
import {SampleTypeService} from '../services';

export class SampleTypeStore {
  listSampleType!: SampleType[];
  listSampleTypeCopy!: SampleType[];
  listSampleTypeCount!: number;
  sampleType!: SampleType;
  checkExitsEnvCode: boolean;

  constructor() {
    this.listSampleType = [];
    this.sampleType = new SampleType({});
    this.checkExitsEnvCode = false;
    this.listSampleTypeCount = 0;

    makeObservable<SampleTypeStore, any>(this, {
      listSampleType: observable,
      listSampleTypeCount: observable,
      sampleType: observable,
      checkExitsEnvCode: observable,

      sampleTypeService: computed,
      fetchSampleTypeList: action,
      updateSampleTypeList: action,
      updateSampleType: action,
      updateExitsEnvCode: action,
      filterSampleTypeList: action,
    });
  }

  get sampleTypeService() {
    return new SampleTypeService();
  }

  fetchSampleTypeList(page?, limit?) {
    this.sampleTypeService.listSampleType(page, limit);
  }

  updateSampleTypeList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.sampleTypes.success) return alert(res.sampleTypes.message);
      this.listSampleType = res.sampleTypes.data;
      this.listSampleTypeCopy = res.sampleTypes.data;
      this.listSampleTypeCount = res.sampleTypes.paginatorInfo.count;
    } else {
      this.listSampleType = res;
    }
  }

  filterSampleTypeList(res: any) {
    this.listSampleType = res.filterSampleTypes.data;
    this.listSampleTypeCount = res.filterSampleTypes.paginatorInfo.count;
  }

  updateSampleType = (sampleType: SampleType) => {
    this.sampleType = sampleType;
  };

  updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status;
  }
}
