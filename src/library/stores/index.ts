import React from "react"

import RootStore from "./rootStore"
import RouterStore from "./routerStore"
import AppStore from "./appStore"
import LoginStore from '@lp/features/login/stores/login-store'

import { Store } from './Store';

  
export class Stores extends Store {
	rootStore!: RootStore;
	appStore!: AppStore;
    routerStore!: RouterStore;
	loginStore: LoginStore;
     
	constructor() {
		super();
		this.rootStore = new RootStore();
		this.appStore = new AppStore();
        this.routerStore = new RouterStore();
		this.loginStore = new LoginStore();
	}   
}

export const stores = new Stores();
export const StoresContext = React.createContext(stores);
export const useStores = () => React.useContext(StoresContext);

