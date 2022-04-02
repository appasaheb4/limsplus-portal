import {makeObservable, action, observable, computed} from 'mobx';
import {Users, SelectedItems, ChangePassword} from '../models';
import dayjs from 'dayjs';
import {UserService} from '../services';

export class UserStore {
  user!: Users;
  userList!: Users[];
  userListCopy!: Users[];
  userListCount = 0;
  changePassword!: ChangePassword;
  checkExitsUserId: boolean;
  checkExistsEmpCode: boolean;
  selectedItems!: SelectedItems;

  constructor() {
    this.userList = [];
    this.checkExitsUserId = false;
    this.checkExistsEmpCode = false;
    this.user = {
      ...this.user,
      exipreDate: new Date(
        dayjs(new Date()).add(30, 'days').format('YYYY-MM-DD'),
      ),
      expireDays: 30,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateOfBirth: new Date(
        dayjs(new Date()).add(-30, 'years').format('YYYY-MM-DD'),
      ),
      marriageAnniversary: new Date(
        dayjs(new Date()).add(-5, 'years').format('YYYY-MM-DD HH:mm:ss'),
      ),
      confidential: false,
      allowLogin: true,
      confirguration: false,
      systemInfo: {
        accessInfo: {
          mobile: true,
          desktop: true,
        },
      },
      validationLevel: 0,
      version: 1,
    };

    makeObservable<UserStore, any>(this, {
      user: observable,
      userList: observable,
      userListCopy: observable,
      userListCount: observable,
      changePassword: observable,
      checkExitsUserId: observable,
      checkExistsEmpCode: observable,
      selectedItems: observable,

      UsersService: computed,
      loadUser: action,
      updateUserList: action,
      updateUser: action,
      updateChangePassword: action,
      setExitsUserId: action,
      setExistsEmpCodeStatus: action,
      updateUserFilterList: action,
      filterUserList: action,
      updateSelectedItems: action,
    });
  }

  get UsersService() {
    return new UserService();
  }

  loadUser(page?, limit?) {
    this.UsersService.userList(page, limit);
  }

  updateUserList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.users.success) alert(res.users.message);
      this.userList = res.users.data;
      this.userListCopy = res.users.data;
      this.userListCount = res.users.paginatorInfo.count;
    } else {
      this.userList = res;
    }
  }

  filterUserList(res: any) {
    this.userList = res.filterUsers.data;
    this.userListCount = res.filterUsers.paginatorInfo.count;
  }

  updateUser(user: Users) {
    this.user = user;
  }

  updateChangePassword(password: ChangePassword) {
    this.changePassword = password;
  }

  setExitsUserId(status: boolean) {
    this.checkExitsUserId = status;
  }

  setExistsEmpCodeStatus(status: boolean) {
    this.checkExistsEmpCode = status;
  }

  updateUserFilterList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.usersFilterByKey.success) alert(res.usersFilterByKey.message);
      this.userList = res.usersFilterByKey.data;
    } else {
      this.userList = res;
    }
  }

  updateSelectedItems(res: SelectedItems) {
    this.selectedItems = res;
  }
}
