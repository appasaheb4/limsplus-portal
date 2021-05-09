import * as localStorage from "@lp/library/clients/storage-client"
class Session {
  initialized: boolean = false
  hasSession: boolean = false

  initialize = async (key) => {
    this.initialized = true
    await localStorage.setItem(key, undefined)
  }
  saveSession = async (key, value) => {
    key = `__persist_mobx_session_${key}__`
    this.hasSession = true
    await localStorage.setItem(key, value)
  }
  getSession = async (key) => {
    key = `__persist_mobx_session_${key}__`
    const isSession = await localStorage.getItem(key)
    if (isSession) {
      this.hasSession = true
      return isSession
    }
    return
  }
  deleteSession = async (key) => {
    this.hasSession = false
    key = `__persist_mobx_session_${key}__`
    await localStorage.removeItem(key)
  }
}
export default new Session()
