import * as Clients from "@lp/library/clients"
import * as Models from "../models"

import RoleMappingService from './rolemapping-services';
export {RoleMappingService}

const RELATIVE_PATH = "/mapping"

export const roleMappingList = () =>
  new Promise<Models.IRole[]>((resolve, reject) => {
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

export const addRoleMapping = (userMapping: any) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/addRoleMapping`, userMapping)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const deleteRoleMapping = (id: string) =>
  new Promise<any>((resolve, reject) => {
    console.log({ id })

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
