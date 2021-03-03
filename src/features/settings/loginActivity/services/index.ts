import * as Clients from "@lp/library/clients"
import * as Models from "../models"

import LoginActivityService from './loginActivity-services';
export{LoginActivityService}

const RELATIVE_PATH = "/auth"

export const listLoginActivity = () =>
  new Promise<Models.ILoginActivity[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient()
    client
      .get(`${RELATIVE_PATH}/listLoginActivity`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error) => {
        reject({ error })
      })
  })
