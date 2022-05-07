import {makeObservable, action, observable, computed} from 'mobx';
import {Methods} from '../models';
import {MethodsService} from '../services';

export class MethodsStore {
  methods!: Methods;
  listMethods: Methods[];
  listMethodsCopy!: Methods[];
  listMethodsCount: number;
  checkExitsEnvCode: boolean;

  constructor() {
    this.listMethods = [];
    this.listMethodsCount = 0;
    this.checkExitsEnvCode = false;

    makeObservable<MethodsStore, any>(this, {
      methods: observable,
      listMethods: observable,
      listMethodsCount: observable,
      checkExitsEnvCode: observable,

      methodsService: computed,
      fetchMethods: action,
      updateMethodsList: action,
      updateMethods: action,
      updateExitsEnvCode: action,
    });
  }

  get methodsService() {
    return new MethodsService();
  }

  fetchMethods(page?, limit?) {
    this.methodsService.listMethods(page, limit);
  }

  updateMethodsList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.methods.success) return alert(res.methods.message);
      this.listMethodsCount = res.methods.paginatorInfo.count;
      this.listMethods = res.methods.data;
      this.listMethodsCopy = res.methods.data;
    } else {
      this.listMethods = res;
    }
  }

  filterMethodsList(res: any) {
    this.listMethodsCount = res.filterMethods.paginatorInfo.count;
    this.listMethods = res.filterMethods.data;
  }

  updateMethods(methods: Methods) {
    this.methods = methods;
  }

  updateExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status;
  }
}
