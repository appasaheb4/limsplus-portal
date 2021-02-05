import * as Clients from "@lp/library/clients"
import * as Models from "../models"

const RELATIVE_PATH = "/mapping"

export const roleMappingList = () =>
  new Promise<Models.IRoleMapping[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .get(`${RELATIVE_PATH}/roleMappingList`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const addRoleMapping = (mapping: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/addRoleMapping`, mapping)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const deleteRoleMapping = (id: string) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .delete(`${RELATIVE_PATH}/deleteRoleMapping/${id}`)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })
