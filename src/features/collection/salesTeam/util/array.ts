/* eslint-disable */
export const filterUsersItems = (arr, arrKey, key, value): any => {
  console.log({arr});
  
  const result: any = []
  if (arr) {
    arr.filter((item) => {
      item[arrKey].find((subItem) => {
        console.log({ item })
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
