export class ShortcutMenu {
    _id?: string
    items?: any[]
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.items = rawData.items
    }
  }
  