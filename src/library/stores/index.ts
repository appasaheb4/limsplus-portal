import React from "react";
import RootStore from "./rootStore";
import { AsyncTrunk } from "mobx-sync";

const trunk = new AsyncTrunk(RootStore, {
  storage: localStorage,
  storageKey: "__persist_mobx_stores__",
  delay: 1e3,
});

trunk.init().then(() => {
  // setTimeout(() => {
  //   RootStore.labStore.fetchListLab();
  // }, 0);
  // setTimeout(() => {
  //   RootStore.deginisationStore.fetchListDeginisation();
  // }, 5000);
  // setTimeout(() => {
  //   RootStore.departmentStore.fetchListDepartment();
  // }, 10000);

  setTimeout(() => {
    RootStore.roleStore.fetchListRole();
  }, 15000);
});

const Contexts = {
  rootStore: React.createContext(RootStore),
  userStore: React.createContext(RootStore.userStore),
  labStore: React.createContext(RootStore.labStore),
  deginisationStore: React.createContext(RootStore.deginisationStore),
  departmentStore: React.createContext(RootStore.departmentStore),
  roleStore: React.createContext(RootStore.roleStore),
};

export default Contexts;
