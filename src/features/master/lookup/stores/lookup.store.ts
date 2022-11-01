import {makeObservable, action, observable, computed} from 'mobx';
import {LocalInput, Lookup, GlobalSettings} from '../models';
import {LookupService} from '../services';

export class LookupStore {
  listLookup!: Lookup[];
  listLookupCount: number = 0;
  lookup!: Lookup;
  globalSettings!: GlobalSettings;
  localInput!: LocalInput;
  flagUpperCase: boolean;
  uiVariable!: {
    editorId: string;
  };

  constructor() {
    this.listLookup = [];
    this.lookup = new Lookup({});
    this.globalSettings = new GlobalSettings({});
    this.localInput = new LocalInput({
      flagUpperCase: true,
    });
    this.flagUpperCase = true;
    makeObservable<LookupStore, any>(this, {
      listLookup: observable,
      listLookupCount: observable,
      lookup: observable,
      globalSettings: observable,
      localInput: observable,
      flagUpperCase: observable,
      uiVariable: observable,

      LookupService: computed,
      fetchListLookup: action,
      updateLookupList: action,
      updateLookup: action,
      updateGlobalSettings: action,
      updateLocalInput: action,
      updateFlagUppperCase: action,
      filterLookupList: action,
      updateUiVariable: action,
    });
  }

  get LookupService() {
    return new LookupService();
  }

  fetchListLookup(page?, limit?) {
    this.LookupService.listLookup(page, limit);
  }

  updateLookupList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.lookups.success) return alert(res.lookups.message);
      this.listLookup = res.lookups.data;
      this.listLookupCount = res.lookups.paginatorInfo.count;
    } else {
      this.listLookup = res;
      this.listLookupCount = res?.length;
    }
  }

  filterLookupList(res: any) {
    this.listLookup = res.filterLookups.data;
    this.listLookupCount = res.filterLookups.paginatorInfo.count;
  }

  updateLookup = (Lookup: Lookup) => {
    this.lookup = Lookup;
  };

  updateGlobalSettings = (values: GlobalSettings) => {
    this.globalSettings = values;
  };

  updateLocalInput(input: LocalInput) {
    this.localInput = input;
  }

  updateFlagUppperCase(flag: boolean) {
    this.flagUpperCase = flag;
  }

  updateUiVariable(payload: any) {
    this.uiVariable = payload;
  }
}
