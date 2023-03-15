import {makeObservable, action, observable, computed} from 'mobx';
import dayjs from 'dayjs';
import {PossibleResults} from '../models';
import {PossibleResultsService} from '../services';

export class PossibleResultsStore {
  listPossibleResults: PossibleResults[];
  listPossibleResultsCount: number;
  possibleResults!: PossibleResults;
  checkExistsRecords!: boolean;

  constructor() {
    this.listPossibleResults = [];
    this.listPossibleResultsCount = 0;
    this.checkExistsRecords = false;
    this.reset();
    makeObservable<PossibleResultsStore, any>(this, {
      listPossibleResults: observable,
      listPossibleResultsCount: observable,
      possibleResults: observable,
      checkExistsRecords: observable,

      possibleResultsService: computed,
      fetchListPossibleResults: action,
      updatePossibleResultList: action,
      updatePossibleResults: action,
      updateExistsRecords: action,
      reset: action,
    });
  }

  reset() {
    this.possibleResults = new PossibleResults({});
    this.listPossibleResults = [];
    this.listPossibleResultsCount = 0;
    this.possibleResults = {
      ...this.possibleResults,
      abNormal: false,
      critical: false,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
    };
  }

  get possibleResultsService() {
    return new PossibleResultsService();
  }

  fetchListPossibleResults(page?, limit?) {
    this.possibleResultsService.listPossibleResults(page, limit);
  }

  updatePossibleResultList(res: any) {
    if (!res.possibleResults.success) return alert(res.possibleResults.message);
    this.listPossibleResults = res.possibleResults.data;
    this.listPossibleResultsCount = res.possibleResults.paginatorInfo.count;
  }

  filterPossibleResult(res: any) {
    this.listPossibleResults = res.filterPossibleResult.data;
    this.listPossibleResultsCount =
      res.filterPossibleResult.paginatorInfo.count;
  }

  updatePossibleResults = (results: PossibleResults) => {
    this.possibleResults = results;
  };

  updateExistsRecords(status: boolean) {
    this.checkExistsRecords = status;
  }
}
