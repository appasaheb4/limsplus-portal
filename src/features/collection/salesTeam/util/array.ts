/* eslint-disable */
export const filterUsersItems = (arr, arrKey, key, value): any => {
  const result: any = []
  if (arr) {
    arr.filter((item) => {
      item[arrKey].find((subItem) => {
        if (subItem[key] === value)
          result.push({
            ...item,
            empCode: item.empCode || "",
            empName: item.fullName,
          })
      })
    })
  }
  return result
}
