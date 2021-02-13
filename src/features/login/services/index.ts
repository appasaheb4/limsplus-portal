import * as Clients from "@lp/library/clients"

const RELATIVE_PATH = "/auth"

export const onLogin = (user: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/login`, user)
      .then((res) => {
        console.log({ res })

        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const logout = (id: string) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/logout`, { id })
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
