class Singleton {
  input2isBlurEnable: boolean = true;

  constructor() {
    this.input2isBlurEnable = true;
  }

  get getInput2isBlurEnable() {
    return this.input2isBlurEnable;
  }
  set setInput2isBlurEnable(flag: boolean) {
    this.input2isBlurEnable = flag;
  }
}

export const singleton = new Singleton();
