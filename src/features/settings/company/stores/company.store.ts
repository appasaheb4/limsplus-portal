import { makeObservable, action, observable, computed } from 'mobx';
import { Company, SelectedItems } from '../models';
import { CompanyService } from '../services';
import dayjs from 'dayjs';
export class CompanyStore {
  company!: Company;
  companyList!: Company[];
  companyListCount!: number;
  selectedItems!: SelectedItems;

  constructor() {
    this.reset();
    makeObservable<CompanyStore, any>(this, {
      company: observable,
      companyList: observable,
      companyListCount: observable,
      selectedItems: observable,

      reset: action,
      companyService: computed,
      updateCompany: action,
      updateCompanyList: action,
      updateSelectedItems: action,
    });
  }

  reset() {
    this.company = new Company({
      module: [],
      allowedUser: 1,
      version: 1,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
    });
    this.companyList = [];
    this.companyListCount = 0;
  }

  get companyService() {
    return new CompanyService();
  }

  updateCompany(payload: Company) {
    this.company = payload;
  }

  updateCompanyList(res: any) {
    this.companyList = res.companies.data;
    this.companyListCount = res.companies.paginatorInfo.count;
  }

  updateSelectedItems(items: SelectedItems) {
    this.selectedItems = items;
  }
}
