import {makeObservable, action, observable} from 'mobx';
import {SelectedCategory, SelectedComponent} from '../library/models';

export class RouterStore {
  userRouter!: any[];
  selectedUserCategory!: SelectedCategory;
  userPermission: any[];
  selectedCategory!: SelectedCategory;
  router: any;
  selectedComponents!: Partial<SelectedComponent>;
  lookupItems: Array<any>;

  constructor() {
    this.userPermission = [];
    this.lookupItems = [];

    // this.userRouter = [];
    // this.selectedUserCategory = {};
    // this.selectedCategory = {};
    // this.router = undefined;
    // this.selectedComponents = {};

    makeObservable<RouterStore, any>(this, {
      userRouter: observable,
      selectedUserCategory: observable,
      userPermission: observable,
      selectedCategory: observable,
      router: observable,
      selectedComponents: observable,
      lookupItems: observable,

      updateUserRouter: action,
      updateRouter: action,
      updateUserPermission: action,
      updateSelectedCategory: action,
      updateSelectedComponents: action,
      updateLookupItems: action,
    });
  }

  updateUserRouter(router?) {
    this.userRouter = router || undefined;
  }

  updateRouter(router: any) {
    this.router = router;
  }

  updateUserPermission(permission: any) {
    this.userPermission = permission;
  }

  updateSelectedCategory(category: SelectedCategory) {
    this.selectedUserCategory = category;
    this.selectedCategory = category;
  }
  updateSelectedComponents(comp: SelectedComponent) {
    this.selectedComponents = comp;
  }
  updateLookupItems(items: any) {
    this.lookupItems = items;
  }
}
