import React from "react";
import UsersStore from "./users-store";

const usersStore = new UsersStore();

export default React.createContext(usersStore);
