import {makeObservable, action, observable} from 'mobx';
import * as LibraryModels from '../library/models';

export class RouterStore {
  userRouter!: any[];
  selectedUserCategory!: LibraryModels.SelectedCategory;
  userPermission: any[];
  selectedCategory!: LibraryModels.SelectedCategory;
  router: any;
  selectedComponents!: LibraryModels.SelectedComponent;
  lookupItems: Array<any>;

  constructor() {
    this.userPermission = [];
    this.lookupItems = [];
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

  updateSelectedCategory(category: LibraryModels.SelectedCategory) {
    this.selectedUserCategory = category;
    this.selectedCategory = category;
  }
  updateSelectedComponents(comp: LibraryModels.SelectedComponent) {
    this.selectedComponents = comp;
  }
  updateLookupItems(items: any) {
    this.lookupItems = items;
  }
}
