import {makeObservable, action, observable, computed} from 'mobx';
import {CorporateClients, SelectedItems} from '../models';
import {CorporateClientsService} from '../services';
import dayjs from 'dayjs';

export class CorporateClientsStore {
  corporateClients!: CorporateClients;
  listCoporateClientsCount: number;
  listCorporateClients: CorporateClients[];
  listCorporateClientsCopy!: CorporateClients[];
  checkExistsEnvCode: boolean;
  selectedItems!: SelectedItems;

  constructor() {
    this.listCoporateClientsCount = 0;
    this.listCorporateClients = [];
    this.checkExistsEnvCode = false;
    this.corporateClients = {
      ...this.corporateClients,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
      confidential: false,
      urgent: false,
      priceList: [{id: 0, maxDis: 0}],
      isEmployeeCode: false,
      specificFormat: false,
      isBalanceCheck: true,
      isPredefinedPanel: false,
    };
    this.selectedItems = new SelectedItems({});
    this.reset();
    makeObservable<CorporateClientsStore, any>(this, {
      corporateClients: observable,
      listCoporateClientsCount: observable,
      listCorporateClients: observable,
      checkExistsEnvCode: observable,
      selectedItems: observable,

      corporateClientsService: computed,
      fetchCorporateClients: action,
      reset: action,
      updateCorporateClientsList: action,
      updateCorporateClients: action,
      updateExistsEnvCode: action,
      updateSelectedItems: action,
    });
  }

  get corporateClientsService() {
    return new CorporateClientsService();
  }

  fetchCorporateClients(page?, limit?) {
    this.corporateClientsService.listCorporateClients(page, limit);
  }

  reset() {
    this.corporateClients = new CorporateClients({});
    this.listCorporateClients = [];
    this.listCoporateClientsCount = 0;
    this.corporateClients = {
      ...this.corporateClients,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
      confidential: false,
      urgent: false,
      priceList: [{id: 0, maxDis: 0}],
      isEmployeeCode: false,
      specificFormat: false,
      isBalanceCheck: true,
      deliveryMode: [],
    };
  }

  updateCorporateClientsList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.corporateClients.success)
        return alert(res.corporateClients.message);
      this.listCoporateClientsCount = res.corporateClients.paginatorInfo.count;
      this.listCorporateClients = res.corporateClients.data;
      this.listCorporateClientsCopy = res.corporateClients.data;
    } else {
      this.listCorporateClients = res;
    }
  }

  filterCorporateClientsList(res: any) {
    this.listCoporateClientsCount =
      res.filterCorporateClient.paginatorInfo.count;
    this.listCorporateClients = res.filterCorporateClient.data;
  }

  updateCorporateClients(clients: CorporateClients) {
    this.corporateClients = clients;
  }

  updateExistsEnvCode(status: boolean) {
    this.checkExistsEnvCode = status;
  }

  updateSelectedItems(items: SelectedItems) {
    this.selectedItems = items;
  }
}
