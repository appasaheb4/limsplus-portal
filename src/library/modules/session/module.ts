import SessionStore from "mobx-session"
class Session {
  initialized: boolean = false
  hasSession: boolean = false

  initialize = async (key) => {
    this.initialized = true
    SessionStore.initialize(key)
  }
  saveSession = async (key, value) => {
    key = `__persist_mobx_session_${key}__`
    this.hasSession = true
    await SessionStore.saveSession(value)
  }
  getSession = async (key) => {
    key = `__persist_mobx_session_${key}__` as string
    const isSession = await SessionStore.getSession()
    console.log({ isSession })
    if (isSession) {
      this.hasSession = true
      return isSession
    }
    return
  }
  deleteSession = async (key) => {
    this.hasSession = false
    key = `__persist_mobx_session_${key}__`
    await SessionStore.deleteSession()
  }
}
export default new Session()
