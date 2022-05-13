import {makeObservable, action, observable, computed} from 'mobx';
import {RoleMapping, Role} from '../models';
import {RoleMappingService} from '../services';

export class RoleMappingStore {
  user!: Role;
  selectedRole!: RoleMapping;
  roleMappingList: Role[];
  roleMappingListCount: number;
  rolePermission: any;
  constructor() {
    this.roleMappingList = [];
    this.roleMappingListCount = 0;

    makeObservable<RoleMappingStore, any>(this, {
      user: observable,
      selectedRole: observable,
      roleMappingList: observable,
      roleMappingListCount: observable,
      rolePermission: observable,

      roleMappingService: computed,
      fetchRoleMappingList: action,
      updateRoleMappingList: action,
      updateUser: action,
      updateRolePermission: action,
      updateSelectedRole: action,
    });
  }

  get roleMappingService() {
    return new RoleMappingService();
  }

  fetchRoleMappingList(page?, limit?) {
    this.roleMappingService.roleMappingList(page, limit);
  }

  updateRoleMappingList(res: any) {
    if (!res.roleMappings.success) return alert(res.roleMappings.message);
    this.roleMappingList = res.roleMappings.data;
    this.roleMappingListCount = res.roleMappings.paginatorInfo.count;
  }

  filterRoleMappingList(res: any) {
    this.roleMappingList = res.filterRoleMapping.data;
    this.roleMappingListCount = res.filterRoleMapping.paginatorInfo.count;
  }

  updateUser = (user: Role) => {
    this.user = user;
  };

  updateRolePermission(permission: any) {
    this.rolePermission = permission;
  }
  updateSelectedRole(role: RoleMapping) {
    this.selectedRole = role;
  }
}
