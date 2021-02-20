import * as Clients from "@lp/library/clients"
import * as Models from "../models"

const RELATIVE_PATH = "/communication"

export const listDepartment = () =>
  new Promise<Models.IHostCommunication[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .get(`${RELATIVE_PATH}/listDepartment`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })
export const adddepartment = (department?: Models.IHostCommunication) =>
  new Promise<any>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/addDepartment`, department)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })

export const deletedepartment = (id: string) =>
  new Promise<Models.IHostCommunication[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .delete(`${RELATIVE_PATH}/deleteDepartment/${id}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })
