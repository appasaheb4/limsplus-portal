import { version } from "mobx-sync";

@version(0.1)
class LoginStore {
  constructor() {
    console.log("user store");
  }
}

export default LoginStore;
