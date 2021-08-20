import { toJS } from "mobx"
import Storage from "@lp/library/modules/storage"
import hydrateStore from "@lp/library/modules/startup"
/* eslint-disable */

export const selectedComponents = (store, category, subCategory) => {
  if (store) {
    let compInfo: any
    store?.filter((router) => {
      const isCategory = router.name === category
      if (isCategory) {
        router.children.filter((children: any) => {
          const isSubCategory = children.name === subCategory
          if (isSubCategory) {
            compInfo = children
          }
        })
      }
    })
    return compInfo
  }
}

export const getPermission = (store, category, subCategory) => {
  if (store) {
    let permssion: any
    store?.filter((router) => {
      const isCategory = router.name === category
      if (isCategory) {
        router.children.filter((children: any) => {
          const isPermission = children.name === subCategory
          if (isPermission && children.permission !== undefined) {
            permssion = children.permission
          }
        })
      }
    })
    return permssion
  }
}

export const checkPermission = (permission: any[], title: string) => {
  permission = toJS(permission)
  if (permission === undefined || permission.length === 0) return false
  const isItem: any = permission.filter((item) => {
    const isItem = item.title === title
    return isItem
  })
  return isItem.length > 0 ? isItem[0].checked : false
}

export const updateSelectedCategory = async (
  stores: any,
  category: string,
  item: string
) => {
  stores.routerStore.updateSelectedCategory({
    ...stores.routerStore.selectedUserCategory,
    category,
    item,
  })
  await Storage.setItem(`__persist_mobx_stores_routerStore_SelectedCategory__`, {
    category,
    item,
  })
  const permission = getPermission(
    toJS(stores.routerStore.userRouter),
    category,
    item
  )
  const selectedComp = selectedComponents(
    toJS(stores.routerStore.userRouter),
    category,
    item
  )
  stores.routerStore.updateSelectedComponents(selectedComp)
  stores.routerStore.updateUserPermission(permission)
  await hydrateStore("routerStore", stores.routerStore)
}

export const getLookupValues = async (listLookup: any):Promise<any> => {
  if (listLookup.length > 0) {
    const selectedCategory: any = await Storage.getItem(
      `__persist_mobx_stores_routerStore_SelectedCategory__`
    )
    const items = listLookup.filter((item: any) => {
      if (
        item.documentName.name === selectedCategory.category &&
        item.documentName.children.name === selectedCategory.item
      )
        return item
    })
    if (items) {
      return items
    }
  }
}
