import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "../services";

@version(0.1)
class DeginisationStore {
  @observable listDeginisation: Models.IDeginisation[] = [];

  fetchListDeginisation() {
    Services.listDeginisation().then((res) => {
      console.log({ deginisation: res });
      this.listDeginisation = res;
    });
  }
}

export default DeginisationStore;
