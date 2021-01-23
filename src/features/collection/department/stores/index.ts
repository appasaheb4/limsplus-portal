import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "../services";

@version(0.1)
class DepartmentStore {
  @observable listDepartment: Models.IDepartment[] = [];
  @ignore @observable department?: Models.IDepartment;

  private init() {
    return {
      lab: "",
      code: "",
      name: "",
    };
  }

  fetchListDepartment() {
    Services.listDepartment().then((res) => {
      console.log({ department: res });
      this.listDepartment = res;
    });
  }

  @action updateDepartment = (department: Models.IDepartment) => {
    this.department = department;
  };

  @action clear() {
    this.department = this.init();
  }
}

export default DepartmentStore;
