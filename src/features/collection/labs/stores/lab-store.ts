import { version, ignore } from "mobx-sync";
import { action, observable,computed } from "mobx";
import * as Models from "../models";
import * as Services from "../services";
import {Stores} from '@lp/features/login/stores';
@version(0.1)
class LabStore {
  @observable listLabs: Models.Labs[] = [];
  @ignore @observable labs?: Models.Labs;
  @ignore @observable checkExitsCode?: boolean = false;

  private initLab() {
    return {
      code: "",
      name: "",
    };
  }

  fetchListLab() {
    Services.listLabs().then((res) => {
     // console.log({ lab: res });
      this.listLabs = res;
    });
  }
  @computed get LabService() {
    return new Services.LabService(Stores.loginStore.login?.token as string);
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }

  @action updateLabs = (labs: Models.Labs) => {
    this.labs = labs;
  };

  @action clear() {
    this.labs = this.initLab();
  }
}

export default LabStore;
