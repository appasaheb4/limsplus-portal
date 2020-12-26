import React from "react";
import LoginStore from "./login-store";

const loginStore = new LoginStore();

export default React.createContext(loginStore);
