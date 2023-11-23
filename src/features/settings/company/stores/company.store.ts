import { makeObservable, action, observable, computed } from 'mobx';
import { Company } from '../models';
import { CompanyService } from '../services';
import dayjs from 'dayjs';
export class CompanyStore {
  company!: Company;
  companyList!: Company[];
  companyListCount!: number;

  constructor() {
    this.reset();
    makeObservable<CompanyStore, any>(this, {
      company: observable,
      companyList: observable,
      companyListCount: observable,

      reset: action,
      companyService: computed,
      updateCompany: action,
      updateCompanyList: action,
    });
  }

  reset() {
    this.company = new Company({
      ...this.company,
      status: 'A',
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
    if (!res.banners.success) return alert(res.banners.message);
    this.companyList = res.banners.data;
    this.companyListCount = res.banners.paginatorInfo.count;
  }
}
