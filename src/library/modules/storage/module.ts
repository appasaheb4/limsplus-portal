import * as localStorage from "@lp/library/clients/storage-client"
//import * as sessionStorage from "@lp/library/clients/session-client"
class Storage {
  setItem = async (key, value) => {
    await localStorage.setItem(key, value)
  }
  getItem = async (key): Promise<any> => {
    return await localStorage.getItem(key)
  }
  removeItem = async (key) => {
    await localStorage.removeItem(key)
  }
}
export default new Storage()
