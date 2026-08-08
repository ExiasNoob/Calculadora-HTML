class KeyboardInput {
  constructor(calculatorInstance) {
    this.calculator = calculatorInstance
    this._initListener();
  }

  _initListener() {
    document.addEventListener('keydown', (event) => {
      const keyinput = event.key;

      if (!isNaN(keyinput) || keyinput === '.') {
        this.calculator.addDigit(keyinput);
      }
      else if (keyinput === '+' || keyinput === '-' || keyinput === '*' || keyinput === '/') {
        this.calculator.chooseOperation(keyinput);
      }
      else if (keyinput === 'Enter' || keyinput === '=') {
        event.preventDefault();
        this.calculator.calculate();
      }
      else if (keyinput === 'Escape' || keyinput === 'c' || keyinput === 'C') {
        this.calculator.clear();
      }

      const currstate = this.calculator.obtainVisor();
      console.log(`Visor: ${currstate.retPrevOpp} ${currstate.retMathOpp || ''} ${currstate.retCurrOpp}`);
    });
  }
}
