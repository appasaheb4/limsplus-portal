export class FormHelper {
  static patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    emptySpace: /^\S$|^\S[\s\S]*\S$/,
    emptyString: /^\s*$/,
    nonEmptyString: /^(?!\s*$).+/,
    userName: /^[a-z][a-z0-9_.]+$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    mobileNo: /^[0-9]{0,10}$/,
    decimalPatterm: /^[0-9<>=.]*$/,
  };

  static isUserNameValid(userName: string): boolean {
    return this.patterns.userName.test(userName);
  }
  static isDecimal(val: string): boolean {
    return this.patterns.decimalPatterm.test(val);
  }
  static isEmailValid(email: string): boolean {
    return this.patterns.email.test(email);
  }

  static isDateValid(date: string, month?: string, year?: string): boolean {
    if (!Number(month) || !Number(year)) {
      return !!Number(date) && Number(date) <= 31;
    }
    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
    return Number(date) <= daysInMonth;
  }

  static isMobileNoValid(number: string): boolean {
    return this.patterns.mobileNo.test(number);
  }

  static isMonthValid(month: string): boolean {
    return !!Number(month) && Number(month) <= 12;
  }

  static isYearValid(year: string): boolean {
    return !!Number(year) && year.length === 4;
  }
  static isPasswordValid(password: string): boolean {
    return this.patterns.password.test(password);
  }

  static isValidHeight(height?: string): boolean {
    return !!Number(height) && Number(height) <= 214;
  }

  static isValidWeight(weight?: string): boolean {
    return !!Number(weight) && Number(weight) <= 150;
  }

  static isNumberAvailable(val: string): boolean {
    const matches = val.match(/\d+/g);
    if (val) {
      if (matches != null) return true;
      else return false;
    }
    return true;
  }
}
