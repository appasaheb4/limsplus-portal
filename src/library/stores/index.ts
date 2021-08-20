import React from "react"

import RootStore from "./rootStore"
import RouterStore from "./routerStore"
import AppStore from "./appStore"
import LoginStore from '@lp/features/login/stores/login-store'
import LookupStore from "@lp/features/collection/lookup/stores/lookup-store"

import { Store } from './Store';
    
  
export class Stores extends Store {
	rootStore!: RootStore;
	appStore!: AppStore;
    routerStore!: RouterStore;
	loginStore!: LoginStore;
	lookupStore!: LookupStore;
       
	constructor() {
		super();
		this.rootStore = new RootStore();
		this.appStore = new AppStore();
        this.routerStore = new RouterStore();
		this.loginStore = new LoginStore();
		this.lookupStore = new LookupStore();
	}  
	
	updateLoginStore(){
		this.loginStore = new LoginStore();
	}
}

export const stores = new Stores();
export const StoresContext = React.createContext(stores);
export const useStores = () => React.useContext(StoresContext);

