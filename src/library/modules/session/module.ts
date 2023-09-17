/* eslint-disable @typescript-eslint/no-inferrable-types */
class Session {
  initialized: boolean = false;
  hasSession: boolean = false;

  initialize = async key => {
    this.initialized = true;
    // SessionStore.initialize(key);
  };
  saveSession = async value => {
    this.hasSession = true;
    await window.sessionStorage.setItem('session', JSON.stringify(value));
  };
  getSession = async () => {
    const isSession = await window.sessionStorage.getItem('session');
    if (isSession) {
      this.hasSession = true;
      return JSON.parse(isSession);
    }
    return;
  };
  deleteSession = async () => {
    this.hasSession = false;
    await window.sessionStorage.removeItem('session');
  };
}
export default new Session();
