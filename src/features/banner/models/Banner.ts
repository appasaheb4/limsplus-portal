export class Banner {
    _id?: string;
    title?: string;
    image?: any;

    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.title = rawData.title
        this.image = rawData.image
    }
}