/* eslint-disable */
export const getPermission = (store, category, subCategory) => {
  if (store) {
    let permssion: any
    store?.filter((router) => {
      const isCategory = router.name === category
      if (isCategory) {
        //return isCategory
        router.children.filter((children: any) => {
          const isPermission = children.name === subCategory
          if (isPermission) {
            permssion = children.permission
          }
        })
      }
    })
    return permssion
  }
}

export const checkPermission = (permission: any[], title: string) => {
  if (permission === undefined || permission.length === 0) return false
  const isItem: any = permission.filter((item) => {
    const isItem = item.title === title
    return isItem
  })  
  //console.log({ isItem })
  return isItem.length > 0 ? isItem[0].checked : false
}   
