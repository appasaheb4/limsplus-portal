import {makeObservable, action, observable, computed} from 'mobx';
import {LoginActivity} from '../models';
import {LoginActivityService} from '../services';

export class LoginActivityStore {
  listLoginActivity: LoginActivity[];
  listLoginActivityCount: number;
  constructor() {
    this.listLoginActivity = [];
    this.listLoginActivityCount = 0;
    makeObservable<LoginActivityStore, any>(this, {
      listLoginActivity: observable,
      listLoginActivityCount: observable,

      LoginActivityService: computed,
      fetchLoginActivity: action,
      updateLoginActivityList: action,
    });
  }

  get LoginActivityService() {
    return new LoginActivityService();
  }

  fetchLoginActivity(page?, limit?, filter?) {
    this.LoginActivityService.listLoginActivity(page, limit, filter);
  }

  updateLoginActivityList(res: any) {
    if (!res.loginActivitys.success) return alert(res.loginActivitys.message);
    this.listLoginActivity = res.loginActivitys.data;
    this.listLoginActivityCount = res.loginActivitys.paginatorInfo.count;
  }

  filterLoginActivityList(res: any) {
    this.listLoginActivity = res.filterLoginActivitys.data;
    this.listLoginActivityCount = res.filterLoginActivitys.paginatorInfo.count;
  }
}
