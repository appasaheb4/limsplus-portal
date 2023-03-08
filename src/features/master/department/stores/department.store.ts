import {makeObservable, action, observable, computed} from 'mobx';
import {Department, SelectedItems} from '../models';
import {DepartmentService} from '../services';
import dayjs from 'dayjs';

export class DepartmentStore {
  listDepartment!: Department[];
  listDepartmentCopy!: Department[];
  listDepartmentCount = 0;
  department!: Department;
  checkExitsCode = false;
  selectedItems!: SelectedItems;

  constructor() {
    this.listDepartment = [];
    this.listDepartmentCopy = [];
    this.department = {
      ...this.department,
      autoRelease: false,
      requireReceveInLab: false,
      requireScainIn: false,
      routingDept: false,
      openingTime: dayjs().format('hh:mm a'),
      closingTime: dayjs().format('hh:mm a'),
    };
    this.selectedItems = new SelectedItems({});
    makeObservable<DepartmentStore, any>(this, {
      listDepartment: observable,
      listDepartmentCount: observable,
      department: observable,
      checkExitsCode: observable,
      selectedItems: observable,

      DepartmentService: computed,
      setExitsCode: action,
      fetchListDepartment: action,
      updateDepartmentList: action,
      updateDepartment: action,
      filterDepartmentList: action,
    });
  }
  get DepartmentService() {
    return new DepartmentService();
  }

  setExitsCode(status: boolean) {
    this.checkExitsCode = status;
  }

  fetchListDepartment(page?, limit?) {
    this.DepartmentService.listDepartment(page, limit);
  }

  updateDepartmentList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.departments.success) return alert(res.departments.message);
      this.listDepartment = res.departments.data;
      this.listDepartmentCopy = res.departments.data;
      this.listDepartmentCount = res.departments.paginatorInfo.count;
    } else {
      this.listDepartment = res;
    }
  }

  filterDepartmentList(res: any) {
    this.listDepartment = res.filterDepartments.data;
    this.listDepartmentCount = res.filterDepartments.paginatorInfo.count;
  }

  updateDepartment = (department: Department) => {
    this.department = department;
  };
  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items;
    else this.selectedItems = new SelectedItems({});
  }
}
