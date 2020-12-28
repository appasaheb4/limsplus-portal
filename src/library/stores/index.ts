import React from "react";
import RootStore from "./rootStore";

const rootStore = new RootStore();

export default React.createContext(rootStore);
