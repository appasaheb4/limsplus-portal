import * as Clients from "@lp/library/clients"

import LoginService from "./login-services"
export { LoginService }

const RELATIVE_PATH = "/auth"

export const onLogin = (user: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/login`, user)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const accountStatusUpdate = (statusInfo: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/statusUpdate`, statusInfo)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })
