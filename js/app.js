class Calculadora {
  constructor() {
    this.clear();
  }

  // resets the current state of the calculator
  clear() {
    this.currentOperator = '0';
    this.previousOperator = '';
    this.mathopp = null;
  }

  // adds a number, or dot
  addDigit(digit) {
    if (digit === '' && this.currentOperator.includes('.')) return;

    if (this.currentOperator === '0' && digit !== '.') {
      this.currentOperator = digit;
    } else {
      this.currentOperator += digit;
    }
  }

  // define the math operation
  chooseOperation(curr_mathopp) {
    if (this.currentOperator === '') return;

    if (this.previousOperator !== '') {
      this.calculate();
    }

    this.mathopp = curr_mathopp;
    this.previousOperator = this.currentOperator;
    this.currentOperator = '';
  }

  // execute the math based on the chosen operator
  calculate() {
    let result;
    const prev = parseFloat(this.previousOperator);
    const curr = parseFloat(this.currentOperator);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.mathopp) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = prev / curr;
        break;
      default:
        return;
    }

    this.currentOperator = result.toString();
    this.mathopp = null;
    this.previousOperator = '';
  }

  obtainVisor() {
    return {
      retPrevOpp: this.previousOperator,
      retMathOpp: this.mathopp,
      retCurrOpp: this.currentOperator
    };
  }
}
