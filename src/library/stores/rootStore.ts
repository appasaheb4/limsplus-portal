import { action, observable } from "mobx";
import { version, ignore } from "mobx-sync";

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false;

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading;
  }
}

export default RootStore;
