class Calculadora {
  constructor() {
    this.history = this.loadHistory();
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
        if (curr === 0) return;
        result = prev / curr;
        break;
      default:
        return;
    }

    this.currentOperator = result.toString();
    this.mathopp = null;
    this.previousOperator = '';

    return result;
  }

  getDisplay() {
    return this.currentOperator;
  }

  obtainVisor() {
    return {
      retPrevOpp: this.previousOperator,
      retMathOpp: this.mathopp,
      retCurrOpp: this.currentOperator
    };
  }

  loadHistory() {
    try {
      const salvo = localStorage.getItem('calculadoraHistorico');
      const parsedHistory = salvo ? JSON.parse(salvo) : [];
      return Array.isArray(parsedHistory) ? parsedHistory : [];
    } catch (erro) {
      return [];
    }
  }

  saveHistory() {
    localStorage.setItem('calculadoraHistorico', JSON.stringify(this.history));
  }

  addToHistory(expressao, resultado) {
    this.history.unshift({ expressao, resultado });
    this.saveHistory();
  }
}

const calculadora = new Calculadora();
const display = document.querySelector('#visor');
const history = document.querySelector('#historico');
const emptyHistory = document.querySelector('#historico-vazio');

function updateDisplay() {
  display.textContent = calculadora.getDisplay() || calculadora.previousOperator || '0';
}

function renderHistory() {
  history.replaceChildren();
  emptyHistory.hidden = calculadora.history.length > 0;

  calculadora.history.forEach(({ expressao, resultado }) => {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center gap-3';

    const operacao = document.createElement('span');
    operacao.textContent = expressao;

    const valor = document.createElement('strong');
    valor.textContent = resultado;

    item.append(operacao, valor);
    history.appendChild(item);
  });
}

document.querySelectorAll('.numero').forEach((botao) => {
  botao.addEventListener('click', () => {
    calculadora.addDigit(botao.dataset.numero);
    updateDisplay();
  });
});

document.querySelectorAll('[data-operador]').forEach((botao) => {
  botao.addEventListener('click', () => {
    calculadora.chooseOperation(botao.dataset.operador);
    updateDisplay();
  });
});

document.querySelector('#igual').addEventListener('click', () => {
  const expressao = `${calculadora.previousOperator} ${calculadora.mathopp} ${calculadora.currentOperator}`;
  const resultado = calculadora.calculate();

  if (resultado !== undefined) {
    calculadora.addToHistory(expressao, resultado);
    renderHistory();
  }

  updateDisplay();
});

document.querySelector('#limpar').addEventListener('click', () => {
  calculadora.clear();
  updateDisplay();
});

renderHistory();
updateDisplay();
