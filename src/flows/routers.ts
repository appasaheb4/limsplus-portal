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
  //console.log({ isItem })
  return isItem.length > 0 ? isItem[0].checked : false
}

export const updateSelectedCategory = async (
  RootStore: any,
  category: string,
  item: string
) => {
  RootStore.routerStore.updateSelectedCategory({
    ...RootStore.routerStore.selectedUserCategory,
    category,
    item,
  })
  console.log({ category, item })

  await Storage.setItem(`__persist_mobx_stores_routerStore_SelectedCategory__`, {
    category,
    item,
  })
  const permission = getPermission(
    toJS(RootStore.routerStore.userRouter),
    category,
    item
  )
  const selectedComp = selectedComponents(
    toJS(RootStore.routerStore.userRouter),
    category,
    item
  )
  RootStore.routerStore.updateSelectedComponents(selectedComp)
  RootStore.routerStore.updateUserPermission(permission)
  await hydrateStore("routerStore", RootStore.routerStore)
}
