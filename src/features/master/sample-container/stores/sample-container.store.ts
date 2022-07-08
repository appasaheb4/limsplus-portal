import {makeObservable, action, observable, computed} from 'mobx';
import {SampleContainer} from '../models';
import {SampleContainerService} from '../services';

export class SampleContainerStore {
  sampleContainer!: SampleContainer;
  listSampleContainer!: SampleContainer[];
  listSampleContainerCopy!: SampleContainer[];
  listSampleContainerCount!: number;
  checkExitsEnvCode!: boolean;

  constructor() {
    this.listSampleContainer = [];
    this.checkExitsEnvCode = false;
    this.sampleContainer = new SampleContainer({});
    this.listSampleContainerCount = 0;

    makeObservable<SampleContainerStore, any>(this, {
      sampleContainer: observable,
      listSampleContainer: observable,
      listSampleContainerCount: observable,
      checkExitsEnvCode: observable,

      sampleContainerService: computed,
      fetchListSampleContainer: action,
      updateSampleContainerList: action,
      updateSampleContainer: action,
      updateExitsEnvCode: action,
    });
  }

  get sampleContainerService() {
    return new SampleContainerService();
  }

  fetchListSampleContainer(page?, limit?) {
    this.sampleContainerService.listSampleContainer(page, limit);
  }

  updateSampleContainerList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.sampleContainers.success)
        return alert(res.sampleContainers.message);
      this.listSampleContainer = res.sampleContainers.data;
      this.listSampleContainerCopy = res.sampleContainers.data;
      this.listSampleContainerCount = res.sampleContainers.paginatorInfo.count;
    } else {
      this.listSampleContainer = res;
    }
  }

  filterSampleContainerList(res: any) {
    this.listSampleContainer = res.filterSampleContainers.data;
    this.listSampleContainerCount =
      res.filterSampleContainers.paginatorInfo.count;
  }

  updateSampleContainer = (sampleContainer: SampleContainer) => {
    this.sampleContainer = sampleContainer;
  };

  updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status;
  }
}
