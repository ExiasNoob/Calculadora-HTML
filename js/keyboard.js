document.addEventListener('keydown', (event) => {
  const tecla = event.key;

  if (/^[0-9]$/.test(tecla) || tecla === '.') {
    calculadora.addDigit(tecla);
    updateDisplay();
    return;
  }

  if (['+', '-', '*', '/'].includes(tecla)) {
    calculadora.chooseOperation(tecla);
    updateDisplay();
    return;
  }

  if (tecla === 'Enter' || tecla === '=') {
    event.preventDefault();
    document.querySelector('#igual').click();
    return;
  }

  if (tecla === 'Escape' || tecla.toLowerCase() === 'c') {
    document.querySelector('#limpar').click();
  }
});
