import * as Clients from "@lp/library/clients"
import * as Models from "@lp/features/users/models"

import UserService from "./user-service";
export{UserService}

const RELATIVE_PATH = "/auth"


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


export const reSendPassword = (userInfo: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/reSendPassword`, userInfo)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })


