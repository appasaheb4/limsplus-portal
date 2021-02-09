import * as Services from "../services"

export const onLogin = (loginStore: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      Services.onLogin(loginStore)
        .then((res: any) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      console.log("error new")

      reject(error)
    }
  })
}
export const addUser = (userStore: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      console.log({ user: userStore.user })

      Services.addUser(userStore.user).then((res: any) => {
        console.log({ res })
        resolve(res.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}
