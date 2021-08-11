export class ILoginActivity {
    _id?: string
    user?: {}
    systemInfo?: {}
    dateOfEntry?: string
    lastUpdated?: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.user = rawData.user
        this.systemInfo = rawData.systemInfo
        this.dateOfEntry = rawData.dateOfEntry
        this.lastUpdated = rawData.lastUpdated
    }
  }