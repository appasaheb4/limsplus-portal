import {makeObservable, action, observable, computed} from 'mobx';
import {Role} from '../models';
import {RoleService} from '../services';

export class RoleStore {
  listRole: Role[] = [];
  listRoleCopy: Role[] = [];
  listRoleCount: number = 0;
  role?: Role;
  checkExitsCode?: boolean = false;

  constructor() {
    this.role = new Role({});
    this.reset();
    makeObservable<RoleStore, any>(this, {
      listRole: observable,
      listRoleCopy: observable,
      listRoleCount: observable,
      role: observable,
      checkExitsCode: observable,

      RoleService: computed,
      fetchListRole: action,
      updateRoleList: action,
      setExitsCode: action,
      updateRole: action,
      reset: action,
    });
  }

  reset() {
    this.role = new Role({});
    this.listRole = [];
    this.listRoleCount = 0;
  }

  get RoleService() {
    return new RoleService();
  }

  fetchListRole(page?, limit?) {
    this.RoleService.listRole(page, limit);
  }

  updateRoleList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.roles.success) return alert(res.roles.message);
      this.listRole = res.roles.data;
      this.listRoleCopy = res.roles.data;
      this.listRoleCount = res.roles.paginatorInfo.count;
    } else {
      this.listRole = res;
    }
  }

  filterRoleList(res: any) {
    this.listRole = res.filterRoles.data;
    this.listRoleCount = res.filterRoles.paginatorInfo.count;
  }

  setExitsCode(status: boolean) {
    this.checkExitsCode = status;
  }

  updateRole = (role: Role) => {
    this.role = role;
  };
}
