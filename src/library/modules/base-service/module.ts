/**
 * @fileoverview Use this file to wrap library using custom
 * implementation related to Memetoons standards
 * @package BaseService Module
 * @author limsplus
 */

import Axios, { AxiosInstance } from "axios"
import * as Config from "@lp/config"

const apiHost = {
  node: Config.Api.LIMSPLUS_API_HOST,
}

function createMemeToonsClient(client: keyof typeof apiHost, token?: string) {
  let instance: AxiosInstance
  if (!token)
    instance = Axios.create({
      baseURL: apiHost[client],
    })
  else {
    instance = Axios.create({
      baseURL: apiHost[client],
      headers: {
        "x-limsplus-Key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJsYWIiOiJEUiBMQUwgUEFUSExBQlMgLSBERUxISSIsInVzZXJJZCI6IjEyMzQ1NiJ9.OqExKrvy2AdzunV942z7U23shX7A0AJZrrIhi2qmq3rUFk9bXCrTRGdoa2k1k2iT",
      },
      timeout: 1000 * 30,
    })
  }
  return instance
}

class BaseService {
  client: AxiosInstance
  constructor(token?: string) {
    this.client = createMemeToonsClient("node", token)
    this.client.interceptors.request.use((request) => {
      console.log(
        `${request.method?.toUpperCase()} ${request.baseURL}${request.url}`
      )
      console.log(`${JSON.stringify(request.data)}`)
      return request
    })
    this.client.interceptors.response.use((response) => {
      console.log(`RESPONSE: ${response.status}: ${response.data.data}`)
      return response
    })
  }
}

export default BaseService
