export class ForgotPassword {
  userId: string;
  email: string;
  mobileNo: string;
  companyCode: string;
  constructor(rawData: { [key in string]: any }) {
    this.userId = rawData.userId;
    this.email = rawData.email;
    this.mobileNo = rawData.mobileNo;
    this.companyCode = rawData.companyCode;
  }
}
