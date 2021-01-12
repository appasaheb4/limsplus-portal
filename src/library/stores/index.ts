import React from "react";
import RootStore from "./rootStore";
import { AsyncTrunk } from "mobx-sync";

const trunk = new AsyncTrunk(RootStore, {
  storage: localStorage,
  storageKey: "__persist_mobx_stores__",
  delay: 1e3,
});

trunk.init().then(() => {
  RootStore.labStore.fetchListLab();
  RootStore.deginisationStore.fetchListDeginisation();
});

const Contexts = {
  rootStore: React.createContext(RootStore),
  userStore: React.createContext(RootStore.userStore),
  labStore: React.createContext(RootStore.labStore),
  deginisationStore: React.createContext(RootStore.deginisationStore),
};

export default Contexts;
