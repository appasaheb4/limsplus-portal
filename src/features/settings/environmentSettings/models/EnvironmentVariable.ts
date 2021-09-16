export class EnvironmentVariable {
    environmentVariable?: string
    category?: string
    descriptions?: string
    enteredBy?: string
    constructor(rawData: {[key in string]: any}){
        this.environmentVariable = rawData.environmentVariable
        this.category = rawData.category
        this.descriptions = rawData.descriptions
        this.enteredBy = rawData.enteredBy
    }
}