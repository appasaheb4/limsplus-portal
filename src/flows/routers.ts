import { toJS } from 'mobx';
import Storage from '@/library/modules/storage';
import hydrateStore from '@/library/modules/startup';
/* eslint-disable */
import { LookupService } from '@/features/settings/lookup/services';
import { stores } from '@/stores';

export const selectedComponents = (store, category, subCategory) => {
  if (store) {
    let compInfo: any;
    store?.filter(router => {
      const isCategory = router.name === category;
      if (isCategory) {
        router.children.filter((children: any) => {
          const isSubCategory = children.name === subCategory;
          if (isSubCategory) {
            compInfo = children;
          }
        });
      }
    });
    return compInfo;
  }
};

export const getPermission = (store, category, subCategory) => {
  if (store) {
    let permssion: any;
    store?.filter(router => {
      const isCategory = router.name === category;
      if (isCategory) {
        router.children.filter((children: any) => {
          const isPermission = children.name === subCategory;
          if (isPermission && children.permission !== undefined) {
            permssion = children.permission;
          }
        });
      }
    });
    return permssion;
  }
};

export const checkPermission = (permission: any[], title: string) => {
  let accessRights = toJS(permission);
  if (accessRights === undefined || accessRights.length === 0) return false;
  const isItem: any = accessRights.filter(item => {
    const isItem = item.title === title;
    return isItem;
  });
  return isItem.length > 0 ? isItem[0].checked : false;
};

export const updateSelectedCategory = async (
  category: string,
  item: string,
) => {
  stores.routerStore.updateSelectedCategory({
    ...stores.routerStore.selectedUserCategory,
    category,
    item,
  });
  await Storage.setItem(
    `__persist_mobx_stores_routerStore_SelectedCategory__`,
    {
      category,
      item,
    },
  );
  const permission = getPermission(
    toJS(stores.routerStore.userRouter),
    category,
    item,
  );
  const selectedComp = selectedComponents(
    toJS(stores.routerStore.userRouter),
    category,
    item,
  );
  await hydrateStore('routerStore', stores.routerStore);
  return { permission, selectedComp };
};

export const getLookupValues = async (path: string): Promise<any> => {
  let lookupItems: Array<any> = [];
  await new LookupService().lookupItemsByPath(path).then(res => {
    if (!res.lookupItemsByPath.success)
      return alert(res.lookupItemsByPath.message);
    lookupItems = res.lookupItemsByPath.data;
  });
  return lookupItems;
};

export const getLookupValuesByPath = async (path: string): Promise<any> => {
  let lookupItems: Array<any> = [];
  await new LookupService().lookupItemsByPath(path).then(res => {
    if (!res.lookupItemsByPath.success)
      return alert(res.lookupItemsByPath.message);
    lookupItems = res.lookupItemsByPath.data;
  });
  return lookupItems;
};

export const getLookupValuesByPathNField = async (
  path: string,
  field: string,
) => {
  let lookupItems: Array<any> = [];
  await new LookupService()
    .lookupItemsByPathNField({ input: { path, field } })
    .then(res => {
      if (!res.lookupItemsByPathNField.success)
        return alert(res.lookupItemsByPathNField.message);
      lookupItems = res.lookupItemsByPathNField.data;
    });
  return lookupItems[0]?.arrValue;
};
