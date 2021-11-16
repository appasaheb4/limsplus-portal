export class ChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
  title: string
  subTitle: string
  tempHide: boolean

  constructor(rawData: { [key in string]: any }) {
    this.oldPassword = rawData.oldPassword 
    this.newPassword = rawData.newPassword 
    this.confirmPassword = rawData.confirmPassword 
    this.title = rawData.title 
    this.subTitle = rawData.subTitle 
    this.tempHide = rawData.tempHide 
  }
}
