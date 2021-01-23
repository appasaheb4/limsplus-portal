import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as LibraryUtils from "@lp/library/utils";
import moment from "moment";
import * as Services from "../services";

@version(0.1)
class LabStore {
  @observable listLabs: Models.Labs[] = [];
  @ignore @observable labs?: Models.Labs;

  private initLab() {
    return {
      code: "",
      name: "",
    };
  }

  fetchListLab() {
    Services.listLabs().then((res) => {
      console.log({ lab: res });
      this.listLabs = res;
    });
  }

  @action updateLabs = (labs: Models.Labs) => {
    this.labs = labs;
  };

  @action clear() {
    this.labs = this.initLab();
  }
}

export default LabStore;
