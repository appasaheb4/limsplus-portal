import {makeObservable, action, observable, computed} from 'mobx';
import {InterfaceManager} from '../models';
import {InterfaceManagerService} from '../services';

interface UpdateItem {
  value: string | boolean | undefined | any[];
  dataField: string;
  id: string;
}

export class InterfaceManagerStore {
  interfaceManager!: InterfaceManager;
  listInterfaceManager: InterfaceManager[];
  listInterfaceManagerCopy: InterfaceManager[];
  listInterfaceManagerCount: number;
  updateItem!: Partial<UpdateItem>;
  instTypeList: Array<any>;

  constructor() {
    this.listInterfaceManager = [];
    this.listInterfaceManagerCopy = [];
    this.listInterfaceManagerCount = 0;
    this.interfaceManager = new InterfaceManager({});
    this.updateItem = {};
    this.reset();
    this.instTypeList = [];
    makeObservable<InterfaceManagerStore, any>(this, {
      interfaceManager: observable,
      listInterfaceManager: observable,
      listInterfaceManagerCopy: observable,
      listInterfaceManagerCount: observable,
      updateItem: observable,
      instTypeList: observable,

      interfaceManagerService: computed,
      fetchEncodeCharacter: action,
      updateInterfaceManagerList: action,
      updateInterfaceManager: action,
      changeUpdateItem: action,
      reset: action,
      updateInstTypeList: action,
    });
  }

  reset() {
    this.interfaceManager = new InterfaceManager({});
    this.listInterfaceManager = [];
    this.listInterfaceManagerCount = 0;
  }
  get interfaceManagerService() {
    return new InterfaceManagerService();
  }

  fetchEncodeCharacter(page?, limit?) {
    this.interfaceManagerService.listInterfaceManager(page, limit);
  }

  updateInterfaceManagerList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.interfaceManagers.success)
        return alert(res.interfaceManagers.message);
      this.listInterfaceManager = res.interfaceManagers.data;
      this.listInterfaceManagerCopy = res.interfaceManagers.data;
      this.listInterfaceManagerCount =
        res.interfaceManagers.paginatorInfo.count;
    } else {
      this.listInterfaceManager = res;
    }
  }

  filterInterfaceManager(res: any) {
    this.listInterfaceManager = res.filterInterfaceManagers.data;
    this.listInterfaceManagerCount =
      res.filterInterfaceManagers.paginatorInfo.count;
  }

  updateInterfaceManager = (value: InterfaceManager) => {
    this.interfaceManager = value;
  };
  changeUpdateItem = (item: UpdateItem) => {
    this.updateItem = item;
  };

  updateInstTypeList(list) {
    this.instTypeList = list;
  }
}
