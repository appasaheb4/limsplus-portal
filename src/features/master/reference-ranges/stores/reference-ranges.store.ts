import { makeObservable, action, observable, computed } from 'mobx';
import { ReferenceRanges } from '../models';
import { ReferenceRangesService } from '../services';

export class RefernceRangesStore {
  referenceRanges!: ReferenceRanges;
  listReferenceRanges: ReferenceRanges[];
  listReferenceRangesCount: number;
  checkExitsRecord: boolean;

  constructor() {
    this.listReferenceRanges = [];
    this.listReferenceRangesCount = 0;
    this.checkExitsRecord = false;
    this.reset();
    makeObservable<RefernceRangesStore, any>(this, {
      referenceRanges: observable,
      listReferenceRanges: observable,
      listReferenceRangesCount: observable,
      checkExitsRecord: observable,

      referenceRangesService: computed,
      fetchListReferenceRanges: action,
      updateReferenceRangesList: action,
      updateReferenceRanges: action,
      updateExistsRecord: action,
      reset: action,
    });
  }

  reset() {
    // this.referenceRanges = new ReferenceRanges({});
    this.listReferenceRanges = [];
    this.listReferenceRangesCount = 0;
    this.referenceRanges = {
      ...this.referenceRanges,
      refRangesInputList: [],
    };
  }
  get referenceRangesService() {
    return new ReferenceRangesService();
  }

  fetchListReferenceRanges(page?, limit?) {
    this.referenceRangesService.listReferenceRanges(page, limit);
  }

  updateReferenceRangesList(res: any) {
    if (!res.referenceRanges.success)
      return console.log(res.referenceRanges.message);
    this.listReferenceRanges = res.referenceRanges.data;
    this.listReferenceRangesCount = res.referenceRanges.paginatorInfo.count;
  }

  filterReferenceRangesList(res: any) {
    this.listReferenceRanges = res.filterReferenceRange.data;
    this.listReferenceRangesCount =
      res.filterReferenceRange.paginatorInfo.count;
  }

  updateReferenceRanges(ranges: ReferenceRanges) {
    this.referenceRanges = ranges;
  }
  updateExistsRecord = (status: boolean) => {
    this.checkExitsRecord = status;
  };
}
