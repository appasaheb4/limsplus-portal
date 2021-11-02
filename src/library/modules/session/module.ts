import SessionStore from "mobx-session"
class Session {
  initialized: boolean = false
  hasSession: boolean = false

  initialize = async (key) => {
    this.initialized = true
    SessionStore.initialize(key)
  }
  saveSession = async (value) => {
    this.hasSession = true
    await SessionStore.saveSession(value)
  }
  getSession = async () => {
    const isSession = await SessionStore.getSession()
    if (isSession) {
      this.hasSession = true
      return isSession
    }    
    return
  }
  deleteSession = async () => {
    this.hasSession = false
    await SessionStore.deleteSession()
  }
}
export default new Session()
