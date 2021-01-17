import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "../services";

@version(0.1)
class DepartmentStore {
  @observable listDepartment: Models.IDepartment[] = [];

  fetchListDepartment() {
    Services.listDepartment().then((res) => {
      console.log({ department: res });
      this.listDepartment = res;
    });
  }
}

export default DepartmentStore;
