import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "../services";

@version(0.1)
class DeginisationStore {
  @observable listDeginisation: Models.IDeginisation[] = [];
  @ignore @observable deginisation?: Models.IDeginisation;

  private init() {
    return {
      code: "",
      description: "",
    };
  }

  fetchListDeginisation() {
    Services.listDeginisation().then((res) => {
      console.log({ deginisation: res });
      this.listDeginisation = res;
    });
  }

  @action updateDescription = (deginisation: Models.IDeginisation) => {
    this.deginisation = deginisation;
  };

  @action clear() {
    this.deginisation = this.init();
  }
}

export default DeginisationStore;
