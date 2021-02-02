import * as Clients from "@lp/library/clients"
import * as Models from "../models"

const RELATIVE_PATH = "/mapping"

export const userMappingList = () =>
  new Promise<Models.User[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .get(`${RELATIVE_PATH}/userMappingList`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const addUserMapping = (userMapping: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/addUserMapping`, userMapping)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })
