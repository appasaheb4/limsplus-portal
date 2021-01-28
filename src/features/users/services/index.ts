import * as Clients from "@lp/library/clients"
import * as Models from "@lp/features/users/models"

const RELATIVE_PATH = "/auth"

export const onLogin = (user: Models.Login) =>
  new Promise<Models.Login>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/login`, user)
      .then((res) => {
        resolve(res as Models.Login)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const addUser = (user: Models.Users) =>
  new Promise<Models.Users>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/addUser`, user)
      .then((res) => {
        resolve(res.data.data as Models.Users)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const userList = () =>
  new Promise<Models.Users[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .get(`${RELATIVE_PATH}/listUser`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const deleteUser = (id: string) =>
  new Promise<Models.Users[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .delete(`${RELATIVE_PATH}/deleteUser/${id}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const changePassword = (body: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/changePassword`, body)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const checkExitsUserId = (userId: string) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/checkExitsUserId`, { userId })
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const updateUserSingleFiled = (userInfo: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/updateUserSingleFiled`, userInfo)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })
