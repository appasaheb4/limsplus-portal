import { makeObservable, action, observable, computed } from 'mobx';
import { DataConversation } from '../models';

import { DataConversationService } from '../services';

interface UpdateItem {
  value: string | boolean | undefined | any[];
  dataField: string;
  id: string;
}

export class DataConversationStore {
  dataConversation!: DataConversation;
  listdataConversation: DataConversation[];
  listdataConversationCount: number;
  updateItem!: Partial<UpdateItem>;

  constructor() {
    this.listdataConversation = [];
    this.listdataConversationCount = 0;
    this.updateItem = {};
    this.reset();
    this.dataConversation = new DataConversation({});
    makeObservable<DataConversationStore, any>(this, {
      dataConversation: observable,
      listdataConversation: observable,
      listdataConversationCount: observable,
      updateItem: observable,

      dataConversationService: computed,
      fetchDataConversation: action,
      updateDataConversationList: action,
      updateDataConversation: action,
      changeUpdateItem: action,
      reset: action,
    });
  }

  reset() {
    this.dataConversation = new DataConversation({});
    this.listdataConversation = [];
    this.listdataConversationCount = 0;
  }

  get dataConversationService() {
    return new DataConversationService();
  }

  fetchDataConversation(page?, limit?) {
    this.dataConversationService.listDataConversation(page, limit);
  }

  updateDataConversationList(res: any) {
    if (!res.dataConversations.success)
      return console.log(res.dataConversations.message);
    this.listdataConversation = res.dataConversations.data;
    this.listdataConversationCount = res.dataConversations.paginatorInfo.count;
  }

  filterDataConversationList(res: any) {
    this.listdataConversation = res.filterDataConversation.data;
    this.listdataConversationCount =
      res.filterDataConversation.paginatorInfo.count;
  }

  updateDataConversation = (dataConversation: DataConversation) => {
    this.dataConversation = dataConversation;
  };
  changeUpdateItem = (item: UpdateItem) => {
    this.updateItem = item;
  };
}
