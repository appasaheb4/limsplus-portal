import * as Clients from "@lp/library/clients"
import * as Models from "../models"

const RELATIVE_PATH = "/mapping"

export const labMappingList = () =>
  new Promise<Models.ILabMapping[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .get(`${RELATIVE_PATH}/labMappingList`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const addLabMapping = (userMapping: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/addLabMapping`, userMapping)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const deleteLabMapping = (id: string) =>
  new Promise<any>((resolve, reject) => {
    console.log({ id })

    const client = Clients.createLimsPlusClient()
    client
      .delete(`${RELATIVE_PATH}/deleteLabMapping/${id}`)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })  
