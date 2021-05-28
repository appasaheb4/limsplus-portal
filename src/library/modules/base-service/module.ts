/**
 * @fileoverview Use this file to wrap library using custom
 * implementation related to LimsPlus standards
 * @package BaseService Module
 * @author limsplus
 */

import Axios, { AxiosInstance } from "axios"
import * as LibraryComponents from "@lp/library/components"
import * as Config from "@lp/config"
//import RootStore from "@lp/library/stores/rootStore"

import Storage from "@lp/library/modules/storage"

const apiHost = {
  node: Config.Api.LIMSPLUS_API_HOST,
}

function createLimsPlusClient(client: keyof typeof apiHost, token?: string) {
  let instance: AxiosInstance
  if (!token)
    instance = Axios.create({
      baseURL: apiHost[client],
    })
  else {
    instance = Axios.create({
      baseURL: apiHost[client],
      headers: {
        "x-limsplus-key": token,
      },
      timeout: 1000 * 10,  
    })
  }
  return instance
}

class BaseService {
  client: AxiosInstance
  constructor(token?: string) {
    //console.log({ token })
    //   super()
    this.client = createLimsPlusClient("node", token)
    this.client.interceptors.request.use((request) => {
      // console.log(
      //   `${request.method?.toUpperCase()} ${request.baseURL}/${request.url}`
      // )
      //console.log(`${JSON.stringify(request.data)}`)
      return request
    })

    // this.client.interceptors.response.use(undefined, (err) => {
    //   console.log({ err })
    //   const status = err.response ? err.response.status : null
    //   if (status === 401) {
    //     console.log("auth", err.response)
    //   }
    // })
    this.client.interceptors.response.use(
      (response) => {
        //console.log(`RESPONSE: ${response.status}: ${response.data.data}`)
        return response
      },
      async (err) => {
        console.log({ err })
        const status = err.response ? err.response.status : null
        console.log({ status })
        if (status === 401) {
          await Storage.removeItem(`__persist_mobx_stores_loginStore__`)
          await Storage.removeItem(`__persist_mobx_stores_routerStore__`)
          await Storage.removeItem(
            `__persist_mobx_stores_routerStore_SelectedCategory__`
          )
          LibraryComponents.Atoms.Toast.warning({
            message: `😔 Oops! your token expire. Please login again`,
          })
          setTimeout(() => {
            window.location.replace("/")
          }, 2000)
          // RootStore.rootStore.updateModalTokenExpire({
          //   show: true,
          // })
          //console.log("auth", err.response)
        } else {
          LibraryComponents.Atoms.Toast.warning({
            message: `😔 Please try agian. Api calling timeout`,
          })
          // setTimeout(() => {
          //   window.location.reload()
          // }, 3000)
        }
      }
    )
  }
}

export default BaseService
